import { Component, ElementRef, HostListener, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { Category } from '../../models/category.model';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { SearchService } from '../../services/search.service';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';
import { TranslationKey } from '../../services/translations.data';

@Component({
  imports: [FormsModule, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule, MatBadgeModule],
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class Header {
  protected readonly i18n = inject(TranslationService);
  protected readonly cartService = inject(CartService);
  protected readonly themeService = inject(ThemeService);
  private readonly searchService = inject(SearchService);
  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected readonly navLinks: ReadonlyArray<{ labelKey: TranslationKey; path: string }> = [
    { labelKey: 'nav.components', path: '/components' },
    { labelKey: 'nav.prebuiltPcs', path: '/prebuilt-pcs' },
    { labelKey: 'nav.configurator', path: '/configurator' },
  ];

  private readonly allCategories = toSignal(this.categoryService.getCategories(), {
    initialValue: [] as Category[],
  });
  protected readonly componentCategories = computed(() =>
    this.allCategories().filter((category) => category.slug !== 'prebuilt-pcs'),
  );

  protected readonly query = signal('');
  protected readonly isDropdownOpen = signal(false);

  protected readonly suggestions = computed(() =>
    this.searchService.suggestions(this.query(), this.i18n.language()),
  );

  protected productName(product: { name: Record<'de' | 'en', string> }): string {
    return product.name[this.i18n.language()];
  }

  protected productLink(product: { categorySlug: string; id: string }): [string, string, ...string[]] {
    return product.categorySlug === 'prebuilt-pcs'
      ? ['/prebuilt-pcs', product.id]
      : ['/components', product.categorySlug, product.id];
  }

  protected onQueryInput(value: string): void {
    this.query.set(value);
    this.isDropdownOpen.set(value.trim().length > 0);
  }

  protected onFocus(): void {
    if (this.query().trim().length > 0) this.isDropdownOpen.set(true);
  }

  protected onSuggestionSelected(): void {
    this.isDropdownOpen.set(false);
    this.query.set('');
  }

  protected onSubmit(): void {
    const value = this.query().trim();
    if (!value) return;
    this.isDropdownOpen.set(false);
    this.router.navigate(['/search'], { queryParams: { q: value } });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isDropdownOpen.set(false);
    }
  }
}
