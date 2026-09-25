import { Component, computed, inject, signal } from '@angular/core';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb.component';
import { CategoryTile } from '../../components/category-tile/category-tile.component';
import { BreadcrumbItem } from '../../models/breadcrumb-item.model';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [Breadcrumb, CategoryTile],
  selector: 'app-category-grid',
  styleUrl: './category-grid.component.scss',
  templateUrl: './category-grid.component.html',
})
export class CategoryGrid {
  private readonly categoryService = inject(CategoryService);
  protected readonly i18n = inject(TranslationService);

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly categories = signal<Category[]>([]);

  protected readonly breadcrumbItems = computed<BreadcrumbItem[]>(() => [
    { label: this.i18n.t('breadcrumb.home'), link: ['/'] },
    { label: this.i18n.t('nav.components') },
  ]);

  constructor() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories.filter((category) => category.slug !== 'prebuilt-pcs'));
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }
}
