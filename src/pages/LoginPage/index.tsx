import { useState, useEffect } from "react";
import { Button } from "antd";
import { LoginForm } from "./LoginForm/LoginForm";
import { CadasterForm } from "./CadasterForm/CadasterForm";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForm, setShowForm] = useState(true); // Inicialmente mostra o formulário
  const [isAnimating, setIsAnimating] = useState(false); // Estado para controlar a animação

  useEffect(() => {
    setIsAnimating(true); // Inicia a animação
    setShowForm(false);   // Esconde o formulário

    const timer = setTimeout(() => {
      setShowForm(true);   // Mostra o formulário após a animação
      setIsAnimating(false); // Animação terminou
    }, 600); // Tempo de animação em ms, deve corresponder ao CSS

    return () => clearTimeout(timer); // Limpa o temporizador ao desmontar o componente
  }, [isSignUp]);

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
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "ENTRAR" : "CADASTRAR"}
        </Button>
      </div>
      <div
        className={`${styles.form_container} ${
          isAnimating ? styles["animating"] : ""
        }`}
      >
        {showForm && (isSignUp ? <CadasterForm /> : <LoginForm />)}
      </div>
    </div>
  );
}
