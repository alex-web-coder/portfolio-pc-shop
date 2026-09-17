import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [],
  selector: 'app-about',
  styleUrl: './about.component.scss',
  templateUrl: './about.component.html',
})
export class About {
  protected readonly i18n = inject(TranslationService);
}
