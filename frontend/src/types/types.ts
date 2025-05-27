export type ProductCardType = {
  product: {
    id: number,
    name: string,
    price: string,
    image: string
  },
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  isModalOpen?: boolean,
  setImageName?: React.Dispatch<React.SetStateAction<string>>,
}

export type mockFeaturedProductType = {
  id: number,
  name: string,
  price: string,
  image: string
}

export type ModalType = {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // use for updating state variable
}

// Define TypeScript type for coordinates
export type CoordinatesType = {
  lat: number;
  lng: number;
};

export interface Coffee {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  badge?: string;
}

// TypeScript interface for Coffee Product
export interface CoffeeProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface Products {
  id: number;
  name: string;
  description: string;
  price: string; // or number, depending on how you handle currency
  imageUrl: string;
  category: string;
  stockQuantity: number;
  isAvailable: boolean;
  createdAt: string; // or Date, if you parse it
  updatedAt: string; // or Date, if you parse it
}

export interface CartItem {
  success?: boolean;
  cartProduct: [{
    id: number;
    amount: string;
    productId: number;
    productImage: string;
    productName: string;
    productPrice: string;
    quantity: number;
    size: string;
    userId: number;
  }]
}

export interface cartProduct {
  id: number;
  amount: string;
  productId: number;
  productImage: string;
  productName: string;
  productPrice: string;
  quantity: number;
  size: string;
  userId: number;
  selected?: boolean;
}


export interface OrderItem {
  orderId: number;
  productId: number;
  quantity: number;
  price: string;
  size: string;
  productName: string;
  productImage: string;
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: string;
  status: "Pending" | "Processing" | "Completed" | "Cancelled"; // adjust as needed
  paymentMethod: string;
  payment: string | null;
  message: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
}
