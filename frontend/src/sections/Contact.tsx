import GoogleMapComponent from "@/utils/GoogleMapComponent";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div id="contact" className="min-h-[32rem] text-gray-200 flex justify-between items-center gap-16 my-6 mt-26 py-12">
      <div className="flex-1 flex justify-end items-center">
        <div className="mt-8 w-xl">
          <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
          {/* GoMaps Embed API */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x2: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
            className=""
          >
            <GoogleMapComponent />
          </motion.div>
        </div>
      </div>
      <div className="flex-1 w-56">
        <div className="">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            viewport={{ amount: 0.4, once: true }}
            className="text-gray-200 font-semibold text-2xl tracking-wide"
          >
            Get in touch
          </motion.h3>
        </div>
        <div className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.1 }}
            viewport={{ amount: 0.4, once: true }}
            className="w-[28rem]"
          >
            <label htmlFor="" className="text-gray-200  my-2 block">
              Username
            </label>
            <input
              type="text"
              className="border border-(--secondary-color) py-2 px-4 rounded-xl w-full outline-none focus:outline-(--fifth-color) focus:ring focus:ring-(--fifth-color)"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.2 }}
            viewport={{ amount: 0.4, once: true }}
            className="w-[28rem] mt-4"
          >
            <label htmlFor="" className="text-gray-200  my-2 block">
              Email
            </label>
            <input
              type="text"
              className="border border-(--secondary-color) py-2 px-4 rounded-xl w-full outline-none focus:outline-(--fifth-color) focus:ring focus:ring-(--fifth-color)"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.2 }}
            viewport={{ amount: 0.4, once: true }}
            className="w-[28rem] mt-4"
          >
            <label htmlFor="" className="text-gray-200  my-2 block">
              Message
            </label>
            <textarea
              className="border border-(--secondary-color) outline-none focus:outline-(--fifth-color) focus:ring focus:ring-(--fifth-color) p-3 rounded-xl "
              name="w3review"
              rows={5}
              cols={50}
            ></textarea>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.3 }}
            viewport={{ amount: 0.4, once: true }}
            className="w-[28rem] flex justify-end may-4"
          >
            <button className="py-2 px-4 bg-(--fifth-color) rounded-xl text-lg cursor-pointer hover:bg-[#a34b08]">
              Submit
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;