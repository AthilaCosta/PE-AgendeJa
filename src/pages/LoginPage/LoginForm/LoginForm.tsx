import { Button, Form } from "antd";
import styles from "./LoginForm.module.css";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { TextInput } from "../../../components/Inputs/TextInputs/TextInput";

interface ILoginData {
  email: string;
  password: string;
}

export function LoginForm() {
  const handleFinish = (values: ILoginData) => {
    console.log("Finish", values);
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
