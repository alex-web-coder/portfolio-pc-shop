import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../services/cart.service';
import { TranslationService } from '../../services/translation.service';
import { TranslationKey } from '../../services/translations.data';

@Component({
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatButtonModule, MatBadgeModule],
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class Header {
  protected readonly i18n = inject(TranslationService);
  protected readonly cartService = inject(CartService);

  protected readonly navLinks: ReadonlyArray<{ labelKey: TranslationKey; path: string }> = [
    { labelKey: 'nav.components', path: '/components' },
    { labelKey: 'nav.prebuiltPcs', path: '/prebuilt-pcs' },
    { labelKey: 'nav.configurator', path: '/configurator' },
  ];
}
