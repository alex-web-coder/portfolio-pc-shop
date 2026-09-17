import { Component, inject } from '@angular/core';
import { FLAT_SHIPPING_CENTS, FREE_SHIPPING_THRESHOLD_CENTS } from '../../services/order.service';
import { TranslationService } from '../../services/translation.service';

const LOCALE_BY_LANGUAGE = { de: 'de-DE', en: 'en-GB' } as const;

@Component({
  imports: [],
  selector: 'app-shipping-info',
  styleUrl: './shipping-info.component.scss',
  templateUrl: './shipping-info.component.html',
})
export class ShippingInfo {
  protected readonly i18n = inject(TranslationService);

  protected formatPrice(cents: number): string {
    const locale = LOCALE_BY_LANGUAGE[this.i18n.language()];
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(cents / 100);
  }

  protected readonly flatShippingCents = FLAT_SHIPPING_CENTS;
  protected readonly freeShippingThresholdCents = FREE_SHIPPING_THRESHOLD_CENTS;
}
