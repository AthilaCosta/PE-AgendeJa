import { Button, Form } from "antd";
import styles from "./LoginForm.module.css";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { TextInput } from "../../../components/Inputs/TextInputs/TextInput";
import { serverConnection } from "../../../configs/connectionServerConfig";
import { showAlertFn } from "../../../components/Alert/Alert";

interface ILoginData {
  email: string;
  password: string;
}

export function LoginForm() {
  const handleFinish = (values: ILoginData) => {
    serverConnection({
      suffixUrl: "users/sign_in",
      method: "POST",
      body: values as unknown as Record<string, unknown>,
    }).then((response) => {
      if (response.data === true) {
        localStorage.setItem("user_logged", "true");
        window.location.href = "/home";
      } else {
        showAlertFn("error", "Credenciais erradas. Email ou senha inválidos");
      }
    });
  };

  const handleFinishFailed = () => {
    console.log("Failed:");
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["title_container"]}>
        <h1 className={styles["title"]}>Entrar no AgendeJá</h1>
      </div>
      <Form
        className={styles["form_container"]}
        initialValues={{ remember: true }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        autoComplete="off"
      >
        <TextInput
          prefix={<MailOutlined className={styles["icon_input"]} />}
          type={"email"}
          placeholder={"Digite seu e-mail"}
          label={"E-mail"}
          id={"email"}
          onChange={() => {}}
          validation={{
            required: true,
            message: "Campo obrigatório",
          }}
        />
        <TextInput
          prefix={<LockOutlined className={styles["icon_input"]} />}
          type={"password"}
          placeholder={"Digite sua senha"}
          label={"Senha"}
          id={"password"}
          onChange={() => {}}
          validation={{
            required: true,
            message: "Campo obrigatório",
          }}
        />

        <Form.Item>
          <Button
            type={"primary"}
            size={"large"}
            className={styles["button_login"]}
            htmlType={"submit"}
          >
            ENTRAR
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
