import { Component, input } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  imports: [],
  selector: 'app-category-tile',
  styleUrl: './category-tile.component.scss',
  templateUrl: './category-tile.component.html',
})
export class CategoryTile {
  readonly category = input.required<Category>();
}
