import { Component, computed, inject, input } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { TranslationKey } from '../../services/translations.data';

export type LegalPageKind = 'imprint' | 'terms' | 'privacy';

const TITLE_KEYS: Record<LegalPageKind, TranslationKey> = {
  imprint: 'imprint.title',
  terms: 'terms.title',
  privacy: 'privacy.title',
};

// Only "terms" has real generic content — imprint/privacy need actual operator
// details (name/address for imprint, real data-handling practices for privacy)
// that don't exist yet for this project, so they show a demo-shop disclaimer
// instead of inventing fake real-world information.
const BODY_KEYS: Record<LegalPageKind, TranslationKey | null> = {
  imprint: null,
  terms: 'terms.body',
  privacy: null,
};

@Component({
  imports: [],
  selector: 'app-legal',
  styleUrl: './legal.component.scss',
  templateUrl: './legal.component.html',
})
export class Legal {
  protected readonly i18n = inject(TranslationService);

  readonly kind = input.required<LegalPageKind>();

  protected readonly titleKey = computed(() => TITLE_KEYS[this.kind()]);
  protected readonly bodyKey = computed(() => BODY_KEYS[this.kind()]);
}
