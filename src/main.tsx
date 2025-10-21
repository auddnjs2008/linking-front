import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReactQueryProvider } from "./components/provider/react-query-provider";
import { Toaster } from "./components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ReactQueryProvider>
        <App />
        <Toaster />
      </ReactQueryProvider>
    </HelmetProvider>
  </StrictMode>
);
