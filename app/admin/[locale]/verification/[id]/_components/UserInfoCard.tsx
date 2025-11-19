//@ts-nocheck

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { getStatusVariant, getStatusIcon } from "@/utils/verification-utils";

const UserInfoCard: React.FC<{ user: User; status: string }> = ({
  user,
  status,
}) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </div>
          User Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Image
            src={"/images/userTest.jpg"}
            alt={user.name}
            width={72}
            height={72}
            className="rounded-2xl border-4 border-white shadow-sm"
          />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              {user.name}
            </h3>
            <Badge
              variant={getStatusVariant(status)}
              className="gap-1.5 mt-2 px-3 py-1"
            >
              {status.replace("_", " ")}
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {user.email}
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {user.phone}
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {user.address}
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {user.dateOfBirth}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;
