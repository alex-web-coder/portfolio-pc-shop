import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

const PRODUCTS: Product[] = [
  { id: 'prod-1', name: 'GeForce RTX 4070 SUPER 12 GB', categorySlug: 'graphics-cards', priceCents: 64900, available: true },
  { id: 'prod-2', name: 'Radeon RX 7700 XT 12 GB', categorySlug: 'graphics-cards', priceCents: 42900, available: true },
  { id: 'prod-3', name: 'Ryzen 7 7800X3D', categorySlug: 'processors', priceCents: 39900, available: true },
  { id: 'prod-4', name: 'Ryzen 5 7600', categorySlug: 'processors', priceCents: 21900, available: true },
  { id: 'prod-5', name: 'TUF Gaming B650-Plus ATX', categorySlug: 'mainboards', priceCents: 17900, available: true },
  { id: 'prod-6', name: 'FURY Beast 32 GB (2x16 GB) DDR5-6000', categorySlug: 'memory', priceCents: 10900, available: true },
  { id: 'prod-7', name: '750 W 80+ Gold Netzteil', categorySlug: 'power-supplies', priceCents: 8900, available: true },
  { id: 'prod-8', name: 'Midi-Tower ATX Gehäuse', categorySlug: 'cases', priceCents: 6900, available: false },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  getFeaturedProducts(): Observable<Product[]> {
    return of(PRODUCTS);
  }
}
