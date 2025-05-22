import { getProductById } from "@/services/api/customer/api"
import { useQuery } from "@tanstack/react-query"

export const useGetProductById = (id: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['customerProduct', id], // Include id in queryKey for unique caching
    queryFn: () => getProductById(id),
    enabled: options?.enabled, // Respect the enabled option
  })
}