import { Button, Form } from "antd";
import styles from "./CadasterForm.module.css";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { TextInput } from "../../../components/Inputs/TextInputs/TextInput";
import { RuleObject } from "antd/es/form";

interface ICadastroData {
  nome: string;
  sobrenome: string;
  email: string;
  cpf_cnpj: string;
  senha: string;
  confirmacao_senha: string;
}

export function CadasterForm() {
  const [form] = Form.useForm();

  const handleFinish = (values: ICadastroData) => {
    console.log("Finish", values);
  };

  const handleFinishFailed = () => {
    console.log("Failed");
  };

  // Função de validação para a senha
  const validatePassword = (_: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject(new Error("A senha é obrigatória"));
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(value)) {
      return Promise.reject(
        new Error(
          "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
        )
      );
    }

    return Promise.resolve();
  };

  // Função de validação para confirmar se as senhas são iguais
  const validateConfirmPassword = (_: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject(new Error("A confirmação de senha é obrigatória"));
    }

    if (value !== form.getFieldValue("senha")) {
      return Promise.reject(new Error("As senhas não coincidem"));
    }

    return Promise.resolve();
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
        form={form}
      >
        <TextInput
          prefix={<UserOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder="Digite seu nome"
          label={"Nome"}
          id={"nome"}
          onChange={() => {}}
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
          onChange={() => {}}
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
          onChange={() => {}}
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
          onChange={() => {}}
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
          id={"senha"}
          onChange={() => {}}
          label={"Senha"}
          customContainerClassName={styles["input"]}
          validation={{
            required: true,
            validator: validatePassword,
          }}
        />
        <TextInput
          prefix={<LockOutlined className={styles["icon_input"]} />}
          type={"password"}
          placeholder={"Repita sua senha"}
          label={"Confirme sua senha"}
          id={"confirmacao_senha"}
          onChange={() => {}}
          customContainerClassName={styles["input"]}
          validation={{
            required: true,
            validator: validateConfirmPassword,
          }}
        />

        <Form.Item className={styles["button_cadaster_container"]}>
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
