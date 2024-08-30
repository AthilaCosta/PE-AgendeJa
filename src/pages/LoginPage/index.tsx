import { useState } from "react";
import { Button } from "antd";
import { LoginForm } from "./LoginForm/LoginForm";
import styles from "./LoginPage.module.css";
import { CadasterForm } from "./CadasterForm/CadasterForm";

export function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div
      className={`${styles.container} ${
        isSignUp ? styles["right-panel-active"] : ""
      }`}
    >
      <div className={styles.desc_container}>
        <h1 className={styles.title}>
          {isSignUp ? "Bem vindo!" : "Olá, amigo!"}
        </h1>
        <h3 className={styles.subtitle}>
          {isSignUp
            ? "Preencha com suas informações e siga para o agendamento"
            : "Entre com suas credenciais e faça o seu agendamento"}
        </h3>

        <Button
          type="primary"
          size={"large"}
          className={styles.button_register}
          onClick={() => {
            if (isSignUp) {
              setIsSignUp(false);
            } else {
              setIsSignUp(true);
            }
          }}
        >
          {isSignUp ? "ENTRAR" : "CADASTRAR"}
        </Button>
      </div>
      <div
        className={`${styles.form_container} ${
          isSignUp ? styles["form-hidden"] : ""
        }`}
      >
        {isSignUp ? <CadasterForm /> : <LoginForm />}
      </div>
    </div>
  );
}
