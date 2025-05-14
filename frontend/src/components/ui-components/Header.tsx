import { CiUser, CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdOutlineLightMode } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { Coffee } from "lucide-react";
import AuthModal from "./AuthModal";

type ElementType = HTMLInputElement;

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSearchIconShow, setIsSearchIconShow] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const refSearch = useRef<ElementType>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconClass = `cursor-pointer transition hover:text-[var(--quaternary-color)] ${
    isScrolled ? "text-[#4E342E]" : "text-gray-300"
  }`;

  return (
    <header
      className={`fixed w-full z-50 flex justify-between items-center transition-all duration-300 backdrop-blur-md px-16 ${
        isScrolled
          ? "bg-white bg-opacity-95 shadow-sm text-[#4E342E] py-4"
          : "bg-transparent py-6"
      }`}
    >
      {/* Logo */}
      <div className="flex  justify-between w-full mr-8">
        <div
          className={`text-lg font-medium hover:opacity-80 transition cursor-pointer flex gap-2 ${
            isScrolled ? "text-amber-900" : "text-gray-50"
          }`}
        >
          <Coffee className="" /> brew.kofe'
        </div>

        {/* Navigation and Icons */}
        {/* Navigation Links */}
        <ul
          className={`hidden md:flex items-center gap-6 text-lg transition-colors ${
            isScrolled ? "text-[#4E342E]" : "text-gray-100"
          }`}
        >
          {["Home", "Feature", "About Us", "Menu", "Contact"].map((label) => (
            <li key={label}>
              <a
                href={`#${label.toLowerCase().replace(" ", "")}`}
                className="relative after:absolute after:w-full after:h-0.5 after:bg-[var(--quaternary-color)] after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-12 items-center">
        {/* Search & Icons */}
        <div className="flex items-center gap-4">
          <div className="relative min-w-64 h-[35px]">
            {!isSearchIconShow ? (
              <input
                ref={refSearch}
                onFocus={() => setIsSearchIconShow(false)}
                onBlur={() => setIsSearchIconShow(true)}
                type="text"
                placeholder="Search..."
                className={`transition-all duration-300 border absolute top-0 right-0 ${
                  isScrolled
                    ? "border-[#4E342E] focus:ring-[#4E342E]"
                    : " border-gray-400 text-gray-200"
                } rounded-lg outline-none focus:ring w-64 py-1 px-4`}
              />
            ) : (
              <CiSearch
                className={`${
                  isScrolled ? "text-[#4E342E]" : "text-gray-50"
                } cursor-pointer hover:text-[var(--quaternary-color)] transition absolute right-0 top-1/2 -translate-y-1/2`}
                size={28}
                onClick={() => setIsSearchIconShow(false)}
              />
            )}
          </div>
          <CiShoppingCart size={28} className={iconClass} />
          <CiUser size={28} className={iconClass} />
          <MdOutlineLightMode size={28} className={iconClass} />
          <button
            className={`border whitespace-nowrap ${
              isScrolled
                ? "text-[#4E342E] border-[#4E342E] hover:text-[var(--quaternary-color)] hover:border-[var(--quaternary-color)] cursor-pointer"
                : "text-gray-300 border-gray-300"
            } bg-transparent rounded-2xl py-1 px-3`}
            onClick={() => setIsAuthModalOpen(true)}
          >
            Sign in
          </button>
        </div>
      </div>
      {isAuthModalOpen && (
        <AuthModal
          setIsAuthModalOpen={setIsAuthModalOpen}
          isAuthModalOpen={isAuthModalOpen}
        />
      )}
    </header>
  );
};

export default Header;
