import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/Layout";
import { MyProfilePage } from "./pages/MyProfilePage";
import { BusinessPage } from "./pages/BusinessPage";

function App() {
  const userIsLogged =
    localStorage.getItem("user_logged") === "true" ? true : false;
  const isLogin = window.location.pathname === "/";

  const userData = JSON.parse(localStorage.getItem("user_data") as string);

  return (
    <div className={styles["app_container"]}>
      {!isLogin && (
        <Layout userData={userData}>
          <BrowserRouter>
            {userIsLogged && (
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/my_profile" element={<MyProfilePage />} />
                <Route path="/business" element={<BusinessPage />} />
              </Routes>
            )}
          </BrowserRouter>
        </Layout>
      )}
      {isLogin && (
        <div className={styles["login_page_container"]}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
