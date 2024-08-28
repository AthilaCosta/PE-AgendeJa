import { Button } from "antd";
import { LoginForm } from "./LoginForm/LoginForm";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  return (
    <div className={styles["container"]}>
      <div className={styles["desc_container"]}>
        <h1 className={styles["title"]}>Bem vindo!</h1>
        <h3 className={styles["subtitle"]}>
          Entre com suas credenciais e faça o seu agendamento
        </h3>

        <Button
          type="primary"
          size={"large"}
          className={styles["button_register"]}
        >
          CADASTRAR
        </Button>
      </div>
      <div className={styles["form_container"]}>
        <LoginForm />
      </div>
    </div>
  );
}
