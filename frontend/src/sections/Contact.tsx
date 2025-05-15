import GoogleMapComponent from "@/utils/GoogleMapComponent";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div 
      id="contact" 
      className="min-h-[32rem] text-gray-200 flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-16 my-6 mt-26 py-8 md:py-12 px-4 md:px-8 lg:px-16"
    >
      {/* Map Section */}
      <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end items-center order-2 lg:order-1">
        <div className="mt-4 lg:mt-8 w-full max-w-xl">
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-center lg:text-left">Visit Us</h3>
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem]"
          >
            <GoogleMapComponent />
          </motion.div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 w-full lg:w-auto order-1 lg:order-2">
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ amount: 0.4, once: true }}
            className="text-gray-200 font-semibold text-xl md:text-2xl tracking-wide text-center lg:text-left"
          >
            Get in touch
          </motion.h3>
        
          <div className="mt-4 md:mt-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ amount: 0.4, once: true }}
              className="w-full"
            >
              <label htmlFor="username" className="text-gray-200 my-2 block">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="border border-[--secondary-color] py-2 px-4 rounded-xl w-full outline-none focus:outline-[--fifth-color] focus:ring focus:ring-[--fifth-color]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.2 }}
              viewport={{ amount: 0.4, once: true }}
              className="w-full mt-4"
            >
              <label htmlFor="email" className="text-gray-200 my-2 block">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border border-[--secondary-color] py-2 px-4 rounded-xl w-full outline-none focus:outline-[--fifth-color] focus:ring focus:ring-[--fifth-color]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.2 }}
              viewport={{ amount: 0.4, once: true }}
              className="w-full mt-4"
            >
              <label htmlFor="message" className="text-gray-200 my-2 block">
                Message
              </label>
              <textarea
                id="message"
                className="border border-[--secondary-color] outline-none focus:outline-[--fifth-color] focus:ring focus:ring-[--fifth-color] p-3 rounded-xl w-full"
                rows={5}
              ></textarea>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.3 }}
              viewport={{ amount: 0.4, once: true }}
              className="w-full flex justify-end mt-4"
            >
              <button className="py-2 px-4 bg-[--fifth-color] rounded-xl text-base md:text-lg cursor-pointer hover:bg-[#a34b08] transition-colors">
                Submit
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;