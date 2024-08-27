import { Button } from "antd";
import { TextInput } from "../../../components/Inputs/TextInputs/TextInput";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  return (
    <div className={styles["container"]}>
      <div className={styles["title_container"]}>
        <h1 className={styles["title"]}>Login</h1>
        <h3 className={styles["subtitle"]}>Entre para continuar</h3>
      </div>

      <div className={styles["input_container"]}>
        <label className={styles["label"]}>Digite seu e-mail</label>
        <TextInput type={"email"} placeholder="Digite seu E-Mail" />
      </div>

      <div className={styles["input_container"]}>
        <label className={styles["label"]}>Digite sua senha</label>
        <TextInput type={"email"} placeholder="Digite seu E-Mail" />
      </div>

      <div>
        <Button
          type="primary"
          size={"large"}
          className={styles["button_login"]}
        >
          <span className={styles["label_button"]}>ENTRAR</span>
        </Button>
      </div>
    </div>
  );
}
