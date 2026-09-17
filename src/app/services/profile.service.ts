import { Injectable, signal } from '@angular/core';
import { DemoProfile } from '../models/demo-profile.model';

const STORAGE_KEY = 'pc-shop.profile';

export const DEFAULT_PROFILE: DemoProfile = {
  fullName: 'Alex Demo',
  email: 'alex.demo@beispiel.de',
  street: 'Beispielweg 1',
  postalCode: '12345',
  city: 'Beispielstadt',
  country: 'de',
};

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly profileSignal = signal<DemoProfile>(readStoredProfile());

  readonly profile = this.profileSignal.asReadonly();

  save(profile: DemoProfile): void {
    this.profileSignal.set(profile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Storage can be unavailable — the edit still applies for this session.
    }
  }

  reset(): void {
    this.profileSignal.set(DEFAULT_PROFILE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clean up if storage was never available.
    }
  }
}

function readStoredProfile(): DemoProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return isValidProfile(parsed) ? parsed : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

function isValidProfile(value: unknown): value is DemoProfile {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate['fullName'] === 'string' &&
    typeof candidate['email'] === 'string' &&
    typeof candidate['street'] === 'string' &&
    typeof candidate['postalCode'] === 'string' &&
    typeof candidate['city'] === 'string' &&
    typeof candidate['country'] === 'string'
  );
}
