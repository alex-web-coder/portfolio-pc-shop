import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Carousel } from '../../components/carousel/carousel.component';
import { CategoryTile } from '../../components/category-tile/category-tile.component';
import { ProductCard } from '../../components/product-card/product-card.component';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  imports: [Carousel, CategoryTile, ProductCard],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class Home {
  private readonly categoryService = inject(CategoryService);
  private readonly productService = inject(ProductService);

  protected readonly categories = toSignal(this.categoryService.getCategories(), {
    initialValue: [],
  });
  protected readonly products = toSignal(this.productService.getFeaturedProducts(), {
    initialValue: [],
  });
}
