import { SignInSchema } from "@/lib/zod/authSchema";
import { handleSignIn } from "@/services/api/auth/api";
import { useMutation } from "@tanstack/react-query"

export const useSignIn = () => {
  return useMutation({
    mutationKey: ['sign-in'],
    mutationFn: (userData: SignInSchema) => handleSignIn(userData),
  });
}