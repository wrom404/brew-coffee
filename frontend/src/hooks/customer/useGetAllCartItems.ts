import { getAllCartItems } from "@/services/api/customer/api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCartItems = (userId: number) => {
  return useQuery({
    queryKey: ['cartItems', userId],
    queryFn: () => getAllCartItems(userId)
  })
}