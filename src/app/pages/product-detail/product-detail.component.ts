import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CompareService } from '../../services/compare.service';
import { ProductService } from '../../services/product.service';
import { TranslationService } from '../../services/translation.service';

const LOCALE_BY_LANGUAGE = { de: 'de-DE', en: 'en-GB' } as const;

@Component({
  imports: [RouterLink],
  selector: 'app-product-detail',
  styleUrl: './product-detail.component.scss',
  templateUrl: './product-detail.component.html',
})
export class ProductDetail {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  protected readonly compareService = inject(CompareService);
  protected readonly i18n = inject(TranslationService);

  readonly productId = input.required<string>();

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly product = signal<Product | null>(null);

  protected readonly name = computed(() => this.product()?.name[this.i18n.language()] ?? '');
  protected readonly description = computed(
    () => this.product()?.description[this.i18n.language()] ?? '',
  );

  protected readonly formattedPrice = computed(() => {
    const product = this.product();
    if (!product) return '';
    const locale = LOCALE_BY_LANGUAGE[this.i18n.language()];
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(
      product.priceCents / 100,
    );
  });

  protected readonly categoryLink = computed<[string] | [string, string]>(() => {
    const slug = this.product()?.categorySlug ?? '';
    return slug === 'prebuilt-pcs' ? ['/prebuilt-pcs'] : ['/components', slug];
  });

  constructor() {
    effect(() => {
      const id = this.productId();
      this.isLoading.set(true);
      this.hasError.set(false);
      this.product.set(null);
      this.productService.getProductById(id).subscribe({
        next: (product) => {
          this.product.set(product);
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
    });
  }

  protected addToCart(): void {
    const product = this.product();
    if (product) {
      this.cartService.add(product.id);
    }
  }

  protected toggleCompare(): void {
    const product = this.product();
    if (product) {
      this.compareService.toggle(product.id);
    }
  }
}
