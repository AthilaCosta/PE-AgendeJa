import { Button } from "antd";
import { Input } from "antd";
import styles from "./LoginForm.module.css";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

export function LoginForm() {
  return (
    <div className={styles["container"]}>
      <div className={styles["input_container"]}>
        <label className={styles["label"]}>Digite seu e-mail</label>
        <Input
          className={styles["input"]}
          prefix={<MailOutlined />}
          type={"email"}
          placeholder="Digite seu e-mail"
        />
      </div>

      <div className={styles["input_container"]}>
        <label className={styles["label"]}>Digite sua senha</label>
        <Input
          className={styles["input"]}
          prefix={<LockOutlined className={styles[""]}/>}
          type={"password"}
          placeholder={"Digite sua senha"}
        />
      </div>

      <div>
        <Button
          type="primary"
          size={"large"}
          className={styles["button_login"]}
        >
          ENTRAR
          {/* <span className={styles["label_button"]}>ENTRAR</span> */}
        </Button>
      </div>
    </div>
  );
}
