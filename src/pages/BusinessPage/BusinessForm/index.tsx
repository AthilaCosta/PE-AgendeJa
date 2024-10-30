import { Button, Form } from "antd";
import styles from "./BusinessForm.module.css";
import {
  MailOutlined,
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

export function BusinessForm() {

  const [form] = Form.useForm();

  console.log(localStorage.getItem('user_data'), JSON.parse(localStorage.getItem('user_data') as string))
  const userData = JSON.parse(localStorage.getItem('user_data') as string);

  const handleFinish = (values: IProfileData) => {
    const profileData = values;

    serverConnection({
      suffixUrl: `businesses/register-business/${userData.id}`,
      method: "POST",
      body: profileData as unknown as Record<string, unknown>,
    })
      .then((response) => {
        openLoader();
        if (response.status === 201) {
          form.resetFields();
        }
        showAlert("success", "Estabelecimento criado com sucesso.");
      })
      .finally(() => {
        closeLoader();
      })
      .catch((error) => {
        showAlert(
          "error",
          "Erro ao criar estabelecimento. Tente novamente."
        );
        throw error;
      });
  };


  const handleFinishFailed = () => {
    showAlert("error", "Campos obrigatórios não preenchidos");
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
      >
        <TextInput
          prefix={<UserOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder={"Digite o nome do seu estabelecimento"}
          label={"Nome do estabelecimento"}
          id={"businessName"}
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
          placeholder={"Digite uma descrição"}
          label={"Faça uma descrição do seu estabelecimento"}
          id={"businessDescription"}
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
          placeholder={"Digite o e-mail do estabelecimento"}
          label={"E-mail do estabelecimento"}
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
          placeholder={"Digite o número de telefone do estabelecimento"}
          label={"Número do estabelecimento"}
          id={"businessPhoneNumber"}
          onChange={() => {}}
          customContainerClassName={styles["input"]}
        />
        <Form.Item className={styles["button_cadaster_container"]}>
          <Button
            type="primary"
            size="large"
            className={styles["button_cancel"]}
          >
            CANCELAR
          </Button>
          <Button
            type="primary"
            size="large"
            className={styles["button_save"]}
            htmlType="submit"
          >
            SALVAR
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
