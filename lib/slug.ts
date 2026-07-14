export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function tagPath(tag: string): string {
  return `/tags/${slugify(tag)}`;
}

export function categoryPath(category: string): string {
  return `/categories/${slugify(category)}`;
}
