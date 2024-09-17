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
import { serverConnection } from "../../../configs/connectionServerConfig";

interface ICadastroData {
  firstName: string;
  lastName: string;
  email: string;
  governmentId: string;
  password: string;
  confirmPassword: string;
}

export function CadasterForm() {
  const [form] = Form.useForm();

  const handleFinish = (values: ICadastroData) => {

    const cadastroData = values;
    delete cadastroData?.['confirmPassword'];
    serverConnection({suffixUrl: 'users/sign-up', method: 'POST', body: cadastroData as unknown as Record<string, unknown>})

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
          id={"firstName"}
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
          id={"lastName"}
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
          id={"governmentId"}
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
          id={"password"}
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
          id={"confirmPassword"}
          onChange={() => {}}
          customContainerClassName={styles["input"]}
          validation={{
            required: true,
            // validator: validateConfirmPassword,
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
