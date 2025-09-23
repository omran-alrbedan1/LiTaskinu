import React from "react";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

interface Header {
  title: string;
  subtitle: string;
}

const Header: React.FC<Header> = ({ title, subtitle }) => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-primary-color1 bg-clip-text text-transparent dark:from-gray-100 dark:to-primary-color1">
        {title}
      </h1>
      <p className="text-muted-foreground mt-2">{subtitle}</p>
    </div>
    <div className="flex items-center space-x-2">
      <Badge variant="secondary" className="bg-green-500/10 border-green-500">
        <Activity className="h-3 w-3 mr-1 text-green-500" />
        Live
      </Badge>
      <span className="text-sm text-muted-foreground">
        Last updated: Just now
      </span>
    </div>
  </div>
);

export default Header;
