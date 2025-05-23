import { useGetAllCartItems } from "@/hooks/customer/useGetAllCartItems";
import { useParams } from "react-router";

const CartPage = () => {
  const { userId } = useParams();
  const { data: cartItems, isPending: isFetchingItems, isError: errorFetchingItems } = useGetAllCartItems(Number(userId))

  if (isFetchingItems) {
    return <div className="h-screen flex items-center">
      <h3 className="text-3xl">Loading...</h3>
    </div>
  }

  if (errorFetchingItems) {
    console.log("error: ", errorFetchingItems)
  }

  console.log("cartItems: ", cartItems)
  return <div className="bg-amber-50 h-screen">CartPage</div>;
};

export default CartPage;
