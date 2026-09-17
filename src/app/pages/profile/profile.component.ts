import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderHistoryEntry } from '../../models/order.model';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { PcConfigurationStore } from '../../services/pc-configuration-store.service';
import { DEFAULT_PROFILE, ProfileService } from '../../services/profile.service';
import { TranslationService } from '../../services/translation.service';
import { TranslationKey } from '../../services/translations.data';

const LOCALE_BY_LANGUAGE = { de: 'de-DE', en: 'en-GB' } as const;

const COUNTRY_LABEL_KEYS: Record<string, TranslationKey> = {
  de: 'checkout.country.de',
  at: 'checkout.country.at',
  ch: 'checkout.country.ch',
};

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-profile',
  styleUrl: './profile.component.scss',
  templateUrl: './profile.component.html',
})
export class Profile {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly configurationStore = inject(PcConfigurationStore);
  private readonly profileService = inject(ProfileService);
  protected readonly i18n = inject(TranslationService);

  protected readonly history = this.orderService.history;
  protected readonly justSaved = signal(false);
  protected readonly justReset = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    fullName: [this.profileService.profile().fullName, Validators.required],
    email: [this.profileService.profile().email, [Validators.required, Validators.email]],
    street: [this.profileService.profile().street, Validators.required],
    postalCode: [this.profileService.profile().postalCode, [Validators.required, Validators.pattern(/^\d{4,5}$/)]],
    city: [this.profileService.profile().city, Validators.required],
    country: [this.profileService.profile().country, Validators.required],
  });

  protected fieldError(
    fieldName: 'fullName' | 'email' | 'street' | 'postalCode' | 'city',
  ): string | null {
    const control = this.form.controls[fieldName];
    if (!control.touched && !control.dirty) return null;
    if (control.hasError('required')) return this.i18n.t('checkout.error.required');
    if (control.hasError('email')) return this.i18n.t('checkout.error.email');
    if (control.hasError('pattern')) return this.i18n.t('checkout.error.postalCode');
    return null;
  }

  protected countryLabel(code: string): string {
    return this.i18n.t(COUNTRY_LABEL_KEYS[code] ?? 'checkout.country.de');
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.profileService.save(this.form.getRawValue());
    this.justSaved.set(true);
    this.justReset.set(false);
  }

  protected resetDemoData(): void {
    if (!confirm(this.i18n.t('profile.resetConfirm'))) return;

    this.cartService.clear();
    this.orderService.clearHistory();
    this.configurationStore.clear();
    this.profileService.reset();
    this.form.setValue(DEFAULT_PROFILE);
    this.justSaved.set(false);
    this.justReset.set(true);
  }

  protected orderDate(entry: OrderHistoryEntry): string {
    const locale = LOCALE_BY_LANGUAGE[this.i18n.language()];
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(
      new Date(entry.createdAt),
    );
  }

  protected orderItemCount(entry: OrderHistoryEntry): number {
    return entry.lines.reduce((sum, line) => sum + line.quantity, 0);
  }

  protected formatPrice(cents: number): string {
    const locale = LOCALE_BY_LANGUAGE[this.i18n.language()];
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(cents / 100);
  }
}
