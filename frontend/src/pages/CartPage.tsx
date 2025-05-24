import CartItem from "@/components/ui-components/cartItem";
import CartSummary from "@/components/ui-components/CartSummary";
import { useGetAllCartItems } from "@/hooks/customer/useGetAllCartItems";
import { cartProduct } from "@/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";

const CartPage = () => {
  const [selectedItems, setSelectedItems] = useState<cartProduct[]>([])
  const { userId } = useParams();
  const { data: cartFetchedItems, isPending: isFetchingItems, isError: errorFetchingItems } = useGetAllCartItems(Number(userId))

  useEffect(() => {
    if (cartFetchedItems && cartFetchedItems?.cartProduct.length > 0) {
      setSelectedItems(cartFetchedItems?.cartProduct)
    }
  }, [cartFetchedItems])

  const toggleSelect = (product: cartProduct) => {
    if (selectedItems.length === cartFetchedItems?.cartProduct.length) {
      toast.error("Uncheck 'Select All Items' first.");
      return;
    } else {
      setSelectedItems(prevItems =>
        prevItems.some(item => item.id === product.id)
          ? prevItems.filter(item => item.id !== product.id)
          : [...prevItems, product]
      );
    }
  };

  if (isFetchingItems) {
    return <div className="h-screen flex items-center">
      <h3 className="text-3xl">Loading...</h3>
    </div>
  }

  if (errorFetchingItems) {
    console.log("error: ", errorFetchingItems)
  }

  console.log(selectedItems)

  return (
    <div className="relative flex justify-center items-center bg-white min-h-screen px-32">
      <div className="mt-22 lg:flex lg:gap-12">
        <div className="lg:w-2/3">
          <div className="flex items-center mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={
                  cartFetchedItems?.cartProduct &&
                  selectedItems.length === cartFetchedItems.cartProduct.length
                }
                onChange={() => {
                  if (selectedItems.length > 0) {
                    setSelectedItems([]);
                  } else if (cartFetchedItems?.cartProduct) {
                    setSelectedItems(cartFetchedItems.cartProduct);
                  }
                }}
                className="w-4 h-4 border-gray-300 rounded focus:ring-black"
              />

              <span className="text-sm uppercase">Select All Items</span>
            </label>
          </div>

          {cartFetchedItems?.cartProduct.map((item: cartProduct) => (
            <CartItem
              key={item.id}
              item={item}
              toggleSelect={toggleSelect}
              isSelected={selectedItems.some(selected => selected.id === item.id)}
            />
          ))}
        </div>

        <div className="mt-8 lg:mt-0 lg:w-1/3">
          <CartSummary
            cartItems={selectedItems.length > 0 ? selectedItems : []}
            showSelectionHint={selectedItems.length > 0}
          />
        </div>
      </div>
    </div>
  )
};

export default CartPage;
