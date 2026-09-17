import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-footer',
  styleUrl: './footer.component.scss',
  templateUrl: './footer.component.html',
})
export class Footer {
  protected readonly shopLinks: ReadonlyArray<{ label: string; path: string }> = [
    { label: 'Komponenten', path: '/components' },
    { label: 'Komplett-PCs', path: '/prebuilt-pcs' },
    { label: 'PC-Konfigurator', path: '/configurator' },
  ];
  protected readonly legalLinks = ['Impressum', 'AGB', 'Datenschutz', 'Kontakt'];
  protected readonly year = new Date().getFullYear();
}
