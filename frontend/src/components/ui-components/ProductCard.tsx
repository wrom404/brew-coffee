import { CoffeeProduct } from "@/types/types";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

const ProductCard: React.FC<{
  coffee: CoffeeProduct;
  onAddToCart: (coffee: CoffeeProduct) => void;
  onAddToFavorites: (coffee: CoffeeProduct) => void;
  isFavorite?: boolean;
}> = ({ coffee, onAddToCart, onAddToFavorites, isFavorite = false }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  // Function to handle favorite toggle
  const handleFavoriteToggle = () => {
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    onAddToFavorites(coffee);
  };

  return (
    <div className="bg-amber-50 shadow-md rounded-lg overflow-hidden w-full max-w-xs mx-auto transform transition-all duration-300 hover:shadow-lg">
      {/* Coffee Image */}
      <div className="relative h-48 w-full">
        <img
          src={coffee.imageUrl}
          alt={coffee.name}
          className="w-full h-full object-cover"
        />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-300 cursor-pointer ${
            favorite
              ? "bg-amber-600 text-white"
              : "bg-white/70 text-amber-800 hover:bg-red-100"
          }`}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              favorite ? "fill-current" : "hover:fill-amber-600"
            }`}
          />
        </button>
      </div>

      {/* Coffee Details */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs uppercase tracking-wider text-amber-600 font-semibold">
          {coffee.category}
        </span>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-800 mt-1 truncate">
          {coffee.name}
        </h3>

        {/* Description (Truncated) */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {coffee.description}
        </p>

        {/* Price and Cart Button */}
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xl font-bold text-amber-700">
            ${coffee.price.toFixed(2)}
          </span>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(coffee)}
            className="flex items-center gap-1 bg-amber-600 text-white px-3 py-1.5 rounded-full hover:bg-amber-700 transition-colors text-sm cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
