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
    <section
      className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-8 md:px-16 bg-[#E9DCC5]"
      id="menu"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 font-medium text-center mb-4">
        Our Menu
      </h2>
      <p className="text-base sm:text-lg text-amber-900 leading-7 tracking-wide text-center max-w-3xl mb-12">
        Indulge in a curated collection of specialty coffees, each selected for
        its unique flavor profile and exceptional quality.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl px-2">
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

      <button className="mt-10 px-6 py-3 rounded-lg bg-[--fifth-color] hover:bg-[#a34b08] text-gray-200 tracking-wide text-sm sm:text-base">
        Load more
      </button>
    </section>
  );
};

export default Menu;
