import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartLine } from '../../models/cart-line.model';
import { CartService } from '../../services/cart.service';
import { CartViewService } from '../../services/cart-view.service';
import { TranslationService } from '../../services/translation.service';

const LOCALE_BY_LANGUAGE = { de: 'de-DE', en: 'en-GB' } as const;

@Component({
  imports: [RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.component.scss',
  templateUrl: './cart.component.html',
})
export class Cart {
  private readonly cartService = inject(CartService);
  protected readonly cartView = inject(CartViewService);
  protected readonly i18n = inject(TranslationService);

  protected name(line: CartLine): string {
    return line.product.name[this.i18n.language()];
  }

  protected formatPrice(cents: number): string {
    const locale = LOCALE_BY_LANGUAGE[this.i18n.language()];
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(cents / 100);
  }

  protected onQuantityChange(productId: string, value: string): void {
    const quantity = Number(value);
    if (Number.isFinite(quantity)) {
      this.cartService.setQuantity(productId, quantity);
    }
  }

  protected remove(productId: string): void {
    this.cartService.remove(productId);
  }
}
