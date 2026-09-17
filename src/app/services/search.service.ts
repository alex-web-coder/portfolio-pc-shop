import { Injectable, inject, signal } from '@angular/core';
import { Language } from '../models/language.model';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

const SUGGESTION_LIMIT = 6;

/**
 * Client-side search over the mock catalog — the FE stand-in for the
 * backlog's "indexed search with server-side autocomplete"; true
 * server-side indexing stays deferred until there's a real backend.
 */
@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly productService = inject(ProductService);

  readonly isLoading = signal(true);
  private readonly products = signal<Product[]>([]);

  constructor() {
    this.productService.getProducts().subscribe((products) => {
      this.products.set(products);
      this.isLoading.set(false);
    });
  }

  suggestions(query: string, language: Language): Product[] {
    return this.matches(query, language).slice(0, SUGGESTION_LIMIT);
  }

  results(query: string, language: Language): Product[] {
    return this.matches(query, language);
  }

  private matches(query: string, language: Language): Product[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return this.products().filter(
      (product) =>
        product.name[language].toLowerCase().includes(q) ||
        product.manufacturer.toLowerCase().includes(q),
    );
  }
}
