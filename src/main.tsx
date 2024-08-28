import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AntDesignProvider } from "./providers/antdProvider/AntdProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntDesignProvider>
      <App />
    </AntDesignProvider>
  </StrictMode>
);
