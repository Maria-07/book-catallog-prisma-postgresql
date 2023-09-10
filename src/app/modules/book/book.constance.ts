export const bookFilterableFields: string[] = [
  'searchTerm',
  'title',
  'author',
  'genre',
  'publicationDate',
  'categoryId',
  'maxPrice',
  'minPrice',
];
export const bookSearchableFields: string[] = ['title', 'author', 'genre'];

// [
//   'searchTerm',
//   'title',
//   'author',
//   'genre',
//   'publicationDate',
//   'categoryId',
// ];

export const bookRelationalFields: string[] = ['categoryId'];
export const bookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};

export const PriceSearchableFields = ['maxPrice', 'minPrice'];
