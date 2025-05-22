import ProductCard from "@/components/ui-components/ProductCard";
import { useGetAllProducts } from "@/hooks/customer/useGetAllProducts";
import AddToCartModal from "@/components/ui-components/AddToCartModal";
import useUser from "@/store/useUser";
import { Products } from "@/types/types";
import { useEffect, useState } from "react";
import { useGetProductById } from "@/hooks/customer/useGetProductById";
import { useAddToCart } from "@/hooks/customer/useAddToCart";

const Menu = () => {
  const [coffeeProducts, setCoffeeProducts] = useState<Products[]>([])
  const [cartModal, setCartModal] = useState<boolean>(false);
  const [coffeeId, setCoffeeId] = useState<number | undefined>();
  const { data: products, isPending: isFetchingProducts, isError: errorFetchingProducts } = useGetAllProducts();
  const { data: product, isPending: isFetchingProduct, isError: errorFetchingProduct } = useGetProductById(coffeeId!, { enabled: !!coffeeId, });
  const { mutate: addToCart, isPending: isAddingToCart, isError: errorAddingToCart } = useAddToCart()
  const { currentUserId } = useUser();

  useEffect(() => {
    if (products) {
      setCoffeeProducts(products)
    }
  }, [products])

  const handleAddToFavorites = () => { };

  const handleAddToCartModal = (id: number) => {
    setCartModal(true);
    setCoffeeId(id)
  }

  const handleAddToCartProduct = (
    id: number,
    quantity: number,
    selectedSize: string,
    finalPrice: number
  ) => {
    addToCart({
      currentUserId,
      productId: id,
      quantity,
      selectedSize,
      finalPrice
    });
  }

  if (isFetchingProducts || isFetchingProduct || isAddingToCart) {
    <div className="h-screen flex justify-center items-center text-2xl">Loading...</div>
  }

  if (errorFetchingProducts || errorFetchingProduct || errorAddingToCart) {
    console.log("Something went wrong.")
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-8 md:px-16 bg-[#E9DCC5]"
      id="menu"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 font-medium text-center mb-4 md:mt-8">
        Our Menu
      </h2>
      <p className="text-base sm:text-lg text-amber-900 leading-7 tracking-wide text-center max-w-3xl mb-12">
        Indulge in a curated collection of specialty coffees, each selected for
        its unique flavor profile and exceptional quality.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl px-2">
        {coffeeProducts && coffeeProducts.length > 0 && coffeeProducts.map((coffee) => (
          <ProductCard
            key={coffee.id}
            coffee={coffee}
            onAddToFavorites={handleAddToFavorites}
            handleAddToCartButton={handleAddToCartModal}
          />
        ))}
      </div>

      <button className="cursor-pointer mt-10 px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-gray-200 tracking-wide text-sm sm:text-base">
        Load more
      </button>
      {cartModal && (
        <AddToCartModal
          setCartModal={setCartModal}
          product={product?.product ? product.product : []}
          handleAddToCartProduct={handleAddToCartProduct}
          isLoading={isFetchingProduct}
        />
      )}
    </section>
  );
};

export default Menu;
