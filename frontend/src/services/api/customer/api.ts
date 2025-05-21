import { Products } from "@/types/types";
import axios from "axios"

export const getAllProducts = async (): Promise<Products[] | void> => {
  try {
    const result = await axios.get('http://localhost:4000/api/customer/product');

    if (!result.data.success) {
      throw new Error(result.data.message)
    }
    return result.data.products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message)
    }

    if (error instanceof Error) {
      throw (error)
    }

    console.log("An unexpected error occurred.")
  }
}