
export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // أو Category['_id'] لو حبيت تربطه
}