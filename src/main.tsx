import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { Toaster } from "./components/ui/sonner";
import { WarningCircleIcon } from "@phosphor-icons/react";

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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            error: "!border-destructive",
          },
        }}
        icons={{
          error: <WarningCircleIcon className="text-destructive" size={20} />,
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
);
