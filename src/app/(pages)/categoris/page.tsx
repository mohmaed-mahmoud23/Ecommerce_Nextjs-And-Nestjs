"use client";

import { useGetallcategoriQuery } from "@/redux/slices/ApiSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import CategoriesSkeleton from "@/components/CategoriesSkeleton";

export default function Categories() {
  const { data, isLoading } = useGetallcategoriQuery();

  if (isLoading) return <CategoriesSkeleton/>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-4">
      {data?.data.map((cat) => (
        <Card
          key={cat._id}
          className="overflow-hidden hover:shadow-lg transition"
        >
          {/* Image */}
          <div className="relative h-45 w-full">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <CardHeader>
            <CardTitle className="text-lg">{cat.name}</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">Slug: {cat.slug}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
