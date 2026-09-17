import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  imports: [MatIconModule, MatButtonModule, MatBadgeModule],
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class Header {
  protected readonly navLinks = ['Komponenten', 'Komplett-PCs', 'PC-Konfigurator'];
}
