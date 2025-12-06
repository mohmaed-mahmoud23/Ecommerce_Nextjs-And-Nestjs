"use client";

import { toast } from "react-toastify";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import {
  useAddToCartMutation,
  useFetchDataCartQuery,
} from "@/redux/slices/ApiSlice";

interface AddToCartButtonProps {
  productId: string;
  disabled?: boolean;
}

const AddToCartButton = ({ productId, disabled }: AddToCartButtonProps) => {
  const { data: cartData } = useFetchDataCartQuery();
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleClick = () => {
    const isInCart = cartData?.data?.products?.some(
      (item) => item.product._id === productId
    );

    if (isInCart) {
      toast.info("Product already in your cart");
      return;
    }

    addToCart(productId)
      .unwrap()
      .then(() => toast.success("Added to cart"))
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <Button
      className="w-full"
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
};

export default AddToCartButton;
