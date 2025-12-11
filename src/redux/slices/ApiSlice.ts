import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ProductsResponse, SingleProductResponse } from '@/types/ApiResponse';
import { AddToCartResponse, GetUserCartResponse } from '@/interfaces/Cart';
import { AddAddressResponse } from '@/interfaces/Addres';

export const ApiSlice = createApi({
  reducerPath: 'productsApi',
tagTypes: ['Product', 'Cart'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ecommerce.routemisr.com/api/v1',
  }),
  endpoints: (builder) => ({  
    // كل المنتجات
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => '/products',
      providesTags: ['Product'],
    }),

    // منتج واحد    
    getsingelprodact: builder.query<SingleProductResponse, string>({
      query: (id) => `/products/${id}`,
    }),



// // // // // // // // // / // // // // / // // // // // // // / / / / // / 



// إضافة للكارْت
addToCart: builder.mutation<AddToCartResponse, string>({
  query: (productId: string) => ({
    url: "/cart",
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzRjMmYzOTFkMWE3Yzk1ZmRhOGUyMCIsIm5hbWUiOiJaWHp6Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjUwNjU1MDMsImV4cCI6MTc3Mjg0MTUwM30.lJB-L7gsSA_o4FOJIN037hnGRUhfgQd4cKgphoP7vAU`,
    },
    body: {
      productId,
    },
  }),

  invalidatesTags: ["Cart"],
}),



 // جلب البينات   للكارْت
  FetchDataCart: builder.query<GetUserCartResponse, void>({
  query: () => ({
    url: '/cart',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzRjMmYzOTFkMWE3Yzk1ZmRhOGUyMCIsIm5hbWUiOiJaWHp6Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjUwNjU1MDMsImV4cCI6MTc3Mjg0MTUwM30.lJB-L7gsSA_o4FOJIN037hnGRUhfgQd4cKgphoP7vAU`,
    },
  }),

  providesTags: ['Cart'],  

}),




// حذف منتج من الكارت
Remov: builder.mutation<GetUserCartResponse, string>({
  query: (id) => ({
    url: `/cart/${id}`,       // هنا بنحط id المنتج اللي عايز تمسحه
    method: "DELETE",         // DELETE عشان نحذف
    headers: {
      "Content-Type": "application/json",
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzRjMmYzOTFkMWE3Yzk1ZmRhOGUyMCIsIm5hbWUiOiJaWHp6Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjUwNjU1MDMsImV4cCI6MTc3Mjg0MTUwM30.lJB-L7gsSA_o4FOJIN037hnGRUhfgQd4cKgphoP7vAU`,
    },
  }),
  invalidatesTags: ["Cart"], // ده عشان الصفحة تعمل تحديث تلقائي بعد الحذف
}),





clearcart:builder.mutation<GetUserCartResponse, void>
({
  query: () => ({
    url: `/cart`,       // هنا بنحط id المنتج اللي عايز تمسحه
    method: "DELETE",         // DELETE عشان نحذف
    headers: {
      "Content-Type": "application/json",
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzRjMmYzOTFkMWE3Yzk1ZmRhOGUyMCIsIm5hbWUiOiJaWHp6Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjUwNjU1MDMsImV4cCI6MTc3Mjg0MTUwM30.lJB-L7gsSA_o4FOJIN037hnGRUhfgQd4cKgphoP7vAU`,
    },
  }),
  invalidatesTags: ["Cart"], // ده عشان الصفحة تعمل تحديث تلقائي بعد الحذف
}),






updateCartItemCount: builder.mutation<GetUserCartResponse, { productId: string; count: number }>({
  query: ({ productId, count }) => ({
    url: `/cart/${productId}`, // لاحظ اننا بنبعت ID في الرابط
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzRjMmYzOTFkMWE3Yzk1ZmRhOGUyMCIsIm5hbWUiOiJaWHp6Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjUwNjU1MDMsImV4cCI6MTc3Mjg0MTUwM30.lJB-L7gsSA_o4FOJIN037hnGRUhfgQd4cKgphoP7vAU`,
    },
    body: { count }, // هنا بنبعت الـ count بس
  }),
  invalidatesTags: ['Cart'], // عشان الصفحة تتحدث تلقائي
}),




addAddress: builder.mutation<AddAddressResponse, { name: string; details: string; phone: string; city: string }>({
  query: (bodyData) => ({
    url: "/addresses",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzRjMmYzOTFkMWE3Yzk1ZmRhOGUyMCIsIm5hbWUiOiJaWHp6Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjUwNjU1MDMsImV4cCI6MTc3Mjg0MTUwM30.lJB-L7gsSA_o4FOJIN037hnGRUhfgQd4cKgphoP7vAU`,
    },
    body: bodyData,
  }),
}),








  }), 
}); 

export const { 
  useGetAllProductsQuery, 
  useGetsingelprodactQuery, 
  useAddToCartMutation ,
  useFetchDataCartQuery,
  useRemovMutation,
  useClearcartMutation,
 useUpdateCartItemCountMutation,
 useAddAddressMutation,
  } = ApiSlice;
