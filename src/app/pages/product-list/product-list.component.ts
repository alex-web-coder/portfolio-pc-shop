import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb.component';
import { ProductCard } from '../../components/product-card/product-card.component';
import { BreadcrumbItem } from '../../models/breadcrumb-item.model';
import { Category } from '../../models/category.model';
import { LocalizedText } from '../../models/localized-text.model';
import { Product } from '../../models/product.model';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { TranslationService } from '../../services/translation.service';

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

@Component({
  imports: [Breadcrumb, ProductCard],
  selector: 'app-product-list',
  styleUrl: './product-list.component.scss',
  templateUrl: './product-list.component.html',
})
export class ProductList {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  protected readonly i18n = inject(TranslationService);

  readonly categorySlug = input.required<string>();

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly products = signal<Product[]>([]);

  protected readonly categories = toSignal(this.categoryService.getCategories(), {
    initialValue: [] as Category[],
  });
  protected readonly category = computed(() =>
    this.categories().find((category) => category.slug === this.categorySlug()),
  );

  protected readonly breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const home = { label: this.i18n.t('breadcrumb.home'), link: ['/'] };
    if (this.categorySlug() === 'prebuilt-pcs') {
      return [home, { label: this.i18n.t('nav.prebuiltPcs') }];
    }
    return [
      home,
      { label: this.i18n.t('nav.components'), link: ['/components'] },
      { label: this.category()?.name[this.i18n.language()] ?? this.categorySlug() },
    ];
  });

  private readonly queryParamMap = toSignal(this.route.queryParamMap, { requireSync: true });

  protected readonly manufacturers = computed(() =>
    Array.from(new Set(this.products().map((product) => product.manufacturer))).sort(),
  );

  protected readonly specFilterLabel = computed<LocalizedText | null>(() => {
    const key = this.category()?.filterSpecKey;
    if (!key) return null;
    for (const product of this.products()) {
      const found = product.specs.find((spec) => spec.key === key);
      if (found) return found.label;
    }
    return null;
  });

  protected readonly specFilterValues = computed(() => {
    const key = this.category()?.filterSpecKey;
    if (!key) return [];
    const values = new Set<string>();
    for (const product of this.products()) {
      const found = product.specs.find((spec) => spec.key === key);
      if (found) values.add(found.value);
    }
    return Array.from(values).sort();
  });

  protected readonly selectedManufacturers = computed(() => this.queryParamMap().getAll('manufacturer'));
  protected readonly selectedSpecValues = computed(() => this.queryParamMap().getAll('spec'));
  protected readonly minPrice = computed(() => this.queryParamMap().get('minPrice') ?? '');
  protected readonly maxPrice = computed(() => this.queryParamMap().get('maxPrice') ?? '');
  protected readonly availableOnly = computed(() => this.queryParamMap().get('availableOnly') === '1');
  protected readonly sort = computed<SortOption>(
    () => (this.queryParamMap().get('sort') as SortOption | null) ?? 'name-asc',
  );

  protected readonly hasActiveFilters = computed(() => {
    const params = this.queryParamMap();
    return params.keys.length > 0;
  });

  protected readonly filteredProducts = computed(() => {
    const specKey = this.category()?.filterSpecKey;
    const manufacturers = this.selectedManufacturers();
    const specValues = this.selectedSpecValues();
    const min = this.minPrice();
    const max = this.maxPrice();
    const onlyAvailable = this.availableOnly();

    return this.products().filter((product) => {
      if (manufacturers.length && !manufacturers.includes(product.manufacturer)) return false;
      if (min && product.priceCents < Number(min) * 100) return false;
      if (max && product.priceCents > Number(max) * 100) return false;
      if (onlyAvailable && !product.available) return false;
      if (specKey && specValues.length) {
        const found = product.specs.find((spec) => spec.key === specKey);
        if (!found || !specValues.includes(found.value)) return false;
      }
      return true;
    });
  });

  protected readonly visibleProducts = computed(() => {
    const lang = this.i18n.language();
    const sort = this.sort();
    return [...this.filteredProducts()].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.priceCents - b.priceCents;
        case 'price-desc':
          return b.priceCents - a.priceCents;
        case 'name-desc':
          return b.name[lang].localeCompare(a.name[lang]);
        default:
          return a.name[lang].localeCompare(b.name[lang]);
      }
    });
  });

  constructor() {
    // Re-fetch whenever categorySlug changes — covers direct navigation between
    // category URLs (browser back/forward), where the router reuses this instance.
    effect(() => {
      const slug = this.categorySlug();
      this.isLoading.set(true);
      this.hasError.set(false);
      this.productService.getProducts(slug).subscribe({
        next: (products) => {
          this.products.set(products);
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
    });
  }

  protected toggleManufacturer(manufacturer: string, checked: boolean): void {
    const current = this.selectedManufacturers();
    const next = checked ? [...current, manufacturer] : current.filter((m) => m !== manufacturer);
    this.updateQueryParams({ manufacturer: next.length ? next : null });
  }

  protected toggleSpecValue(value: string, checked: boolean): void {
    const current = this.selectedSpecValues();
    const next = checked ? [...current, value] : current.filter((v) => v !== value);
    this.updateQueryParams({ spec: next.length ? next : null });
  }

  protected onAvailableOnlyChange(checked: boolean): void {
    this.updateQueryParams({ availableOnly: checked ? '1' : null });
  }

  protected onMinPriceChange(value: string): void {
    this.updateQueryParams({ minPrice: value || null });
  }

  protected onMaxPriceChange(value: string): void {
    this.updateQueryParams({ maxPrice: value || null });
  }

  protected onSortChange(value: string): void {
    this.updateQueryParams({ sort: value === 'name-asc' ? null : value });
  }

  protected resetFilters(): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: {} });
  }

  private updateQueryParams(changes: Record<string, string | string[] | null>): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: changes,
      queryParamsHandling: 'merge',
    });
  }
}
