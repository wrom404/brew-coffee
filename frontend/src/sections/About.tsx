import coffee12 from "../assets/imgs/coffee12.avif";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <div
      id="about"
      className="min-h-screen bg-amber-50 w-full text-gray-200 flex flex-col lg:flex-row justify-center items-center p-4 md:p-8 lg:p-16 gap-8 lg:gap-32"
    >
      {/* Image Section */}
      <div className="flex-1 flex justify-center lg:justify-end w-full">
        <div className="rounded-tr-4xl rounded-bl-4xl overflow-hidden w-full max-w-[22rem]">
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ amount: 0.4, once: true }}
            className="rounded-tr-4xl rounded-bl-4xl hover:scale-105 transition-transform w-full h-auto"
            src={coffee12}
            alt="Coffee cup"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="min-h-[28rem] flex-1 flex flex-col items-center lg:items-start w-full max-w-2xl">
        <motion.h3
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          viewport={{ amount: 0.4, once: true }}
          className="text-3xl md:text-4xl font-medium my-4 text-gray-800 text-center lg:text-left"
        >
          About Us
        </motion.h3>
        
        <div className="w-full">
          <motion.p
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, delay: 0.1 }}
            viewport={{ amount: 0.4, once: true }}
            className="text-base md:text-lg tracking-wide leading-7 md:leading-8 text-amber-900 text-center lg:text-left"
          >
            At brew kofe', we believe that every cup of coffee tells a story.
            Our passion lies in crafting the perfect blend of rich flavors and
            warm experiences. From hand-picked beans to expertly brewed coffee,
            we bring you the finest, most aromatic blends that awaken the
            senses. Whether you're here for a morning boost or a cozy afternoon
            break, our café is a space to relax, connect, and savor every sip.
            Order now and get your coffee.
          </motion.p>
        </div>
        
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, delay: 0.2 }}
          viewport={{ amount: 0.4, once: true }}
          className="bg-[--fifth-color] py-3 px-5 rounded-2xl font-extralight my-4 hover:bg-[#a34b08] cursor-pointer text-gray-100"
        >
          Learn more
        </motion.button>
      </div>
    </div>
  );
};