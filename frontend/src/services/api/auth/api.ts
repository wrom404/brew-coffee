import { SignInSchema } from "@/lib/zod/authSchema"
import axios from "axios"

interface Auth {
  success?: boolean;
  message?: string;
  error?: string;
}

axios.defaults.withCredentials = true;

export const handleSignIn = async (userData: SignInSchema): Promise<Auth | void> => {
  try {
    const result = await axios.post(`http://localhost:4000/api/auth/sign-in`, userData);

    if (!result.data.success) {
      // ⚠️ Make sure to pass a string (not an object) to the catch block,
      // otherwise it will display as "[object Object]" in logs.
      throw new Error(result.data.message || "Signin failed.");
    }
    console.log("result: ", result.data)

    return result.data; // ✅ This will be passed to the onSuccess callback of React Query
  } catch (error: unknown) {
    // Re-throw the error so React Query can catch it and call onError
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An Axios error occurred");
    }

    if (error instanceof Error) {
      console.log("Error message:", error.message);
      // Re-throws the original error (e.g., from `throw new Error(result.data.message || "Signin failed.");` in the try block) to React Query's `onError`.
      // Preserves the error message and stack trace for debugging.
      throw error;
    }

    throw new Error("An unexpected error occurred.");
  }
};

export const handleSignOut = async (): Promise<Auth | void> => {
  try {
    const result = await axios.post('http://localhost:4000/api/auth/logout');

    if (!result.data.success) {
      throw new Error(result.data.message || "Sign-up failed.")
    }

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An Axios error occurred")
    }

    if (error instanceof Error) {
      throw (error)
    }
    console.log("An unexpected error occurred.")
  }
}

