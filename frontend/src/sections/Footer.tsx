import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="text-white py-16 pb-6 text-center px-36">
      <div className="flex flex-col md:flex-row justify-between items-start min-w-4xl mx-auto">
        <div className="">
          <h3 className="text-lg py-2.5">SOCIAL MEDIA</h3>
          <nav className="mb-4 md:mb-0 flex flex-col gap-4 text-sm">
            <a
              href="#"
              className="mx-2 hover:text-gray-400 flex items-center gap-2.5"
            >
              <FaFacebookF /> facebook
            </a>
            <a
              href="#"
              className="mx-2 hover:text-gray-400 flex items-center gap-2.5"
            >
              <FaXTwitter /> twitter
            </a>
            <a
              href="#"
              className="mx-2 hover:text-gray-400 flex items-center gap-2.5"
            >
              <FaTiktok /> tiktok
            </a>
          </nav>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg py-2.5">SERVICES</h3>
          <div className="text-left flex flex-col gap-4 text-sm font-light pl-2.5">
            <p className="">Shop</p>
            <p className="">Order</p>
            <p className="">Delivery</p>
          </div>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg py-2.5 text-center">ADDRESS</h3>
          <div className="text-left flex flex-col gap-4 text-sm font-light">
            <p className="">Brgy. South, Ormoc City Leyte</p>
            <p className="">0999-99-00-000</p>
            <p className="">kofe-latte@email.com</p>
          </div>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg py-2.5 text-center">OPENING HOURS</h3>
          <div className="text-left flex flex-col gap-4 text-sm font-light">
            <p className="">Mon-Fri: 8am-5pm</p>
            <p className="">Sat: 9am-4pm</p>
            <p className="">Sun: 10am-4pm</p>
          </div>
        </div>
      </div>
      <div className="border-t border-(--secondary-color) my-8">
        <p className="text-sm my-8">© 2025 kofe-latte. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
