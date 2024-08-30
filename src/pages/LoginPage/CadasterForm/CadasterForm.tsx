import { Button, Form } from "antd";
import { Input } from "antd";
import styles from "./CadasterForm.module.css";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

export function CadasterForm() {
  return (
    <div className={styles["container"]}>
      <div className={styles["title_container"]}>
        <h1 className={styles["title"]}>Cadastre-se no AgendeJá</h1>
      </div>
      <Form></Form>
      <div className={styles["input_container"]}>
        <label className={styles["label"]}>Digite seu nome</label>
        <Input
          className={styles["input"]}
          prefix={<UserOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder="Digite seu nome"
          rootClassName={styles["input"]}
        />
      </div>

      <div className={styles["input_container"]}>
        <label className={styles["label"]}>Digite seu e-mail</label>
        <Input
          className={styles["input"]}
          prefix={<MailOutlined className={styles["icon_input"]} />}
          type={"email"}
          placeholder={"Digite seu e-mail"}
          classNames={{ input: styles["input"] }}
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
          {"CADASTRAR"}
        </Button>
      </div>
    </div>
  );
}
