import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";

function App() {
  const userIsLogged =
    localStorage.getItem("user_logged") === "true" ? true : false;

  return (
    <div className={styles["app_container"]}>
      <div className={styles["login_page_container"]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />{" "}
            {userIsLogged && <Route path="/home" element={<HomePage />} />}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
