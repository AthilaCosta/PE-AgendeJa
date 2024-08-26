import { TextInput } from "../../../components/Inputs/TextInputs/TextInput";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  return (
    <div className={styles["container"]}>

    <div className={styles['title_container']}>
        <h1 className={styles["title"]}>Login</h1>
        <h3 className={styles["subtitle"]}>Faça login para acessar o sistema</h3>
    </div>

      <div className={styles["input_container"]}>
        <label className={styles["label"]}>Digite seu e-mail</label>
        <TextInput type={"email"} placeholder="Digite seu E-Mail" />
      </div>

      <div className={styles["input_container"]}>
        <label className={styles["label"]}>Digite sua senha</label>
        <TextInput type={"email"} placeholder="Digite seu E-Mail" />
      </div>
    </div>
  );
}
