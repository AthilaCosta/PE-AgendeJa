import { LoginForm } from "./LoginForm/LoginForm";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  return (
    <div className={styles["container"]}>
      <div className={styles["title_container"]}>
        <h1 className={styles["title"]}>Login</h1>
        <h3 className={styles["subtitle"]}>Entre para continuar</h3>
      </div>
      <div className={styles["form_container"]}>
        <LoginForm />
      </div>
    </div>
  );
}
