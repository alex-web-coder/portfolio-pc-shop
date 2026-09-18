import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
  input,
  signal,
} from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [],
  selector: 'app-carousel',
  styleUrl: './carousel.component.scss',
  templateUrl: './carousel.component.html',
})
export class Carousel implements AfterViewInit, OnDestroy {
  protected readonly i18n = inject(TranslationService);

  readonly heading = input<string>();

  @ViewChild('viewport') private readonly viewportRef!: ElementRef<HTMLElement>;
  @ViewChild('track') private readonly trackRef!: ElementRef<HTMLElement>;

  protected readonly atStart = signal(true);
  protected readonly atEnd = signal(false);

  // The track's content (categories/products) arrives asynchronously via HTTP,
  // so its width is still 0 right after view init — a ResizeObserver re-checks
  // the edges once the real content has actually laid out.
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    const viewport = this.viewportRef.nativeElement;
    this.updateEdges(viewport);

    this.resizeObserver = new ResizeObserver(() => this.updateEdges(viewport));
    this.resizeObserver.observe(this.trackRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

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

  protected updateEdges(viewport: HTMLElement): void {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    this.atStart.set(viewport.scrollLeft <= 1);
    this.atEnd.set(viewport.scrollLeft >= maxScroll - 1);
  }
}
