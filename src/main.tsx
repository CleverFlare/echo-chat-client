import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@lonik/themer";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { Toaster } from "./components/ui/sonner";
import { NowProvider } from "./hooks/use-now";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

document.body.className = "flex flex-col w-screen h-[100svh]";

const queryClient = new QueryClient();

createRoot(document.body!).render(
  <StrictMode>
    <ThemeProvider themes={["light", "dark"]}>
      <NowProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </NowProvider>
    </ThemeProvider>
  </StrictMode>,
);
