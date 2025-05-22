import axios from "axios"

interface User {
  success: boolean;
  currentUser: {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }
}

export const getCurrentUser = async (): Promise<User | void> => {
  try {
    const result = await axios.get(`http://localhost:4000/api/user/`);
    if (!result.data.success) {
      throw new Error(result?.data?.message)
    }
    console.log("result: ", result.data)
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message)
    }

    if (error instanceof Error) {
      throw error
    }

    console.log("An unexpected error occurred.")
  }
}