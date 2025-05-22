import { getAllProducts } from "@/services/api/customer/api"
import { useQuery } from "@tanstack/react-query"

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ['customerProducts'],
    queryFn: () => getAllProducts(),
  })
}