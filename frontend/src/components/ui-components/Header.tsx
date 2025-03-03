import { CiUser, CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdOutlineLightMode } from "react-icons/md";
import { useState, useRef } from "react";
// import { useLocation } from "react-router";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

type ElementType = HTMLInputElement;

const Header = () => {
  const [isSearchIconShow, setIsSearchIconShow] = useState<boolean>(true);
  const refSearch = useRef<ElementType>(null);

  return (
    <div className="py-3 px-6 flex justify-between items-center text-gray-100 border-b border-(--secondary-color) fixed w-full backdrop-blur-xs">
      <div className="text-lg"><h2 className="title-header">kofe-latte'</h2></div>
      <div className="flex gap-20">
        <div className="">
          <ul className="flex items-center gap-6 text-gray-100 text-lg cursor-pointer">
            <li className="hover:text-(--quaternary-color)"><a href="#home">Home</a></li>
            <li>
            <li className="hover:text-(--quaternary-color)"><a href="#feature">Feature</a></li>
              {/* <DropdownMenu>
                <DropdownMenuTrigger className="outline-none cursor-pointer hover:text-(--quaternary-color)">
                  Category
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-10 bg-white border-gray-300">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-gray-100 hover:text-(--tertiary-color)">
                    Espresso
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-100 hover:text-(--tertiary-color)">
                    Americano
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-100 hover:text-(--tertiary-color)">
                    Cappuccino
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-100 hover:text-(--tertiary-color)">
                    Caffè macchiato
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-100 hover:text-(--tertiary-color)">
                    Nescafe Classic
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </li>
            <li className="hover:text-(--quaternary-color)"><a href="#about">About Us</a></li>
            <li className="hover:text-(--quaternary-color)"><a href="#menu">Menu</a></li>
            <li className="hover:text-(--quaternary-color)"><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="flex gap-8">
          <div className="relative">
            {isSearchIconShow && (
              <div className="absolute top-1 left-3">
                <CiSearch className="inline text-gray-50" size={20} />
              </div>
            )}
            <input
              ref={refSearch}
              onFocus={() => setIsSearchIconShow(false)}
              onBlur={() => setIsSearchIconShow(true)}
              type="text"
              className="border border-[#4E342E] rounded-lg outline-none focus:outline-[#4E342E] focus:ring focus:ring-[#4E342E] w-80 p-1.5 px-4 z-10"
            />
          </div>
          <div className="flex items-center gap-3">
            <CiShoppingCart
              size={28}
              className="text-gray-300 cursor-pointer hover:text-(--quaternary-color)"
            />
            <CiUser
              size={28}
              className="text-gray-300 cursor-pointer hover:text-(--quaternary-color)"
            />
            <MdOutlineLightMode
              size={28}
              className="text-gray-300 cursor-pointer hover:text-(--quaternary-color)"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;