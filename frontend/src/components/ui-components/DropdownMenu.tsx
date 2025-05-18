import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserRound, LogOut, Settings } from "lucide-react"
import { Link } from "react-router"


export function DropdownMenuCheckboxes({ isScrolled }: { isScrolled: boolean }) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`bg-transparent shadow-none border-none outline-none focus:outline-none focus:ring-0 active:outline-none active:ring-0 transition-transform ease-in-out h-fit cursor-pointer mx-0 text-2xl ${isScrolled ? 'hover:text-amber-700' : 'hover:text-[#d7b899] text-gray-50'
            }`}
        >
          <UserRound size={22} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 bg-gray-50 z-10 pb-3">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className="hover:bg-amber-100 cursor-pointer"
        >
          <UserRound className="mr-2" size={18} /><Link to={"/"}>Profile</Link>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="hover:bg-amber-100 cursor-pointer"
        >
          <Settings className="mr-2" size={18} /><Link to={"/"}>Settings</Link>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="hover:bg-amber-100 cursor-pointer"
        >
          <LogOut className="mr-2" size={18} /><Link to={"/"}>Logout</Link>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
