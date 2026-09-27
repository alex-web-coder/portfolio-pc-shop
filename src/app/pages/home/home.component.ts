import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Carousel } from '../../components/carousel/carousel.component';
import { CategoryTile } from '../../components/category-tile/category-tile.component';
import { HeroCarousel } from '../../components/hero-carousel/hero-carousel.component';
import { ProductCard } from '../../components/product-card/product-card.component';
import { HeroSlide } from '../../models/hero-slide.model';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { TranslationService } from '../../services/translation.service';

const FEATURED_PRODUCT_COUNT = 8;

const HERO_SLIDES: HeroSlide[] = [
  {
    imageUrl: '/images/hero/hero-bg-configurator.jpeg',
    eyebrowKey: 'hero.slide1.eyebrow',
    titleKey: 'hero.slide1.title',
    leadKey: 'hero.slide1.lead',
    ctaLabelKey: 'hero.slide1.cta',
    ctaLink: '/configurator',
  },
  {
    imageUrl: '/images/hero/hero-bg-graphics.jpeg',
    eyebrowKey: 'hero.slide2.eyebrow',
    titleKey: 'hero.slide2.title',
    leadKey: 'hero.slide2.lead',
    ctaLabelKey: 'hero.slide2.cta',
    ctaLink: '/components/graphics-cards',
  },
  {
    imageUrl: '/images/hero/hero-bg-prebuilt.jpeg',
    eyebrowKey: 'hero.slide3.eyebrow',
    titleKey: 'hero.slide3.title',
    leadKey: 'hero.slide3.lead',
    ctaLabelKey: 'hero.slide3.cta',
    ctaLink: '/prebuilt-pcs',
  },
];

@Component({
  imports: [HeroCarousel, Carousel, CategoryTile, ProductCard],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class Home {
  private readonly categoryService = inject(CategoryService);
  private readonly productService = inject(ProductService);
  protected readonly i18n = inject(TranslationService);

  protected readonly heroSlides = HERO_SLIDES;

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
