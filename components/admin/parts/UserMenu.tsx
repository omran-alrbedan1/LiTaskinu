"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { images } from "@/constants/images";
import { useRouter } from "next/navigation";
import { Bell, LogOut, User } from "lucide-react";
import TooltipButton from "./TooltipButton";

export default function UserMenu() {
  const router = useRouter();
  const user = {
    name: "liTaskunu Admin  ",
    email: "litaskunu@gmail.com",
    avatar: images.Unknown,
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TooltipButton
          variant="ghost"
          size="icon"
          className="relative"
          tooltipContent="profile"
        >
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <Image
                src={user.avatar || images.Unknown}
                alt="@username"
                height={120}
                width={120}
              />
            </Avatar>
          </Button>
        </TooltipButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex space-y-1">
            <div>
              <Image
                src={user.avatar || images.Unknown}
                alt="@username"
                height={40}
                width={40}
                className="rounded-full"
              />
            </div>
            <div className="ml-2 mt-2">
              <p className="text-sm font-medium leading-none">username</p>
              <p className="text-xs mt-1 leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="text-primary-color1" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/notifications")}>
          <Bell className="text-primary-color1" />
          Notifications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="text-primary-color1" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
