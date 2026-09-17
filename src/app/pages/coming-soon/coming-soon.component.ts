import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-coming-soon',
  styleUrl: './coming-soon.component.scss',
  templateUrl: './coming-soon.component.html',
})
export class ComingSoon {
  readonly title = input('Diese Seite');
}
