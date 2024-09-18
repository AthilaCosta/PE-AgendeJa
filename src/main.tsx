import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AntDesignProvider } from "./providers/antdProvider/AntdProvider.tsx";
import { GlobalAlert } from "./components/Alert/Alert.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntDesignProvider>
      <GlobalAlert />
      <App />
    </AntDesignProvider>
  </StrictMode>
);
