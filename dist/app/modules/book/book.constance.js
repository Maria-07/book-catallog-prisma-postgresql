"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceSearchableFields = exports.bookRelationalFieldsMapper = exports.bookRelationalFields = exports.bookSearchableFields = exports.bookFilterableFields = void 0;
exports.bookFilterableFields = [
    'searchTerm',
    'title',
    'author',
    'genre',
    'publicationDate',
    'categoryId',
    'maxPrice',
    'minPrice',
];
exports.bookSearchableFields = ['title', 'author', 'genre'];
// [
//   'searchTerm',
//   'title',
//   'author',
//   'genre',
//   'publicationDate',
//   'categoryId',
// ];
exports.bookRelationalFields = ['categoryId'];
exports.bookRelationalFieldsMapper = {
    categoryId: 'category',
};
exports.PriceSearchableFields = ['maxPrice', 'minPrice'];
