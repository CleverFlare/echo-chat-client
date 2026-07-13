import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "next-themes";

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

document.body.className = "flex flex-col w-screen h-[100svh]";

const queryClient = new QueryClient();

// Render the app
const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" enableSystem attribute="class">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
