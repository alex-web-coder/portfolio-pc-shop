import { Component, HostListener, computed, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from '../../models/breadcrumb-item.model';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { CompareService } from '../../services/compare.service';
import { ProductService } from '../../services/product.service';
import { TranslationService } from '../../services/translation.service';
import { handleProductImageError, hideBackdropIfPlaceholder } from '../../utils/image-paths';

const LOCALE_BY_LANGUAGE = { de: 'de-DE', en: 'en-GB' } as const;

@Component({
  imports: [Breadcrumb, RouterLink],
  selector: 'app-product-detail',
  styleUrl: './product-detail.component.scss',
  templateUrl: './product-detail.component.html',
})
export class ProductDetail {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly categoryService = inject(CategoryService);
  protected readonly compareService = inject(CompareService);
  protected readonly i18n = inject(TranslationService);

  readonly productId = input.required<string>();

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly product = signal<Product | null>(null);
  protected readonly lightboxOpen = signal(false);

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

  private readonly categories = toSignal(this.categoryService.getCategories(), {
    initialValue: [] as Category[],
  });
  private readonly categoryName = computed(() => {
    const slug = this.product()?.categorySlug;
    return this.categories().find((category) => category.slug === slug)?.name[this.i18n.language()] ?? '';
  });

  protected readonly breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const home = { label: this.i18n.t('breadcrumb.home'), link: ['/'] };
    const product = this.product();
    if (!product) return [home];

    const current = { label: this.name() };
    if (product.categorySlug === 'prebuilt-pcs') {
      return [home, { label: this.i18n.t('nav.prebuiltPcs'), link: ['/prebuilt-pcs'] }, current];
    }
    return [
      home,
      { label: this.i18n.t('nav.components'), link: ['/components'] },
      { label: this.categoryName(), link: ['/components', product.categorySlug] },
      current,
    ];
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

  protected onImageError(event: Event): void {
    const product = this.product();
    if (product) {
      handleProductImageError(event, product.id, product.categorySlug);
    }
  }

  protected onPhotoLoad(event: Event): void {
    hideBackdropIfPlaceholder(event);
  }

  protected openLightbox(): void {
    this.lightboxOpen.set(true);
  }

  protected closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  @HostListener('document:keydown', ['$event'])
  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.lightboxOpen()) {
      this.closeLightbox();
    }
  }
}
