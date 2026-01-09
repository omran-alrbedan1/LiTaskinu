// app/providers.tsx
'use client';

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Providers as ThemeProvider } from "@/components/providers/ThemeProvider";
import { CLIENT_ID } from "@/constants/options";
import { TooltipProvider } from "../ui/tooltip";
import StyledComponentsRegistry from "./antd-registry";

const makeQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1, 
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // ⚡ Server: دائماً إنشاء عميل جديد
    return makeQueryClient();
  } else {
    // ⚡ Browser: استخدم عميل واحد في كل مرة
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // ⚡ استخدام عميل واحد لجميع المكونات
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <StyledComponentsRegistry>
          <TooltipProvider>
            <ThemeProvider>
              {children}
          
            </ThemeProvider>
          </TooltipProvider>
        </StyledComponentsRegistry>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;