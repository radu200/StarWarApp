export function generatePages(
  currentPage: number,
  pageCount: number
): Array<number> {
  if (pageCount === 0) return [];
  if (pageCount === 1) return [1];

  const delta = 2;

  let range = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(pageCount - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    range.unshift(0);
  }
  if (currentPage + delta < pageCount - 1) {
    range.push(0);
  }

  range.unshift(1);
  range.push(pageCount);
  return range;
}

export function computePageCount(
  itemsCount: number,
  itemsPerPage: number
): number {
  return Math.ceil(itemsCount / itemsPerPage);
}
