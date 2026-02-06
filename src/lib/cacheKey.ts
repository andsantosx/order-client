/**
 * Centralized Cache Key Generation
 * 
 * Ensures deterministic cache keys across all product queries.
 * Rules:
 * 1. Arrays are always sorted
 * 2. Search queries are trimmed and normalized
 * 3. Null/undefined are consistently represented as null
 */

export interface ProductQueryParams {
  search?: string;
  categories?: string[];
  brands?: string[];
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}

export function generateProductCacheKey(params: ProductQueryParams = {}): string {
  const normalized = {
    search: (params.search || "").trim(),
    categories: [...(params.categories || [])].sort(),
    brands: [...(params.brands || [])].sort(),
    sizes: [...(params.sizes || [])].sort(),
    minPrice: params.minPrice ?? null,
    maxPrice: params.maxPrice ?? null,
    sortBy: params.sortBy || "newest"
  };

  return JSON.stringify(normalized);
}
