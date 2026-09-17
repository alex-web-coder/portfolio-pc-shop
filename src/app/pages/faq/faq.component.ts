import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { TranslationKey } from '../../services/translations.data';

@Component({
  imports: [],
  selector: 'app-faq',
  styleUrl: './faq.component.scss',
  templateUrl: './faq.component.html',
})
export class Faq {
  protected readonly i18n = inject(TranslationService);

  protected readonly items: ReadonlyArray<{ questionKey: TranslationKey; answerKey: TranslationKey }> = [
    { questionKey: 'faq.q1.question', answerKey: 'faq.q1.answer' },
    { questionKey: 'faq.q2.question', answerKey: 'faq.q2.answer' },
    { questionKey: 'faq.q3.question', answerKey: 'faq.q3.answer' },
    { questionKey: 'faq.q4.question', answerKey: 'faq.q4.answer' },
    { questionKey: 'faq.q5.question', answerKey: 'faq.q5.answer' },
  ];
}
