import { Component, Injector, afterNextRender, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartLine } from '../../models/cart-line.model';
import { Order, OrderLineSnapshot, PaymentMethod, PlaceOrderRequest } from '../../models/order.model';
import { CartService } from '../../services/cart.service';
import { CartViewService } from '../../services/cart-view.service';
import { OrderService, calculateShippingCents, FREE_SHIPPING_THRESHOLD_CENTS } from '../../services/order.service';
import { TranslationService } from '../../services/translation.service';
import { TranslationKey } from '../../services/translations.data';

const LOCALE_BY_LANGUAGE = { de: 'de-DE', en: 'en-GB' } as const;
const STEP_HEADING_ID = 'checkout-step-heading';

type CheckoutStep = 1 | 2 | 3;

const STEP_HEADING_KEYS: Record<CheckoutStep, TranslationKey> = {
  1: 'checkout.step1.heading',
  2: 'checkout.step2.heading',
  3: 'checkout.step3.heading',
};

const COUNTRY_LABEL_KEYS: Record<string, TranslationKey> = {
  de: 'checkout.country.de',
  at: 'checkout.country.at',
  ch: 'checkout.country.ch',
};

const PAYMENT_LABEL_KEYS: Record<PaymentMethod, TranslationKey> = {
  card: 'checkout.payment.card',
  paypal: 'checkout.payment.paypal',
  invoice: 'checkout.payment.invoice',
};

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-checkout',
  styleUrl: './checkout.component.scss',
  templateUrl: './checkout.component.html',
})
export class Checkout {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  protected readonly cartView = inject(CartViewService);
  private readonly orderService = inject(OrderService);
  protected readonly i18n = inject(TranslationService);
  private readonly injector = inject(Injector);

  protected readonly stepHeadingId = STEP_HEADING_ID;
  protected readonly currentStep = signal<CheckoutStep>(1);
  protected readonly isSubmitting = signal(false);
  protected readonly submitError = signal(false);
  protected readonly placedOrder = signal<Order | null>(null);

  protected readonly contactForm = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    street: ['', Validators.required],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d{4,5}$/)]],
    city: ['', Validators.required],
    country: ['de', Validators.required],
  });

  protected readonly paymentForm = this.fb.nonNullable.group({
    paymentMethod: this.fb.nonNullable.control<PaymentMethod>('card', Validators.required),
  });

  protected readonly shippingCents = computed(() => calculateShippingCents(this.cartView.subtotalCents()));
  protected readonly totalCents = computed(() => this.cartView.subtotalCents() + this.shippingCents());
  protected readonly freeShippingThresholdCents = FREE_SHIPPING_THRESHOLD_CENTS;

  protected formatPrice(cents: number): string {
    const locale = LOCALE_BY_LANGUAGE[this.i18n.language()];
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(cents / 100);
  }

  protected readonly stepHeadingKey = computed(() => STEP_HEADING_KEYS[this.currentStep()]);

  protected productName(line: CartLine): string {
    return line.product.name[this.i18n.language()];
  }

  protected orderLineName(line: OrderLineSnapshot): string {
    return line.name[this.i18n.language()];
  }

  protected countryLabel(code: string): string {
    return this.i18n.t(COUNTRY_LABEL_KEYS[code] ?? 'checkout.country.de');
  }

  protected paymentLabel(method: PaymentMethod): string {
    return this.i18n.t(PAYMENT_LABEL_KEYS[method]);
  }

  protected fieldError(
    fieldName: 'fullName' | 'email' | 'street' | 'postalCode' | 'city',
  ): string | null {
    const control = this.contactForm.controls[fieldName];
    if (!control.touched && !control.dirty) return null;
    if (control.hasError('required')) return this.i18n.t('checkout.error.required');
    if (control.hasError('email')) return this.i18n.t('checkout.error.email');
    if (control.hasError('pattern')) return this.i18n.t('checkout.error.postalCode');
    return null;
  }

  protected fillSampleData(): void {
    this.contactForm.setValue({
      fullName: 'Max Mustermann',
      email: 'max.mustermann@beispiel.de',
      street: 'Musterstraße 12',
      postalCode: '10115',
      city: 'Berlin',
      country: 'de',
    });
  }

  protected goToStep2(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.setStep(2);
  }

  protected goToStep3(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    this.setStep(3);
  }

  protected goBack(step: 1 | 2): void {
    this.setStep(step);
  }

  protected placeOrder(): void {
    if (this.isSubmitting() || this.placedOrder()) return;

    this.isSubmitting.set(true);
    this.submitError.set(false);

    const lines: OrderLineSnapshot[] = this.cartView
      .lines()
      .filter((line) => line.product.available)
      .map((line) => ({
        productId: line.product.id,
        name: line.product.name,
        priceCents: line.product.priceCents,
        quantity: line.quantity,
      }));

    const contact = this.contactForm.getRawValue();
    const request: PlaceOrderRequest = {
      lines,
      subtotalCents: this.cartView.subtotalCents(),
      shippingCents: this.shippingCents(),
      totalCents: this.totalCents(),
      contact: { fullName: contact.fullName, email: contact.email },
      shippingAddress: {
        street: contact.street,
        postalCode: contact.postalCode,
        city: contact.city,
        country: contact.country,
      },
      paymentMethod: this.paymentForm.getRawValue().paymentMethod,
    };

    this.orderService.placeOrder(request).subscribe({
      next: (order) => {
        this.placedOrder.set(order);
        this.cartService.clear();
        this.isSubmitting.set(false);
      },
      error: () => {
        this.submitError.set(true);
        this.isSubmitting.set(false);
      },
    });
  }

  private setStep(step: CheckoutStep): void {
    this.currentStep.set(step);
    afterNextRender(
      () => {
        document.getElementById(STEP_HEADING_ID)?.focus();
      },
      { injector: this.injector },
    );
  }
}
