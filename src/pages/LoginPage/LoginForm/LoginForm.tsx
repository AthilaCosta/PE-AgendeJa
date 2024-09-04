import { Button } from "antd";
import styles from "./LoginForm.module.css";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { TextInput } from "../../../components/Inputs/TextInputs/TextInput";

export function LoginForm() {
  return (
    <div className={styles["container"]}>
      <div className={styles["title_container"]}>
        <h1 className={styles["title"]}>Entrar no AgendeJá</h1>
      </div>
      <TextInput
        placeholder={"Digite seu e-mail"}
        type={"email"}
        preffix={<MailOutlined className={styles["icon_input"]} />}
        label={"Digite seu e-mail"}
      />
      <TextInput
        placeholder={"Digite sua senha"}
        type={"password"}
        preffix={<LockOutlined className={styles["icon_input"]} />}
        label={"Digite sua senha"}
      />

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
