import { Button, Form } from "antd";
import styles from "./CadasterForm.module.css";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { TextInput } from "../../../components/Inputs/TextInputs/TextInput";

export function CadasterForm() {
  return (
    <div className={styles["container"]}>
      <div className={styles["title_container"]}>
        <h1 className={styles["title"]}>Cadastre-se no AgendeJá</h1>
      </div>
      <Form className={styles["form_container"]}>
        <TextInput
          prefix={<UserOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder="Digite seu nome"
          label={"Nome"}
          onChange={() => {}}
          customContainerClassName={styles["input"]}
        />
        <TextInput
          prefix={<UserOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder={"Digite seu sobrenome"}
          label={"Sobrenome"}
          onChange={() => {}}
          customContainerClassName={styles["input"]}
        />
        <TextInput
          prefix={<MailOutlined className={styles["icon_input"]} />}
          type={"email"}
          placeholder={"Digite seu e-mail"}
          label={"E-mail"}
          onChange={() => {}}
          customContainerClassName={styles["input"]}
        />
        <TextInput
          prefix={<IdcardOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder={"Digite seu CPF ou CNPJ"}
          label={"CPF/CNPJ"}
          onChange={() => {}}
          customContainerClassName={styles["input"]}
        />
        <TextInput
          prefix={<LockOutlined className={styles["icon_input"]} />}
          type={"password"}
          placeholder={"Digite sua senha"}
          label={"Senha"}
          onChange={() => {}}
          customContainerClassName={styles["input"]}
        />
        <TextInput
          prefix={<LockOutlined className={styles["icon_input"]} />}
          type={"password"}
          placeholder={"Repita sua senha"}
          label={"Confirme sua senha"}
          onChange={() => {}}
          customContainerClassName={styles["input"]}
        />
      </Form>
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
