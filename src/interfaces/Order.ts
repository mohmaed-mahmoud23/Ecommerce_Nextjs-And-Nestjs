  export interface Order {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: CartItem[];
  paidAt: string; // أو Date لو هتحولها
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

interface Product {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
