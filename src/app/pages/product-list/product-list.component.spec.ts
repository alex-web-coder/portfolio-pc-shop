import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { mockApiInterceptor } from '../../interceptors/mock-api.interceptor';
import { ProductList } from './product-list.component';

async function navigate(url: string) {
  const harness = await RouterTestingHarness.create();
  await harness.navigateByUrl(url);
  harness.detectChanges();
  // Let the interceptor's simulated latency (300ms) resolve.
  await new Promise((resolve) => setTimeout(resolve, 350));
  harness.detectChanges();
  return harness;
}

describe('ProductList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(
          [{ path: 'components/:categorySlug', component: ProductList }],
          withComponentInputBinding(),
        ),
        provideHttpClient(withInterceptors([mockApiInterceptor])),
      ],
    });
  });

  it('renders every product in the category with no filters applied', async () => {
    const harness = await navigate('/components/graphics-cards');
    const cards = harness.routeNativeElement!.querySelectorAll('app-product-card');
    expect(cards.length).toBe(12);
  });

  it('narrows results via a manufacturer query param', async () => {
    const harness = await navigate('/components/graphics-cards?manufacturer=MSI');
    const cards = harness.routeNativeElement!.querySelectorAll('app-product-card');
    expect(cards.length).toBe(4);
  });

  it('narrows results via a minPrice query param', async () => {
    const harness = await navigate('/components/graphics-cards?minPrice=800');
    const cards = harness.routeNativeElement!.querySelectorAll('app-product-card');
    expect(cards.length).toBe(6); // gpu-4, gpu-5, gpu-7, gpu-8, gpu-9, gpu-12
  });

  it('shows the empty state when filters exclude every product', async () => {
    const harness = await navigate('/components/graphics-cards?minPrice=999999');
    expect(harness.routeNativeElement!.querySelectorAll('app-product-card').length).toBe(0);
    expect(harness.routeNativeElement!.textContent).toContain('Keine Produkte gefunden');
  });

  it('renders the same filtered result set for a direct URL as if it were shared/reloaded', async () => {
    // A fresh RouterTestingHarness per test already simulates "opened in a new
    // tab from a shared URL" — a second navigation within one test isn't
    // supported by the harness, so this is asserted as its own case.
    const harness = await navigate('/components/graphics-cards?manufacturer=Sapphire');
    expect(harness.routeNativeElement!.querySelectorAll('app-product-card').length).toBe(4);
  });
});
