import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from '@tanstack/react-router';
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import "./index.css";

// Import the generated route tree
import RouterWithAuthContext from "./auth-provider";
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({
  routeTree, defaultPreload: 'intent',
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient();
// const auth = useAuth()

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <HelmetProvider>
          <RouterWithAuthContext router={router} />
        </HelmetProvider>
      </ClerkProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
