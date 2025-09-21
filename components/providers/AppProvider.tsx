import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "@/constants";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
    </div>
  );
};

export default AppProvider;
