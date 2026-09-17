import { Component, inject, signal } from '@angular/core';
import { CategoryTile } from '../../components/category-tile/category-tile.component';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [CategoryTile],
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
