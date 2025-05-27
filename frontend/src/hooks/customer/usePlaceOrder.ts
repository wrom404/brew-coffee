import { placeOrderProduct } from "@/services/api/customer/api";
import { useMutation } from "@tanstack/react-query";

type OrderData = {
  userId: number,
  cartProductId: number[],
  paymentMethod: string,
  message: string
}

export const usePlaceOrder = () => {
  return useMutation({
    mutationKey: ['placeOrder'],
    mutationFn: (data: OrderData) => placeOrderProduct(data.userId, data.cartProductId, data.paymentMethod, data.message)
  })
}