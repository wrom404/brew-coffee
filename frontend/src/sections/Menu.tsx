import CardModal from "@/components/ui-components/CardModal";
import ProductCard from "@/components/ui-components/ProductCard";
import { coffeeProductsMenu } from "@/constants/products";
import { CoffeeProduct } from "@/types/types";
import { useState } from "react";

const Menu = () => {
  const [cart, setCart] = useState<CoffeeProduct[]>([]);
  const [favorites, setFavorites] = useState<CoffeeProduct[]>([]);

  const handleAddToCart = () => {};

  const handleAddToFavorites = () => {};
  return (
    <div
      className="min-h-screen flex justify-center items-center flex-col py-6 bg-[#E9DCC5]"
      id="menu"
    >
      <div className="text-gray-800 text-4xl font-medium mt-12 mb-6">
        {" "}
        Our Menu
      </div>
      <p className="text-amber-900 text-lg leading-7 tracking-wide w-[42rem] text-center mb-18">
        Indulge in a curated collection of specialty coffees, each selected for
        its unique flavor profile and exceptional quality.
      </p>
      <div className="grid grid-cols-4 gap-8">
        {coffeeProductsMenu.map((coffee) => (
          <ProductCard
            key={coffee.id}
            coffee={coffee}
            onAddToCart={handleAddToCart}
            onAddToFavorites={handleAddToFavorites}
            isFavorite={favorites.some((f) => f.id === coffee.id)}
          />
        ))}
      </div>
      <button className=" px-4 py-2 rounded-lg bg-(--fifth-color) text-gray-200 tracking-wide mt-8">
        Load more
      </button>
    </div>
  );
};

export default Menu;
