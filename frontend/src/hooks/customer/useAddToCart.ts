import { addToCart } from "@/services/api/customer/api"
import { useMutation } from "@tanstack/react-query"

interface AddToCartParams {
  currentUserId: number;
  productId: number;
  quantity: number;
  selectedSize: string;
  finalPrice: number;
}

export const useAddToCart = () => {
  return useMutation({
    mutationKey: ['addToCart'],
    mutationFn: (params: AddToCartParams) =>
      addToCart(
        params.currentUserId,
        params.productId,
        params.quantity,
        params.selectedSize,
        params.finalPrice
      )
  })
}