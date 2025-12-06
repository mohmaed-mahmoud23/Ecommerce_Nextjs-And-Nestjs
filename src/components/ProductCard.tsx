import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Product } from "@/interfaces/prudacts";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  prodact: Product;
}

export default function ProductCard({ prodact }: ProductCardProps) {
  return (
    <div className="flex flex-col">
      <Card className="max-w-full rounded-xl overflow-hidden border bg-white shadow hover:shadow-lg transition-all duration-300">
        {/* Image */}
        <div className="relative h-[220px] bg-gray-50">
          {prodact?.ratingsQuantity >= 4.5 && (
            <Badge className="absolute top-2 left-2 z-10 text-xs">
              Popular
            </Badge>
          )}

          <Link href={`/ProdactPage/${prodact.id}`}>
            <Image
              src={prodact?.imageCover}
              alt={prodact?.title}
              fill
              className="object-contain p-4 hover:scale-105 transition duration-300"
            />
          </Link>
        </div>

        {/* Content */}
        <CardContent className="p-4 space-y-2">
          <Link href={`/ProdactPage/${prodact.id}`}>
            <p className="text-xs text-muted-foreground uppercase">
              {prodact?.brand?.name}
            </p>
          </Link>

          <h3 className="text-sm font-semibold line-clamp-1">
            {prodact?.title}
          </h3>

          <h3 className="text-sm font-semibold line-clamp-1">
            {prodact?.sold}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.round(prodact?.ratingsAverage) }).map(
              (_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-yellow-400 text-yellow-400"
                />
              )
            )}
            <span className="text-xs text-muted-foreground">
              ({prodact?.ratingsAverage})
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            {prodact?.category?.name}
          </p>

          <p className="font-bold text-base mt-1">
            £{prodact?.price.toLocaleString()}
          </p>
        </CardContent>

        <CardFooter>
          <AddToCartButton productId={prodact._id} />
        </CardFooter>
      </Card>
    </div>
  );
}
