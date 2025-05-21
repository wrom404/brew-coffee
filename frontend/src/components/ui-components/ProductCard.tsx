import { Products } from "@/types/types";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

const ProductCard: React.FC<{
  coffee: Products;
  onAddToCart: (coffee: Products) => void;
  onAddToFavorites: (coffee: Products) => void;
  isFavorite?: boolean;
}> = ({ coffee, onAddToCart, onAddToFavorites, isFavorite = false }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteToggle = () => {
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    onAddToFavorites(coffee);
  };

  // More robust image URL cleaner
  const getCleanImageUrl = (url: string) => {
    // Handle cases where URL might already be clean
    if (url.startsWith('product-')) return url;

    // Extract filename after last slash or 'products'
    const filename = url.split(/[\\/]/).pop() ||
      url.split('products').pop() ||
      url;

    // Remove any remaining 'products' prefix if present
    return filename.replace(/^products/, '');
  };

  const imageUrl = `http://localhost:4000/uploads/products/${getCleanImageUrl(coffee.imageUrl)}`;

  return (
    <div className="bg-amber-50 shadow-md rounded-lg overflow-hidden w-full max-w-xs mx-auto transform transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={coffee.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform ease-in-out"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = '/placeholder-coffee.jpg';
          }}
        />

        <button
          onClick={handleFavoriteToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-300 cursor-pointer ${favorite
            ? "bg-amber-600 text-white"
            : "bg-white/70 text-amber-600 hover:bg-red-100"
            }`}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${favorite ? "fill-current" : "hover:fill-amber-600"
              }`}
          />
        </button>
      </div>

      <div className="p-4">
        <span className="text-xs uppercase tracking-wider text-amber-600 font-semibold">
          {coffee.category}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mt-1 truncate">
          {coffee.name}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {coffee.description}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xl font-bold text-amber-700">
            ${parseFloat(coffee.price).toFixed(2)}
          </span>
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