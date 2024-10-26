import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./components/Layout";

function App() {
  // const userIsLogged =
  //   localStorage.getItem("user_logged") === "true" ? true : false;
  const isLogin = window.location.pathname === "/";

  return (
    <div className={styles["app_container"]}>
      {!isLogin && (
        <Layout>
          <BrowserRouter>
            <Routes>
              {/* {userIsLogged && ( */}
              <Route path="/home" element={<HomePage />} />
              {/* )} */}
            </Routes>
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
