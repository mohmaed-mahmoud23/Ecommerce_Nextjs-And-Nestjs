import { Brand } from "./Brand";
import { Category, Subcategory } from "./Category";

export interface CartProduct<t> {
  count: number;
  _id: string;
  product: t 
  price: number;
  message: string;
}

export interface CartData<t> {
  _id: string;
  cartOwner: string;
  products: CartProduct<t>[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface AddToCartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData<string>
  message?: string;

}
export interface GetUserCartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData<Product>
}




interface Product {
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  subcategory: Subcategory[];
  id: string;
}