import { Injectable, computed, inject, signal } from '@angular/core';
import { CartLine } from '../models/cart-line.model';
import { Product } from '../models/product.model';
import { CartService, calculateSubtotalCents } from './cart.service';
import { PcConfigurationStore } from './pc-configuration-store.service';
import { ProductService } from './product.service';

/**
 * Resolves the cart's {productId, quantity} pairs against the full product
 * catalog (plus any saved custom configurations) so pages can render
 * names/prices/images without each duplicating the join. Fetches the catalog
 * once (root singleton) and stays reactive to cart changes via CartService's
 * signal.
 */
@Injectable({ providedIn: 'root' })
export class CartViewService {
  private readonly cartService = inject(CartService);
  private readonly productService = inject(ProductService);
  private readonly configurationStore = inject(PcConfigurationStore);

  readonly isLoading = signal(true);
  readonly hasError = signal(false);
  private readonly products = signal<Product[]>([]);

  readonly lines = computed<CartLine[]>(() => {
    const byId = new Map(this.products().map((product) => [product.id, product]));
    return this.cartService
      .items()
      .map((item) => {
        const product = byId.get(item.productId) ?? this.configurationStore.find(item.productId);
        return product ? { product, quantity: item.quantity } : null;
      })
      .filter((line): line is CartLine => line !== null);
  });

  /** Only counts available lines — an unavailable product stays visible in the cart but isn't purchasable. */
  readonly subtotalCents = computed(() =>
    calculateSubtotalCents(
      this.lines()
        .filter((line) => line.product.available)
        .map((line) => ({ priceCents: line.product.priceCents, quantity: line.quantity })),
    ),
  );

  readonly hasOrderableLine = computed(() => this.lines().some((line) => line.product.available));

  constructor() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false);
        const knownIds = new Set([...products.map((product) => product.id), ...this.configurationStore.allIds()]);
        this.cartService.removeUnknownProductIds(knownIds);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }
}
