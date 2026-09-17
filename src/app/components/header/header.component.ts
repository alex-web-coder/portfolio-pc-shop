import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatButtonModule, MatBadgeModule],
  selector: 'app-header',
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class Header {
  protected readonly navLinks: ReadonlyArray<{ label: string; path: string }> = [
    { label: 'Komponenten', path: '/components' },
    { label: 'Komplett-PCs', path: '/prebuilt-pcs' },
    { label: 'PC-Konfigurator', path: '/configurator' },
  ];
}
