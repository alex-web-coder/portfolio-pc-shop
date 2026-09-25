/**
 * Single source of truth for where category/product artwork lives on disk
 * (under `public/`, served at the site root). Product cards try each
 * extension in PRODUCT_IMAGE_EXTENSIONS in turn via the `<img (error)>`
 * handler, then fall back to the category image once none of them exist —
 * so dropping in a real photo (.png, .jpg, or .jpeg) is a pure asset change,
 * no code or mock-data edits required.
 */

export const PRODUCT_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg'] as const;

export function categoryImagePath(slug: string): string {
  return `/images/categories/${slug}.svg`;
}

export function productImagePath(id: string, extensionIndex = 0): string {
  return `/images/products/${id}.${PRODUCT_IMAGE_EXTENSIONS[extensionIndex]}`;
}

/**
 * `<img (error)>` handler for product photos: steps through the remaining
 * extensions in PRODUCT_IMAGE_EXTENSIONS, then falls back to the category
 * icon once none of them load.
 */
export function handleProductImageError(event: Event, id: string, categorySlug: string): void {
  const img = event.target as HTMLImageElement;
  const attempt = Number(img.dataset['imgAttempt'] ?? '0') + 1;
  if (attempt < PRODUCT_IMAGE_EXTENSIONS.length) {
    img.dataset['imgAttempt'] = String(attempt);
    img.src = productImagePath(id, attempt);
  } else {
    img.src = categoryImagePath(categorySlug);
  }
}
