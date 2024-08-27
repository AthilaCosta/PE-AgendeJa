import styles from "./App.module.css";
import { LoginPage } from "./pages/LoginPage";
import logoImage from "./assets/logo.png";

function App() {
  return (
    <div className={styles["app_container"]}>
      <div className={styles["login_page_container"]}>
        <LoginPage />
      </div>
    </div>
  );
}

export default App;
