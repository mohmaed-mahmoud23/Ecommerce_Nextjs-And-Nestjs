"use client";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { useGetAllProductsQuery } from "@/redux/slices/ApiSlice";

const Prodatcpage = () => {
  const { data, isLoading } = useGetAllProductsQuery();
  console.log("rtq", data?.data);


 if (isLoading) {
   return (
     <div className="px-2 py-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
       {Array.from({ length: 10 }).map((_, i) => (
         <ProductCardSkeleton key={i} />
       ))}
     </div>
   );
 }

  return (
    <div className="      px-2  py-2   grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-2  ">
      {data?.data.map((prodact) => (
        <ProductCard key={prodact._id} prodact={prodact} />
      ))}
    </div>
  );
};

export default Prodatcpage;
