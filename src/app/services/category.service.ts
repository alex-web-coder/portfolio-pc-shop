import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';

const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Grafikkarten', slug: 'graphics-cards' },
  { id: 'cat-2', name: 'Prozessoren', slug: 'processors' },
  { id: 'cat-3', name: 'Mainboards', slug: 'mainboards' },
  { id: 'cat-4', name: 'Arbeitsspeicher', slug: 'memory' },
  { id: 'cat-5', name: 'Netzteile', slug: 'power-supplies' },
  { id: 'cat-6', name: 'Gehäuse', slug: 'cases' },
];

@Injectable({ providedIn: 'root' })
export class CategoryService {
  getCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }
}
