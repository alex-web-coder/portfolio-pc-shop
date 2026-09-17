import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslationKey } from '../../services/translations.data';

@Component({
  imports: [RouterLink],
  selector: 'app-coming-soon',
  styleUrl: './coming-soon.component.scss',
  templateUrl: './coming-soon.component.html',
})
export class ComingSoon {
  protected readonly i18n = inject(TranslationService);

  readonly titleKey = input.required<TranslationKey>();
}
