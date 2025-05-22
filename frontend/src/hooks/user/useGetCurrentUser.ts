import { getCurrentUser } from "@/services/api/user/api"
import { useQuery } from "@tanstack/react-query"

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => getCurrentUser()
  })
}