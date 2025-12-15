import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CategoriesResponse, ProductsResponse, SingleProductResponse } from '@/types/ApiResponse';
import { AddToCartResponse, GetUserCartResponse } from '@/interfaces/Cart';
import { AddAddressResponse } from '@/interfaces/Addres';
import { getSession } from "next-auth/react";
import { Order } from '@/interfaces/Order';

export const ApiSlice = createApi({
  reducerPath: 'productsApi',
  tagTypes: ["Product", "Cart", "Order","Categories"], // 👈 ضيف Order
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ecommerce.routemisr.com/api/v1',



    prepareHeaders: async (headers) => {
      const session = await getSession();

      if (session?.token) {
        headers.set("token", session.token);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),


  
  endpoints: (builder) => ({  
    // كل المنتجات
    getAllProducts: builder.query<ProductsResponse, void>({
      query: () => '/products',
      providesTags: ['Product'],
    }),



getallcategori: builder.query<CategoriesResponse, void>({
  query: () => "/categories",
  providesTags: ["Categories"],
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

  }),

  providesTags: ['Cart'],  

}),




// حذف منتج من الكارت
Remov: builder.mutation<GetUserCartResponse, string>({
  query: (id) => ({
    url: `/cart/${id}`,       // هنا بنحط id المنتج اللي عايز تمسحه
    method: "DELETE",         // DELETE عشان نحذف
  
  }),
  invalidatesTags: ["Cart"], // ده عشان الصفحة تعمل تحديث تلقائي بعد الحذف
}),





clearcart:builder.mutation<GetUserCartResponse, void>
({
  query: () => ({
    url: `/cart`,       // هنا بنحط id المنتج اللي عايز تمسحه
    method: "DELETE",         // DELETE عشان نحذف
  
  }),
  invalidatesTags: ["Cart"], // ده عشان الصفحة تعمل تحديث تلقائي بعد الحذف
}),






updateCartItemCount: builder.mutation<GetUserCartResponse, { productId: string; count: number }>({
  query: ({ productId, count }) => ({
    url: `/cart/${productId}`, // لاحظ اننا بنبعت ID في الرابط
    method: 'PUT',

    body: { count }, // هنا بنبعت الـ count بس
  }),
  invalidatesTags: ['Cart'], // عشان الصفحة تتحدث تلقائي
}),




addAddress: builder.mutation<AddAddressResponse, { name: string; details: string; phone: string; city: string }>({
  query: (bodyData) => ({
    url: "/addresses",
    method: "POST",

    body: bodyData,
  }),
}),




getUserorder: builder.query<Order[], string>({
  query: (id) => `/orders/user/${id}`,
  providesTags: ["Order"],
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
 useGetUserorderQuery,
 useGetallcategoriQuery
  } = ApiSlice;
