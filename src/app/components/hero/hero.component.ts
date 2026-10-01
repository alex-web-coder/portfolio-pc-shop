import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroSlide } from '../../models/hero-slide.model';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [RouterLink],
  selector: 'app-hero-carousel',
  styleUrl: './hero-carousel.component.scss',
  templateUrl: './hero-carousel.component.html',
})
export class HeroCarousel {
  protected readonly i18n = inject(TranslationService);

  readonly slides = input.required<HeroSlide[]>();

  protected readonly currentIndex = signal(0);
  protected readonly currentSlide = computed(() => this.slides()[this.currentIndex()]);

  protected next(): void {
    this.currentIndex.update((index) => (index + 1) % this.slides().length);
  }

  protected previous(): void {
    this.currentIndex.update((index) => (index - 1 + this.slides().length) % this.slides().length);
  }

  protected goTo(index: number): void {
    this.currentIndex.set(index);
  }

  protected dotLabel(index: number): string {
    return `${this.i18n.t('hero.slideLabel')} ${index + 1}`;
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous();
    }
  }
}
