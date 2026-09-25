import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [],
  selector: 'app-demo-banner',
  styleUrl: './demo-banner.component.scss',
  templateUrl: './demo-banner.component.html',
  host: { '[class.dismissed]': 'dismissed()' },
})
export class DemoBanner {
  protected readonly i18n = inject(TranslationService);

  protected readonly dismissed = signal(false);

  protected dismiss(): void {
    this.dismissed.set(true);
  }
}
