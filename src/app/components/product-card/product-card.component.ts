import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { TranslationService } from '../../services/translation.service';

const LOCALE_BY_LANGUAGE = { de: 'de-DE', en: 'en-GB' } as const;

@Component({
  imports: [RouterLink],
  selector: 'app-product-card',
  styleUrl: './product-card.component.scss',
  templateUrl: './product-card.component.html',
})
export class ProductCard {
  protected readonly i18n = inject(TranslationService);

  readonly product = input.required<Product>();

  protected readonly name = computed(() => this.product().name[this.i18n.language()]);

  protected readonly detailLink = computed<[string, string, ...string[]]>(() => {
    const product = this.product();
    return product.categorySlug === 'prebuilt-pcs'
      ? ['/prebuilt-pcs', product.id]
      : ['/components', product.categorySlug, product.id];
  });

  protected readonly formattedPrice = computed(() => {
    const locale = LOCALE_BY_LANGUAGE[this.i18n.language()];
    const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' });
    return formatter.format(this.product().priceCents / 100);
  });
}
