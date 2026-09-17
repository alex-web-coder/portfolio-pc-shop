import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Carousel } from '../../components/carousel/carousel.component';
import { CategoryTile } from '../../components/category-tile/category-tile.component';
import { ProductCard } from '../../components/product-card/product-card.component';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { TranslationService } from '../../services/translation.service';

const FEATURED_PRODUCT_COUNT = 8;

@Component({
  imports: [RouterLink, Carousel, CategoryTile, ProductCard],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class Home {
  private readonly categoryService = inject(CategoryService);
  private readonly productService = inject(ProductService);
  protected readonly i18n = inject(TranslationService);

  protected readonly categories = toSignal(this.categoryService.getCategories(), {
    initialValue: [],
  });
  private readonly products = toSignal(this.productService.getProducts(), {
    initialValue: [],
  });
  protected readonly featuredProducts = computed(() =>
    this.products().slice(0, FEATURED_PRODUCT_COUNT),
  );
}
