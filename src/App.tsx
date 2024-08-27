import styles from "./App.module.css";
import { LoginPage } from "./pages/LoginPage";
import loginImage from "./assets/logindoor.svg";
import logoImage from "./assets/logo.png";

function App() {
  return (
    <div className={styles["app_container"]}>
      <div className={styles["logo_container"]}>
        <img
          className={styles["logo_image"]}
          src={logoImage}
          alt="logoIcon"
        />
        <img
          className={styles["login_image"]}
          src={loginImage}
          alt="loginIcon"
        />
      </div>
      <div className={styles["login_page_container"]}>
        <LoginPage />
      </div>
    </div>
  );
}

export default App;
