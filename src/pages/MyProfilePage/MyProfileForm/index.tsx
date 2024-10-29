import { Button, Form } from "antd";
import styles from "./MyprofileForm.module.css";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { TextInput } from "../../../components/Inputs/TextInputs/TextInput";
import { RuleObject } from "antd/es/form";
import { serverConnection } from "../../../configs/connectionServerConfig";
import { showAlert } from "../../../components/Alert/Alert";
import { closeLoader, openLoader } from "../../../components/Loading/Loading";
import { useState } from "react";

export interface IProfileData {
  firstName: string;
  lastName: string;
  email: string;
  governmentId: string;
  password: string;
  confirmPassword?: string;
}

export function MyProfileForm() {
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const [form] = Form.useForm();

  const userInitialData = JSON.parse(
    localStorage.getItem("user_data") as string
  );

  const handleFieldsChange = () => {
    const currentValues = form.getFieldsValue();
    const hasChanged = Object.keys(userInitialData).some(
      (key) => currentValues[key] !== userInitialData[key]
    );
    setIsSaveEnabled(hasChanged);
  };

  const handleFinish = (values: IProfileData) => {
    const profileData = values;

    serverConnection({
      suffixUrl: `users/edit/${userInitialData.id}`,
      method: "PUT",
      body: profileData as unknown as Record<string, unknown>,
    })
      .then((response) => {
        openLoader();
        if (response.status === 201) {
          form.resetFields();
        }
        showAlert("success", "Informações do usuário editadas com sucesso.");
      })
      .finally(() => {
        closeLoader();
      })
      .catch((error) => {
        showAlert(
          "error",
          "Erro ao editar informações do usuário. Tente novamente."
        );
        throw error;
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsSaveEnabled(false);
  };

  const handleFinishFailed = () => {
    showAlert("error", "Campos obrigatórios não preenchidos");
  };

  const validatePassword = (_: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject(new Error("A senha é obrigatória"));
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(value)) {
      return Promise.reject(
        new Error(
          "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
        )
      );
    }

    return Promise.resolve();
  };

  const validateConfirmPassword = (_: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject(new Error("A confirmação de senha é obrigatória"));
    }

    if (value !== form.getFieldValue("password")) {
      return Promise.reject(new Error("As senhas não coincidem"));
    }

    return Promise.resolve();
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["title_container"]}>
        <h1 className={styles["title"]}>Editar minhas informações</h1>
      </div>
      <Form
        className={styles["form_container"]}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        autoComplete="off"
        form={form}
        onFieldsChange={handleFieldsChange}
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
          defaultValue={userInitialData.firstName}
        />
        <TextInput
          defaultValue={userInitialData.lastName}
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
          defaultValue={userInitialData.email}
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
          defaultValue={userInitialData.governmentId}
          prefix={<IdcardOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder={"Digite seu CPF ou CNPJ"}
          label={"CPF/CNPJ"}
          disable={true}
          id={"governmentId"}
          onChange={() => {}}
          customContainerClassName={styles["input"]}
        />
        <TextInput
          defaultValue={userInitialData.password}
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
          defaultValue={userInitialData.password}
          prefix={<LockOutlined className={styles["icon_input"]} />}
          type={"password"}
          placeholder={"Repita sua senha"}
          label={"Confirme sua senha"}
          id={"confirmPassword"}
          onChange={() => {}}
          customContainerClassName={styles["input"]}
          validation={{
            required: true,
            validator: validateConfirmPassword,
          }}
        />
        <Form.Item className={styles["button_cadaster_container"]}>
          <Button
            type="primary"
            size="large"
            className={styles["button_cancel"]}
            onClick={handleCancel}
          >
            CANCELAR
          </Button>
          <Button
            type="primary"
            size="large"
            className={styles["button_save"]}
            htmlType="submit"
            disabled={!isSaveEnabled}
          >
            SALVAR
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
