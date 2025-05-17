import React, { useEffect, useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router"; // if you're using React Router
import { Coffee, Search, Sun, ShoppingBag } from "lucide-react";
import SignInModal from "../auth/SignInModal";
import SignUpModal from "../auth/SignUpModal";

import { DropdownMenuCheckboxes } from "@/components/ui-components/DropdownMenu"

export default function Header() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconClass = `cursor-pointer transition ${isScrolled
    ? "text-[#4E342E] hover:text-amber-700"
    : "text-gray-50 hover:text-[var(--quaternary-color)]"
    }`;

  return (
    // px-4 md:px-6 lg:px-8
    <div className={`fixed w-full z-50`}>
      <header
        className={`h-20 w-full shrink-0 items-center px-4 md:px-18 flex justify-between gap-12  ${isScrolled
          ? "bg-white bg-opacity-95 shadow-sm text-[#4E342E]"
          : "bg-transparent py-0"
          }`}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div
              className={`text-lg font-medium hover:opacity-80 transition cursor-pointer flex gap-2 ${isScrolled ? "text-amber-900" : "text-gray-50"
                }`}
            >
              <Coffee className="" /> brew.kofe'
            </div>
            <div className="grid gap-2">
              {["Home", "Feature", "About Us", "Menu", "Contact"].map(
                (label) => (
                  <li key={label}>
                    <a
                      href={`#${label.toLowerCase().replace(" ", "")}`}
                      className={`relative after:absolute after:w-full after:h-0.5 after:bg-[var(--quaternary-color)] after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${isScrolled ? "text-amber-900" : "text-gray-50"
                        }`}
                    >
                      {label}
                    </a>
                  </li>
                )
              )}
            </div>
          </SheetContent>
        </Sheet>

        <Link to="#" className="mr-6 hidden lg:flex items-center gap-2">
          <div
            className={`text-lg font-medium hover:opacity-80 transition cursor-pointer flex gap-2 ${isScrolled ? "text-amber-900" : "text-gray-50"
              }`}
          >
            <Coffee className="" /> brew.kofe'
          </div>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="space-x-3">
            {["Home", "Feature", "About Us", "Menu", "Contact"].map((label) => (
              <li key={label}>
                <a
                  href={`#${label.toLowerCase().replace(" ", "")}`}
                  className={`relative after:absolute after:w-full after:h-0.5 after:bg-[var(--quaternary-color)] after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left ${isScrolled ? "text-amber-900" : "text-gray-50"
                    }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-4">
          {/* Search Icon */}
          <Search
            className={`${isScrolled
              ? "text-[#4E342E] hover:text-amber-700"
              : "text-gray-50  hover:text-[var(--quaternary-color)]"
              } cursor-pointer transition`}
            size={22}
          />

          {/* Cart Icon */}
          <ShoppingBag size={22} className={iconClass} />

          {/* User Profile Icon */}
          <DropdownMenuCheckboxes isScrolled={isScrolled} />
          {/* Toggle Light/Dark Mode */}
          <Sun size={22} className={iconClass} />

          {/* Sign in Button */}
          <button
            className={`border whitespace-nowrap ${isScrolled
              ? "text-[#4E342E] border-[#4E342E] hover:text-amber-700 hover:border-amber-700 cursor-pointer"
              : "text-gray-50 border-gray-300 hover:text-[var(--quaternary-color)] hover:border-[var(--quaternary-color)]"
              } bg-transparent rounded-md py-1 px-3 cursor-pointer`}
            onClick={() => setIsSignInModalOpen(true)}
          >
            Sign in
          </button>
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

// Menu Icon SVG Component
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
