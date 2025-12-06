export interface GetCartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProductItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartProductItem {
  count: number;
  _id: string;
  product: CartProductDetails;
  price: number;
}

export interface CartProductDetails {
  subcategory: SubCategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
