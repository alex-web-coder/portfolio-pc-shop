import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbItem } from '../../models/breadcrumb-item.model';

@Component({
  imports: [RouterLink],
  selector: 'app-breadcrumb',
  styleUrl: './breadcrumb.component.scss',
  templateUrl: './breadcrumb.component.html',
})
export class Breadcrumb {
  readonly items = input.required<BreadcrumbItem[]>();
}
