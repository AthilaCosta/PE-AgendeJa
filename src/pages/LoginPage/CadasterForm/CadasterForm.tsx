import { Button, Form } from "antd";
import styles from "./CadasterForm.module.css";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { TextInput } from "../../../components/Inputs/TextInputs/TextInput";

interface ICadastroData {
  nome: string;
  sobrenome: string;
  email: string;
  cpf_cnpj: string;
  senha: string;
  confirmacao_senha: string;
}

export function CadasterForm() {

  const handleFinish = (values: ICadastroData) => {
    console.log("Finish", values);
  };

  const handleFinishFailed = () => {
    console.log("Failed");
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["title_container"]}>
        <h1 className={styles["title"]}>Cadastre-se no AgendeJá</h1>
      </div>
      <Form
        className={styles["form_container"]}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        autoComplete="off"
      >
        <TextInput
          prefix={<UserOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder="Digite seu nome"
          label={"Nome"}
          id={"nome"}
          onChange={() => { }}
          customContainerClassName={styles["input"]}
          validation={{
            required: true,
            message: "Campo obrigatório",
          }}
        />
        <TextInput
          prefix={<UserOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder={"Digite seu sobrenome"}
          label={"Sobrenome"}
          id={"sobrenome"}
          onChange={() => { }}
          customContainerClassName={styles["input"]}
          validation={{
            required: true,
            message: "Campo obrigatório",
          }}
        />
        <TextInput
          prefix={<MailOutlined className={styles["icon_input"]} />}
          type={"email"}
          placeholder={"Digite seu e-mail"}
          label={"E-mail"}
          id={"email"}
          onChange={() => { }}
          customContainerClassName={styles["input"]}
          validation={{
            required: true,
            message: "Campo obrigatório",
          }}
        />
        <TextInput
          prefix={<IdcardOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder={"Digite seu CPF ou CNPJ"}
          label={"CPF/CNPJ"}
          id={"cpf_cnpj"}
          onChange={() => { }}
          customContainerClassName={styles["input"]}
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
          id={"senha"}
          onChange={() => { }}
          customContainerClassName={styles["input"]}
          validation={{
            required: true,
            message: "Campo obrigatório",
          }}
        />
        <TextInput
          prefix={<LockOutlined className={styles["icon_input"]} />}
          type={"password"}
          placeholder={"Repita sua senha"}
          label={"Confirme sua senha"}
          id={"confirmacao_senha"}
          onChange={() => { }}
          customContainerClassName={styles["input"]}
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
          CADASTRAR
        </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
