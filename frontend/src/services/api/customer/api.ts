import { CartItem, OrdersResponse, Products } from "@/types/types";
import axios from "axios"

interface AddToCartResponse {
  success?: boolean;
  message?: string;
  data?: {
    success: boolean;
    product: {
      id: number;
      productId: number;
      userId: number;
      quantity: number;
      size: string;
      amount: number | string;
    }
  };
}

interface AddToCartParams {
  productId: number;
  quantity: number;
  size: string;
  price: number;
}


// Products
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

    throw new Error("An unexpected error occurred.");
  }
}

export const getProductById = async (id: number) => {
  try {
    const result = await axios.get(`http://localhost:4000/api/customer/product/${id}`);

    if (!result.data.success) {
      throw new Error(result.data.message);
    }

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message)
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred.");
  }
}


// Cart
export const addToCart = async (
  currentUserId: number,
  productId: number,
  quantity: number,
  selectedSize: string,
  finalPrice: number
): Promise<AddToCartResponse> => {
  try {
    const { data } = await axios.post<AddToCartResponse>(
      `http://localhost:4000/api/customer/cart/${currentUserId}/add`,
      {
        productId,
        quantity,
        size: selectedSize,
        price: finalPrice
      } as AddToCartParams
    );
    console.log("data: ", data)

    if (!data.success) {
      throw new Error(data.message || 'Failed to add to cart');
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(`Cart error: ${errorMessage}`);
    }

    if (error instanceof Error) {
      throw new Error(`Unexpected error: ${error.message}`);
    }

    throw new Error('An unknown error occurred while adding to cart');
  }
};

export const getAllCartItems = async (userId: number): Promise<CartItem | void> => {
  if (!userId) {
    throw new Error("Required fields must filled out.")
  }

  try {
    const result = await axios.get(`http://localhost:4000/api/customer/cart/${userId}`);

    if (!result.data.success) {
      throw new Error(result.data.message);
    }

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message)
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred.");
  }
}


// orders
export const placeOrderProduct = async (userId: number, cartProductId: number[], paymentMethod: string, message: string) => {
  if (!userId || !cartProductId || !paymentMethod) {
    throw new Error("Required fields must filled out.")
  }

  try {

    console.log("Sending to the API...");
    console.log("data: ", userId, cartProductId, paymentMethod, message)
    const result = await axios.post(`http://localhost:4000/api/customer/order/${userId}`, {
      selectedCartProductIds: cartProductId,
      paymentMethod,
      message: message || undefined,
    });

    if (!result.data.success) {
      throw new Error(result.data?.message || 'Order placement failed.');
    }

    console.log(result.data)

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message)
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred.");
  }
}

export const getActiveOrder = async (userId: number): Promise<OrdersResponse | void> => {
  if (!userId) {
    throw new Error("Required fields must filled out.")
  }

  try {
    const result = await axios.get(`http://localhost:4000/api/customer/order/${userId}`);
    console.log(result)

    if (!result.data.success) {
      throw new Error(result.data.message);
    }

    console.log(result.data)

    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message)
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred.");
  }
}