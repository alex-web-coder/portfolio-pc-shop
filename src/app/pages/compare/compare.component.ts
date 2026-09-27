import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductSpec } from '../../models/product-spec.model';
import { Product } from '../../models/product.model';
import { CompareService } from '../../services/compare.service';
import { ProductService } from '../../services/product.service';
import { TranslationService } from '../../services/translation.service';
import { handleProductImageError } from '../../utils/image-paths';

const LOCALE_BY_LANGUAGE = { de: 'de-DE', en: 'en-GB' } as const;

@Component({
  imports: [RouterLink],
  selector: 'app-compare',
  styleUrl: './compare.component.scss',
  templateUrl: './compare.component.html',
})
export class Compare {
  private readonly productService = inject(ProductService);
  protected readonly compareService = inject(CompareService);
  protected readonly i18n = inject(TranslationService);

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  private readonly products = signal<Product[]>([]);

  protected readonly comparedProducts = computed<Product[]>(() => {
    const byId = new Map(this.products().map((product) => [product.id, product]));
    return this.compareService
      .ids()
      .map((id) => byId.get(id))
      .filter((product): product is Product => product !== undefined);
  });

  /** Union of every spec key across the compared products, in first-seen order. */
  protected readonly specRows = computed<Array<{ key: string; label: ProductSpec['label'] }>>(() => {
    const seen = new Map<string, ProductSpec['label']>();
    for (const product of this.comparedProducts()) {
      for (const spec of product.specs) {
        if (!seen.has(spec.key)) seen.set(spec.key, spec.label);
      }
    }
    return Array.from(seen, ([key, label]) => ({ key, label }));
  });

  constructor() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  protected name(product: Product): string {
    return product.name[this.i18n.language()];
  }

  protected specValue(product: Product, key: string): string {
    return product.specs.find((spec) => spec.key === key)?.value ?? '—';
  }

  protected formatPrice(cents: number): string {
    const locale = LOCALE_BY_LANGUAGE[this.i18n.language()];
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(cents / 100);
  }

  protected remove(productId: string): void {
    this.compareService.remove(productId);
  }

  protected onImageError(event: Event, product: Product): void {
    handleProductImageError(event, product.id, product.categorySlug);
  }
}
