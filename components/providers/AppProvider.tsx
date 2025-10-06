import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Providers as ThemeProvider } from "@/components/providers/ThemeProvider";
import { CLIENT_ID } from "@/constants/options";
import { TooltipProvider } from "../ui/tooltip";
import StyledComponentsRegistry from "./antd-registry";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <StyledComponentsRegistry>
          <TooltipProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </TooltipProvider>
        </StyledComponentsRegistry>
      </GoogleOAuthProvider>
    </div>
  );
};

export default AppProvider;
