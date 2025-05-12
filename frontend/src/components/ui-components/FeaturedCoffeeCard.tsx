import { useState } from "react";
import { Coffee } from "@/types/types";

// Define TypeScript interfaces

const FeaturedCoffeeCard = ({ coffee }: { coffee: Coffee }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-80 bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {coffee.badge && (
        <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-semibold py-1 px-3 rounded-full z-10">
          {coffee.badge}
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={coffee.imageUrl}
          alt={coffee.title}
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
            isHovered ? "scale-110 brightness-65" : ""
          }`}
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-500 ${
            isHovered ? "opacity-20" : "opacity-0"
          }`}
        />

        {/* Product Info */}
        <div
          className={`absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent transition-transform duration-500 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <p
            className={`text-amber-300 uppercase text-xs tracking-wider mb-1 transition-all duration-500 delay-100 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            {coffee.category}
          </p>
          <h3
            className={`text-white text-lg font-bold mb-2 transition-all duration-500 delay-200 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            {coffee.title}
          </h3>
          <p
            className={`text-gray-200 text-sm mb-3 line-clamp-2 transition-all duration-500 delay-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            {coffee.description}
          </p>
          <p
            className={`text-amber-300 font-bold text-lg transition-all duration-500 delay-400 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            ${coffee.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCoffeeCard;
