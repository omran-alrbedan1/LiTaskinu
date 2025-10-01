import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Providers as ThemeProvider } from "@/components/providers/ThemeProvider";
import { CLIENT_ID } from "@/constants";
import { TooltipProvider } from "../ui/tooltip";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <TooltipProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </TooltipProvider>
      </GoogleOAuthProvider>
    </div>
  );
};

export default AppProvider;
