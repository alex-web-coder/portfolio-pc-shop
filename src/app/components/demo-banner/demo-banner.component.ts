import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [],
  selector: 'app-demo-banner',
  styleUrl: './demo-banner.component.scss',
  templateUrl: './demo-banner.component.html',
})
export class DemoBanner {
  protected readonly i18n = inject(TranslationService);
}
