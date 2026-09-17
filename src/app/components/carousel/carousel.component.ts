import { Component, inject, input } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [],
  selector: 'app-carousel',
  styleUrl: './carousel.component.scss',
  templateUrl: './carousel.component.html',
})
export class Carousel {
  protected readonly i18n = inject(TranslationService);

  readonly heading = input<string>();

  scrollBy(viewport: HTMLElement, direction: 1 | -1): void {
    viewport.scrollBy({ left: direction * viewport.clientWidth * 0.8, behavior: 'smooth' });
  }

  onKeydown(event: KeyboardEvent, viewport: HTMLElement): void {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.scrollBy(viewport, 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.scrollBy(viewport, -1);
    }
  }
}
