import { Component, computed, inject, input } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card.component';
import { SearchService } from '../../services/search.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [ProductCard],
  selector: 'app-search-results',
  styleUrl: './search-results.component.scss',
  templateUrl: './search-results.component.html',
})
export class SearchResults {
  protected readonly searchService = inject(SearchService);
  protected readonly i18n = inject(TranslationService);

  readonly q = input<string>('');

  protected readonly results = computed(() =>
    this.searchService.results(this.q(), this.i18n.language()),
  );
}
