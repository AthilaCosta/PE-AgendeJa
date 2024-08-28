import { Button } from "antd";
import { Input } from "antd";
import styles from "./LoginForm.module.css";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

export function LoginForm() {
  return (
    <div className={styles["container"]}>
      <div className={styles["title_container"]}>
        <h1 className={styles["title"]}>Entrar no AgendeJá</h1>
      </div>
      <div className={styles["input_container"]}>
        <label className={styles["label"]}>Digite seu e-mail</label>
        <Input
          className={styles["input"]}
          prefix={<MailOutlined className={styles["icon_input"]} />}
          type={"email"}
          placeholder="Digite seu e-mail"
          // classNames={{ input: styles["input"] }}
          rootClassName={styles["input"]}
        />
      </div>

      <div className={styles["input_container"]}>
        <label className={styles["label"]}>Digite sua senha</label>
        <Input
          className={styles["input"]}
          prefix={<LockOutlined className={styles["icon_input"]} />}
          type={"password"}
          placeholder={"Digite sua senha"}
          classNames={{ input: styles["input"] }}
          rootClassName={styles["input"]}
        />
      </div>

      <div>
        <Button
          type="primary"
          size={"large"}
          className={styles["button_login"]}
        >
          ENTRAR
        </Button>
      </div>
    </div>
  );
}
