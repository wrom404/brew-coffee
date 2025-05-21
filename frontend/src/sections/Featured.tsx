import FeaturedCoffeeCard from "@/components/ui-components/FeaturedCoffeeCard";
import { coffeeProducts } from "@/constants/products";

const Featured = () => {
  return (
    <section
      id="feature"
      className="bg-amber-50 px-6 md:px-20 flex flex-col items-center justify-center gap-6 min-h-screen"
    >
      <h3 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 font-medium text-center">
        Our best seller coffee
      </h3>
      <p className="text-sm sm:text-base md:text-lg text-amber-900 text-center mx-auto max-w-3xl">
        Explore our handpicked selection of the finest coffee beans from around
        the world, expertly roasted to bring out their unique flavors and
        aromas.
      </p>

      <div className="mt-12 flex md:flex-row flex-col justify-center items-center gap-6">
        {coffeeProducts?.map((coffee) => (
          <FeaturedCoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </section>
  );
};

export default Featured;
