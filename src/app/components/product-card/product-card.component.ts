import { Component, computed, input } from '@angular/core';
import { Product } from '../../models/product.model';

const EUR_FORMATTER = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

@Component({
  imports: [],
  selector: 'app-product-card',
  styleUrl: './product-card.component.scss',
  templateUrl: './product-card.component.html',
})
export class ProductCard {
  readonly product = input.required<Product>();

  protected readonly formattedPrice = computed(() =>
    EUR_FORMATTER.format(this.product().priceCents / 100),
  );
}
