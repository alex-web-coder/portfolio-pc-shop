import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompareService } from '../../services/compare.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [RouterLink],
  selector: 'app-compare-bar',
  styleUrl: './compare-bar.component.scss',
  templateUrl: './compare-bar.component.html',
})
export class CompareBar {
  protected readonly compareService = inject(CompareService);
  protected readonly i18n = inject(TranslationService);
}
