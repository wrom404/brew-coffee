import { getActiveOrder } from "@/services/api/customer/api";
import { useQuery } from "@tanstack/react-query";

export const useGetActiveOrder = (userId: number) => {
  return useQuery({
    queryKey: ['activeOrders', userId],
    queryFn: () => userId > 0 ? getActiveOrder(userId) : undefined,  // Check for valid ID
    enabled: userId > 0
  });
};