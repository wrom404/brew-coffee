// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserRound } from "lucide-react"


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

      <DropdownMenuContent className="w-56 bg-gray-50 z-10">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className="hover:bg-amber-100 cursor-pointer"
        >
          Profile
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="hover:bg-amber-100 cursor-pointer"
        >
          Settings
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className="hover:bg-amber-100 cursor-pointer"
        >
          Logout
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
