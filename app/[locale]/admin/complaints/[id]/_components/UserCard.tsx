"use client";
import { User, Phone, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button as ShadButton } from "@/components/ui/button";

const UserCard = ({
  user,
  title,
  description,
  variant,
}: {
  user: User;
  title: string;
  description: string;
  variant?: "reporter" | "reported";
}) => {
  const variantStyles = {
    reporter: {
      border: "border-blue-200 dark:border-blue-800",
      bg: "bg-blue-50/50 dark:bg-blue-900/20",
      accent: "bg-blue-600 dark:bg-blue-700",
      button:
        "border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50",
      text: "text-gray-900 dark:text-white",
    },
    reported: {
      border: "border-red-200 dark:border-red-800",
      bg: "bg-red-50/50 dark:bg-red-900/20",
      accent: "bg-red-600 dark:bg-red-700",
      button:
        "border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50",
      text: "text-gray-900 dark:text-white",
    },
    default: {
      border: "border-gray-200 dark:border-gray-700",
      bg: "bg-gray-50/50 dark:bg-gray-800/50",
      accent: "bg-gray-600 dark:bg-gray-700",
      button:
        "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
      text: "text-gray-900 dark:text-white",
    },
  };

  const style =
    variantStyles[
      variant === "reporter"
        ? "reporter"
        : variant === "reported"
        ? "reported"
        : "default"
    ];

  return (
    <Card className={`${style.border} ${style.bg}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 ${style.accent} rounded-full flex items-center justify-center`}
          >
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className={`text-base ${style.text}`}>{title}</CardTitle>
            <CardDescription className="dark:text-gray-400">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pb-3">
        <div className="flex items-center gap-3 text-sm">
          <User className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className={`${style.text} truncate`}>{user.name}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className={`${style.text} truncate`}>{user.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className={`${style.text} truncate`}>{user.phone}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/admin/users/${user.id}`} className="w-full">
          <ShadButton variant="outline" className={`w-full ${style.button}`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View Profile
          </ShadButton>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
