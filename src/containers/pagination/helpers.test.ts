import * as helpers from './helpers';

describe('Pagination helpers', () => {
  it('should return empty array', () => {
    expect(helpers.generatePages(0, 0)).toEqual([]);
  });

  it('should return  array  with one page', () => {
    expect(helpers.generatePages(1, 1)).toEqual([1]);
  });

  it('should return array with 5 pages', () => {
    expect(helpers.generatePages(1, 5)).toEqual([1, 2, 3, 0, 5]);
  });

  it('should compute 0 pages', () => {
    const itemsCount = 0;
    const itemsPerPage = 10;
    expect(helpers.computePageCount(itemsCount, itemsPerPage)).toEqual(0);
  });

  it('should compute 9 pages', () => {
    const itemsCount = 82;
    const itemsPerPage = 10;
    expect(helpers.computePageCount(itemsCount, itemsPerPage)).toEqual(9);
  });
});
