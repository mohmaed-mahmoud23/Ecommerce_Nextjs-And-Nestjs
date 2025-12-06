import { Product } from "@/interfaces/prudacts"
import { Brand } from "@/interfaces/Brand"
import { Category } from "@/interfaces/Category"
import { ApiResponse } from "@/interfaces/api";

export type ProductsResponse = ApiResponse<Product>;
export type BrandsResponse = ApiResponse<Brand>;
export type CategoriesResponse = ApiResponse<Category>;

// Single item responses
export type SingleProductResponse = {
  data: Product;
};
export type SingleBrandResponse = {
  data: Brand;
};

export type SingleCategoryResponse = {
  data: Category;
};

