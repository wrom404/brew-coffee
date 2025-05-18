import { handleSignOut } from "@/services/api/auth/api";
import { useMutation } from "@tanstack/react-query";

export const useSignOut = () => {
  return useMutation({
    mutationKey: ['sign-out'],
    mutationFn: () => handleSignOut()
  })
}