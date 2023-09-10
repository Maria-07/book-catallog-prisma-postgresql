export type IBookFilterRequest = {
  searchTerm?: string | undefined;
  title?: string | undefined;
  author?: string | undefined;
  price?: string | undefined;
  genre?: string | undefined;
  publicationDate?: string | undefined;
  category?: string | undefined;
  maxPrice?: number;
  minPrice?: number;
};

export type IPriceFilters = {
  maxPrice?: number;
  minPrice?: number;
};
