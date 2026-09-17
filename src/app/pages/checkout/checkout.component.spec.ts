import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { mockApiInterceptor } from '../../interceptors/mock-api.interceptor';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Checkout } from './checkout.component';

async function settle(fixture: ComponentFixture<Checkout>, ms = 350) {
  fixture.detectChanges();
  await new Promise((resolve) => setTimeout(resolve, ms));
  fixture.detectChanges();
}

function click(fixture: ComponentFixture<Checkout>, selector: string) {
  const button = fixture.nativeElement.querySelector(selector) as HTMLButtonElement;
  button.click();
  fixture.detectChanges();
}

function setValue(fixture: ComponentFixture<Checkout>, selector: string, value: string) {
  const input = fixture.nativeElement.querySelector(selector) as HTMLInputElement;
  input.value = value;
  input.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}

function fillContactForm(fixture: ComponentFixture<Checkout>, overrides: { email?: string } = {}) {
  setValue(fixture, 'input[formcontrolname=fullName]', 'Sample Name');
  setValue(fixture, 'input[formcontrolname=email]', overrides.email ?? 'sample@example.com');
  setValue(fixture, 'input[formcontrolname=street]', 'Sample Street 1');
  setValue(fixture, 'input[formcontrolname=postalCode]', '12345');
  setValue(fixture, 'input[formcontrolname=city]', 'Sample City');
}

describe('Checkout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(withInterceptors([mockApiInterceptor]))],
    });
    TestBed.inject(CartService).add('gpu-1');
  });

  it('blocks advancing past step 1 with an empty form and shows validation errors', async () => {
    const fixture = TestBed.createComponent(Checkout);
    await settle(fixture);

    click(fixture, 'button.primary');

    expect(fixture.nativeElement.querySelectorAll('.error').length).toBeGreaterThan(0);
    expect(fixture.nativeElement.querySelector('.step-indicator').textContent).toContain('1 / 3');
  });

  it('advances through all three steps and completes with a confirmation, clearing the cart', async () => {
    const fixture = TestBed.createComponent(Checkout);
    await settle(fixture);

    click(fixture, 'button.ghost'); // fill sample data
    click(fixture, 'button.primary'); // -> step 2
    expect(fixture.nativeElement.querySelector('.step-indicator').textContent).toContain('2 / 3');

    click(fixture, 'button.primary'); // -> step 3 (default payment method already valid)
    expect(fixture.nativeElement.querySelector('.step-indicator').textContent).toContain('3 / 3');

    click(fixture, 'button.primary'); // place order
    await settle(fixture);

    expect(fixture.nativeElement.querySelector('.order-number')).toBeTruthy();
    expect(TestBed.inject(CartService).itemCount()).toBe(0);
  });

  it('going back from step 2 to step 1 preserves entered values', async () => {
    const fixture = TestBed.createComponent(Checkout);
    await settle(fixture);

    fillContactForm(fixture);
    click(fixture, 'button.primary'); // -> step 2
    click(fixture, 'button.ghost'); // back -> step 1

    expect(fixture.nativeElement.querySelector('input[formcontrolname=fullName]').value).toBe(
      'Sample Name',
    );
  });

  it('keeps the cart and form intact when order submission fails (simulated trigger)', async () => {
    const fixture = TestBed.createComponent(Checkout);
    await settle(fixture);

    fillContactForm(fixture, { email: 'fehler@beispiel.de' });
    click(fixture, 'button.primary'); // -> step 2
    click(fixture, 'button.primary'); // -> step 3
    click(fixture, 'button.primary'); // submit
    await settle(fixture);

    expect(fixture.nativeElement.textContent).toContain('konnte nicht abgeschlossen werden');
    expect(fixture.nativeElement.querySelector('.order-number')).toBeFalsy();
    expect(TestBed.inject(CartService).itemCount()).toBe(1);
  });

  it('does not place a second order on a rapid double-click of submit', async () => {
    const fixture = TestBed.createComponent(Checkout);
    await settle(fixture);

    click(fixture, 'button.ghost');
    click(fixture, 'button.primary');
    click(fixture, 'button.primary');

    const placeOrderSpy = vi.spyOn(TestBed.inject(OrderService), 'placeOrder');
    const submitButton = fixture.nativeElement.querySelector('button.primary') as HTMLButtonElement;
    submitButton.click();
    submitButton.click();
    await settle(fixture);

    expect(placeOrderSpy).toHaveBeenCalledTimes(1);
  });
});
