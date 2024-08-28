import styles from "./App.module.css";
import { LoginPage } from "./pages/LoginPage";

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
