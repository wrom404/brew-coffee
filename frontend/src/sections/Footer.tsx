import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="text-white py-12 px-6 md:px-16 lg:px-20 bg-black">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between max-w-7xl mx-auto w-full">
        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">SOCIAL MEDIA</h3>
          <nav className="flex flex-col gap-3 text-sm">
            <a
              href="#"
              className="hover:text-gray-400 flex items-center gap-2.5"
            >
              <FaFacebookF /> Facebook
            </a>
            <a
              href="#"
              className="hover:text-gray-400 flex items-center gap-2.5"
            >
              <FaXTwitter /> Twitter
            </a>
            <a
              href="#"
              className="hover:text-gray-400 flex items-center gap-2.5"
            >
              <FaTiktok /> TikTok
            </a>
          </nav>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">SERVICES</h3>
          <div className="flex flex-col gap-3 text-sm font-light">
            <p>Shop</p>
            <p>Order</p>
            <p>Delivery</p>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4">ADDRESS</h3>
          <div className="flex flex-col gap-3 text-sm font-light">
            <p>Brgy. South, Ormoc City Leyte</p>
            <p>0999-99-00-000</p>
            <p>brew.kofe@email.com</p>
          </div>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-4">OPENING HOURS</h3>
          <div className="flex flex-col gap-3 text-sm font-light">
            <p>Mon-Fri: 8am-5pm</p>
            <p>Sat: 9am-4pm</p>
            <p>Sun: 10am-4pm</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center">
        <p className="text-sm">© 2025 brew.kofe' All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
