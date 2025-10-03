import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import TooltipButton from "./TooltipButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Notifications() {
  const router = useRouter();
  return (
    <TooltipButton
      variant="ghost"
      size="icon"
      className="relative"
      tooltipContent="Notifications"
      onClick={() => router.push("./notifications")}
    >
      <Bell className="h-5 w-5 text-primary-color1" />
      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white">
        3
      </span>
    </TooltipButton>
  );
}
