import FeaturedCoffeeCard from "@/components/ui-components/FeaturedCoffeeCard";
import { coffeeProducts } from "@/constants/products";

const Featured = () => {
  return (
    <div
      id="feature"
      className="min-h-screen flex justify-center flex-col gap-6 bg-amber-50"
    >
      <h3 className="text-4xl text-gray-800 font-medium text-center">
        Our best seller coffee
      </h3>
      <p className="text-amber-900 text-center mx-auto max-w-3xl">
        Explore our handpicked selection of the finest coffee beans from around
        the world, expertly roasted to bring out their unique flavors and
        aromas.
      </p>
      <div className="flex justify-center items-center gap-6 mt-12">
        {coffeeProducts &&
          coffeeProducts.length > 0 &&
          coffeeProducts.map((coffee) => (
            <FeaturedCoffeeCard key={coffee.id} coffee={coffee} />
          ))}
      </div>
    </div>
  );
};

export default Featured;
