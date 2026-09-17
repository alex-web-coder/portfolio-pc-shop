import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.component.scss',
  templateUrl: './footer.component.html',
})
export class Footer {
  protected readonly shopLinks = ['Komponenten', 'Komplett-PCs', 'PC-Konfigurator'];
  protected readonly legalLinks = ['Impressum', 'AGB', 'Datenschutz', 'Kontakt'];
  protected readonly year = new Date().getFullYear();
}
