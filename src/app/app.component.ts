import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DemoBanner } from './components/demo-banner/demo-banner.component';
import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DemoBanner, Header, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {}
