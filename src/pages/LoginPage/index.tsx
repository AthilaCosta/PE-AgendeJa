import { useState } from "react";
import { Button } from "antd";
import { LoginForm } from "./LoginForm/LoginForm";
import { CadasterForm } from "./CadasterForm/CadasterForm";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [animation, setAnimation] = useState("");
  const [transitioning, setTransitioning] = useState(false);

  const handleButtonClick = () => {
    setAnimation(styles.fadeOut);
    setTransitioning(true);

    setTimeout(() => {
      setIsSignUp((prev) => !prev);
    }, 100);

    setTimeout(() => {
      setAnimation(styles.fadeIn);
      setTransitioning(false);
    }, 300);
  };

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
          onClick={handleButtonClick}
          disabled={transitioning}
        >
          {isSignUp ? "ENTRAR" : "CADASTRAR"}
        </Button>
      </div>
      <div className={`${styles.form_container} ${animation}`}>
        {isSignUp ? <CadasterForm /> : <LoginForm />}
      </div>
    </div>
  );
}
