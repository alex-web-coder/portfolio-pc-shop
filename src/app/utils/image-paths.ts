/**
 * Single source of truth for where category/product artwork lives on disk
 * (under `public/`, served at the site root). Both product photos and
 * category art try each extension in their respective list in turn via the
 * `<img (error)>` handler, so dropping in a real .png/.jpg/.jpeg is a pure
 * asset change — no code or mock-data edits required. Raster formats are
 * tried before .svg so a newly-added real photo takes priority over the
 * placeholder icon that ships with the repo.
 */

export const PRODUCT_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg'] as const;
export const CATEGORY_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg'] as const;

export function categoryImagePath(slug: string, extensionIndex = 0): string {
  // Relative (no leading slash) so it resolves against <base href>, not the
  // domain root — required for hosting under a sub-path (e.g. GitHub Pages
  // project sites at /<repo-name>/).
  return `images/categories/${slug}.${CATEGORY_IMAGE_EXTENSIONS[extensionIndex]}`;
}

export function productImagePath(id: string, extensionIndex = 0): string {
  return `images/products/${id}.${PRODUCT_IMAGE_EXTENSIONS[extensionIndex]}`;
}

/**
 * `<img (error)>` handler for category art: steps through the remaining
 * extensions in CATEGORY_IMAGE_EXTENSIONS. Nothing left to fall back to once
 * those are exhausted — every category ships with at least a placeholder
 * .svg, so reaching the end means that file is genuinely missing.
 */
export function handleCategoryImageError(event: Event, slug: string): void {
  const img = event.target as HTMLImageElement;
  const attempt = Number(img.dataset['imgAttempt'] ?? '0') + 1;
  if (attempt < CATEGORY_IMAGE_EXTENSIONS.length) {
    img.dataset['imgAttempt'] = String(attempt);
    img.src = categoryImagePath(slug, attempt);
  }
}

/**
 * `<img (error)>` handler for product photos: steps through the remaining
 * extensions in PRODUCT_IMAGE_EXTENSIONS, then switches into the category
 * icon's own extension chain once none of them load. `data-img-phase` marks
 * that switch so the second round of error events advances the *category*
 * list instead of re-running the product one.
 */
export function handleProductImageError(event: Event, id: string, categorySlug: string): void {
  const img = event.target as HTMLImageElement;

  if (img.dataset['imgPhase'] !== 'category') {
    const attempt = Number(img.dataset['imgAttempt'] ?? '0') + 1;
    if (attempt < PRODUCT_IMAGE_EXTENSIONS.length) {
      img.dataset['imgAttempt'] = String(attempt);
      img.src = productImagePath(id, attempt);
      return;
    }
    img.dataset['imgPhase'] = 'category';
    img.dataset['imgAttempt'] = '0';
    img.src = categoryImagePath(categorySlug, 0);
    return;
  }

  const attempt = Number(img.dataset['imgAttempt'] ?? '0') + 1;
  if (attempt < CATEGORY_IMAGE_EXTENSIONS.length) {
    img.dataset['imgAttempt'] = String(attempt);
    img.src = categoryImagePath(categorySlug, attempt);
  }
}

/**
 * `<img (load)>` handler for the sharp foreground image: hides the blurred
 * backdrop sibling once the resolved src turns out to be the flat .svg
 * placeholder. Blurring a mostly-transparent vector icon produces dark
 * fringing artifacts at its edges, so the backdrop is only useful behind a
 * real raster photo.
 */
export function hideBackdropIfPlaceholder(event: Event): void {
  const img = event.target as HTMLImageElement;
  if (!img.src.endsWith('.svg')) return;
  const backdrop = img.previousElementSibling as HTMLElement | null;
  if (backdrop) backdrop.style.display = 'none';
}
