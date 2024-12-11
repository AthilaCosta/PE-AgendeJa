import { Button, Form } from "antd";
import styles from "./BusinessForm.module.css";
import { MailOutlined, ShopOutlined, PhoneOutlined } from "@ant-design/icons";
import { TextInput } from "../../../components/Inputs/TextInputs/TextInput";
import { RuleObject } from "antd/es/form";
import { serverConnection } from "../../../configs/connectionServerConfig";
import { showAlert } from "../../../components/Alert/Alert";
import { closeLoader, openLoader } from "../../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface IBusinessData {
  businessName: string;
  businessDescription: string;
  email: string;
  businessPhoneNumber: string;
}

export function BusinessForm() {
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [userData, setUserData] = useState<Record<string, unknown>>(
    JSON.parse(localStorage.getItem("user_data") as string)
  );

  const { id } = useParams<{ id: string }>();

  const [form] = Form.useForm();

  const handleFieldsChange = () => {
    const currentValues = form.getFieldsValue();
    const hasChanged = userData
      ? Object.keys(userData as Record<string, unknown>).some(
          (key) => currentValues[key] !== userData[key]
        )
      : false;
    setIsSaveEnabled(hasChanged);
  };

  useEffect(() => {
    if (id) {
      openLoader();
      serverConnection({
        suffixUrl: `businesses/registered/${id}`,
        method: "GET",
      })
        .then((response) => {
          const data = response.data as Record<string, unknown>[];
          const inputValues = data.find(
            (item) => item.businessId === Number(id)
          );
          form.setFieldsValue(inputValues);
          console.log(id, inputValues, data);
        })
        .finally(() => {
          closeLoader();
        });
    }
  }, [form, id]);

  const handleFinish = (values: IBusinessData) => {
    const businessData = values;

    if (businessData.businessPhoneNumber) {
      businessData.businessPhoneNumber =
        businessData.businessPhoneNumber.replace(/\D/g, "");
    }
    if (!id) {
      serverConnection({
        suffixUrl: `businesses/register-business/${userData.id}`,
        method: "POST",
        body: businessData as unknown as Record<string, unknown>,
      })
        .then((response) => {
          openLoader();
          if (response.status === 201) {
            const data = response.data;

            let userBusiness = JSON.parse(
              localStorage.getItem("user_business") as string
            );
            userBusiness = userBusiness.concat(data);
            localStorage.setItem("user_business", JSON.stringify(userBusiness));
            form.resetFields();
          }
          if (id) {
            showAlert("success", "Estabelecimento atualizado com sucesso.");
          } else {
            showAlert("success", "Estabelecimento criado com sucesso.");
          }
        })
        .finally(() => {
          window.location.href = "/business";
          closeLoader();
        })
        .catch((error) => {
          showAlert(
            "error",
            "Erro ao cadastrar estabelecimento. Tente novamente."
          );
          throw error;
        });
    } else {
      serverConnection({
        suffixUrl: `businesses/edit/${id}`,
        method: "PUT",
        body: businessData as unknown as Record<string, unknown>,
      })
        .then((response) => {
          openLoader();
          if (response.status === 201) {
            const data = response.data;

            let userBusiness = JSON.parse(
              localStorage.getItem("user_business") as string
            );
            userBusiness = userBusiness.concat(data);
            localStorage.setItem("user_business", JSON.stringify(userBusiness));
            form.resetFields();
          }
          if (id) {
            showAlert("success", "Estabelecimento atualizado com sucesso.");
          } else {
            showAlert("success", "Estabelecimento criado com sucesso.");
          }
        })
        .finally(() => {
          closeLoader();
          window.location.href = "/business";
        })
        .catch((error) => {
          showAlert(
            "error",
            "Erro ao cadastrar estabelecimento. Tente novamente."
          );
          throw error;
        });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsSaveEnabled(false);
  };

  const handleFinishFailed = () => {
    showAlert("error", "Campos obrigatórios não preenchidos");
  };

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1)$2")
      .replace(/(\d{4})(\d)/, "$1$2")
      .slice(0, 13);
  };

  const validatePhone = (_: RuleObject, value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length !== 11) {
      return Promise.reject(
        new Error("O telefone deve ter o formato (99) 99999-9999")
      );
    }
    return Promise.resolve();
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["title_container"]}>
        <h1 className={styles["title"]}>Meu estabelecimento</h1>
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
          prefix={<ShopOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder="Digite o nome do estabelecimento"
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
          prefix={<ShopOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder={"Digite a descrição do estabelecimento"}
          label={"Descrição do estabelecimento"}
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
          prefix={<PhoneOutlined className={styles["icon_input"]} />}
          type={"text"}
          placeholder={"Digite o número de telefone do estabelecimento"}
          label={"Contato do estabelecimento"}
          id={"businessPhoneNumber"}
          onChange={(e) => {
            const maskedValue = maskPhone(e.target.value);
            form.setFieldsValue({ businessPhoneNumber: maskedValue });

            // Validar o telefone após cada mudança
            validatePhone(null, maskedValue).catch((error) => {
              form.setFields([
                {
                  name: "businessPhoneNumber",
                  errors: [error.message],
                },
              ]);
            });
          }}
          customContainerClassName={styles["input"]}
          validation={{
            required: true,
            validator: validatePhone,
          }}
        />
        <Form.Item className={styles["button_cadaster_container"]}>
          <Button
            type="primary"
            size="large"
            className={styles["button_back"]}
            onClick={() => {
              window.location.href = "/business";
            }}
          >
            VOLTAR
          </Button>
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
