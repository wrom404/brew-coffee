import pngCoffee from "../assets/imgs/png-coffee1.png";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div
      id="home"
      className="min-h-screen flex flex-col-reverse md:flex-row justify-center items-center px-6 md:px-24 lg:px-32 py-10 gap-10"
    >
      <div className="flex-1 flex flex-col items-center md:items-start justify-center text-center md:text-left">
        <div className="text-gray-100 space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl leading-snug font-medium"
          >
            We serve the richest coffee in the city of Ormoc.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl leading-relaxed tracking-wide"
          >
            Discover a whole new level of flavor and enjoyable.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl py-3 px-6 bg-amber-700 hover:bg-[#a34b08] flex items-center gap-2 rounded-full cursor-pointer font-light"
          >
            <ShoppingCart size={20} /> Order now
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex-1 flex justify-center items-center"
      >
        <div className="w-64 sm:w-80 md:w-[30rem]">
          <img src={pngCoffee} alt="Coffee" className="w-full h-auto" />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
