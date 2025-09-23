import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import TooltipButton from "./TooltipButton";

export default function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TooltipButton
          variant="ghost"
          size="icon"
          className="relative"
          tooltipContent="Notifications"
        >
          <Bell className="h-5 w-5 text-primary-color1" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </TooltipButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Notification 1</DropdownMenuItem>
        <DropdownMenuItem>Notification 2</DropdownMenuItem>
        <DropdownMenuItem>Notification 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
