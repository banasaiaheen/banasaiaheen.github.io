/** Total number of pages for `count` items at `perPage` items per page (minimum 1). */
export function getTotalPages(count: number, perPage: number): number {
  return Math.max(1, Math.ceil(count / perPage));
}

/** The slice of `items` that belongs on `page` (1-indexed). */
export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  return items.slice((page - 1) * perPage, page * perPage);
}
