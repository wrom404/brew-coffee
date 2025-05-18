import { SignInSchema } from "@/lib/zod/authSchema"
import axios from "axios"

interface SignInProps {
  success?: boolean;
  message?: string;
  error?: string;
}

export const handleSignIn = async (userData: SignInSchema): Promise<SignInProps | void> => {
  try {
    const result = await axios.post(`http://localhost:4000/api/auth/sign-in`, userData);

    if (!result.data.success) {
      // ⚠️ Make sure to pass a string (not an object) to the catch block,
      // otherwise it will display as "[object Object]" in logs.
      throw new Error(result.data.message || "Signin failed.");
    }

    return result.data; // ✅ This will be passed to the onSuccess callback of React Query
  } catch (error: unknown) {
    // Re-throw the error so React Query can catch it and call onError
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An Axios error occurred");
    }

    if (error instanceof Error) {
      console.log("Error message:", error.message);
      // ❗ If `success: false`, this error is passed to the onError callback of React Query
      throw error;
    }

    throw new Error("An unexpected error occurred.");
  }
};

