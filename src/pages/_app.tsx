import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SidebarDrawerProvider } from "@/contexts/SidebarDrawerContext";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from "@/services/queryClient";
import { makeServer } from "@/services/mirage";
import { AuthProvider } from "@/contexts/AuthContext";


if (process.env.NODE_ENV === "development") {
  makeServer();
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SidebarDrawerProvider>
        <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
          </AuthProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SidebarDrawerProvider>
    </ChakraProvider>
  );
}
