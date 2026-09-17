import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../models/category.model';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [RouterLink],
  selector: 'app-category-tile',
  styleUrl: './category-tile.component.scss',
  templateUrl: './category-tile.component.html',
})
export class CategoryTile {
  private readonly i18n = inject(TranslationService);

  readonly category = input.required<Category>();

  protected readonly name = computed(() => this.category().name[this.i18n.language()]);

  protected readonly link = computed<[string] | [string, string]>(() => {
    const slug = this.category().slug;
    return slug === 'prebuilt-pcs' ? ['/prebuilt-pcs'] : ['/components', slug];
  });
}
