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

  protected readonly infoLinks: ReadonlyArray<{ labelKey: TranslationKey; path: string }> = [
    { labelKey: 'faq.title', path: '/faq' },
    { labelKey: 'about.title', path: '/about' },
    { labelKey: 'shipping.title', path: '/shipping' },
    { labelKey: 'pages.profile.title', path: '/profile' },
  ];

  protected readonly legalLinks: ReadonlyArray<{ labelKey: TranslationKey; path: string }> = [
    { labelKey: 'imprint.title', path: '/imprint' },
    { labelKey: 'terms.title', path: '/terms' },
    { labelKey: 'privacy.title', path: '/privacy' },
  ];

  protected readonly year = new Date().getFullYear();
}
