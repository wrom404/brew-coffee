import { useEffect, useState } from "react";
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
// } from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router"; // if you're using React Router
import { Coffee, Search, Sun, ShoppingBag, Heart, Settings, ClipboardList } from "lucide-react";
import SignInModal from "../auth/SignInModal";
import SignUpModal from "../auth/SignUpModal";

import { DropdownMenuCheckboxes } from "@/components/ui-components/DropdownMenu"
import useUser from "@/store/useUser";

export default function Header() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { currentUserId } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconClass = `cursor-pointer transition ${isScrolled || window.location.pathname.startsWith('/cart/') || window.location.pathname.startsWith('/order/')
    ? "text-[#4E342E] hover:text-amber-700"
    : "text-gray-50 hover:text-[var(--quaternary-color)]"
    }`;

  return (
    // px-4 md:px-6 lg:px-8
    <div className={`fixed w-full z-50`}>
      <header
        className={`h-20 w-full shrink-0 items-center px-4 md:px-24 lg:px-32 flex justify-between gap-12 ${isScrolled || window.location.pathname.startsWith('/cart/') || window.location.pathname.startsWith('/order/')
          ? "bg-white bg-opacity-95 shadow-sm !text-[#4E342E]" // Added !important flag
          : "bg-transparent py-0"
          }`}
      >
        <a href="/" className="mr-6 hidden lg:flex items-center gap-2">
          <div
            onClick={() => navigate("/")}
            className={`text-lg font-medium hover:opacity-80 transition cursor-pointer flex gap-2 ${isScrolled || window.location.pathname.startsWith('/cart/') || window.location.pathname.startsWith('/order/') ? "text-amber-900" : "text-gray-50"
              }`}
          >
            <Coffee className="" /> brew.kofe'
          </div>
        </a>
        <div className="ml-auto flex items-center gap-6">
          {/* Search Icon */}
          <Search
            className={`${isScrolled || window.location.pathname.startsWith('/cart/') || window.location.pathname.startsWith('/order/')
              ? "text-[#4E342E] hover:text-amber-700"
              : "text-gray-50  hover:text-[var(--quaternary-color)]"
              } cursor-pointer transition`}
            size={22}
          />

          {/* Cart Icon */}
          <ShoppingBag onClick={() => navigate(`/cart/${currentUserId}`)} size={22} className={iconClass} />

          <ClipboardList onClick={() => navigate(`/order/${currentUserId}`)} size={22} className={iconClass} />

          <Heart size={22} className={iconClass} />

          {/* User Profile Icon */}
          <DropdownMenuCheckboxes isScrolled={isScrolled} />
          {/* Toggle Light/Dark Mode */}
          <Sun size={22} className={iconClass} />

          <Settings size={22} className={iconClass} />

          {/* Sign in Button */}
          {
            currentUserId === 0 && <button
              className={`border whitespace-nowrap ${isScrolled || window.location.pathname.startsWith('/cart/') || window.location.pathname.startsWith('/order/')
                ? "text-[#4E342E] border-[#4E342E] hover:text-amber-700 hover:border-amber-700 cursor-pointer"
                : "text-gray-50 border-gray-300 hover:text-[var(--quaternary-color)] hover:border-[var(--quaternary-color)]"
                } bg-transparent rounded-md py-1 px-3 cursor-pointer`}
              onClick={() => setIsSignInModalOpen(true)}
            >
              Sign in
            </button>
          }
        </div>

      </header>
      {isSignInModalOpen && (
        <SignInModal
          setIsSignInModalOpen={setIsSignInModalOpen}
          isSignInModalOpen={isSignInModalOpen}
          setIsSignUpModalOpen={setIsSignUpModalOpen}
        // isSignUpModalOpen={isSignInModalOpen}
        />
      )}
      {isSignUpModalOpen && (
        <SignUpModal
          setIsSignInModalOpen={setIsSignInModalOpen}
          isSignUpModalOpen={isSignUpModalOpen}
          setIsSignUpModalOpen={setIsSignUpModalOpen}
        />
      )}
    </div>
  );
}