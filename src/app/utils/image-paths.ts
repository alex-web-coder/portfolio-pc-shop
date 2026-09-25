/**
 * Single source of truth for where category/product artwork lives on disk
 * (under `public/`, served at the site root). Product cards fall back to the
 * category image via the `<img (error)>` handler when a per-product file
 * hasn't been added yet, so dropping in real photos is a pure asset change —
 * no code or mock-data edits required.
 */

export function categoryImagePath(slug: string): string {
  return `/images/categories/${slug}.svg`;
}

export function productImagePath(id: string): string {
  return `/images/products/${id}.png`;
}
