import styles from "./App.module.css";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <div className={styles["app_container"]}>
      <LoginPage />
    </div>
  );
}

export default App;
