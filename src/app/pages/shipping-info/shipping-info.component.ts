import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  imports: [],
  selector: 'app-shipping-info',
  styleUrl: './shipping-info.component.scss',
  templateUrl: './shipping-info.component.html',
})
export class ShippingInfo {
  protected readonly i18n = inject(TranslationService);
}
