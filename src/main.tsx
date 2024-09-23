import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AntDesignProvider } from "./providers/antdProvider/AntdProvider.tsx";
import { GlobalAlert } from "./components/Alert/Alert.tsx";
import { Loading } from "./components/Loading/Loading.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AntDesignProvider>
      <Loading />
      <GlobalAlert />
      <App />
    </AntDesignProvider>
  </StrictMode>
);
