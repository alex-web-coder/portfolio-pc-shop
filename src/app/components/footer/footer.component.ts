import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslationKey } from '../../services/translations.data';

@Component({
  imports: [RouterLink],
  selector: 'app-footer',
  styleUrl: './footer.component.scss',
  templateUrl: './footer.component.html',
})
export class Footer {
  protected readonly i18n = inject(TranslationService);

  protected readonly shopLinks: ReadonlyArray<{ labelKey: TranslationKey; path: string }> = [
    { labelKey: 'nav.components', path: '/components' },
    { labelKey: 'nav.prebuiltPcs', path: '/prebuilt-pcs' },
    { labelKey: 'nav.configurator', path: '/configurator' },
  ];

  protected readonly legalLinkKeys: readonly TranslationKey[] = [
    'footer.legal.imprint',
    'footer.legal.terms',
    'footer.legal.privacy',
    'footer.legal.contact',
  ];

  protected readonly year = new Date().getFullYear();
}
