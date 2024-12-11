import { useEffect, useState } from "react";
import { TableCard } from "../../../components/Table/tableCard";
import { serverConnection } from "../../../configs/connectionServerConfig";
import { closeLoader, openLoader } from "../../../components/Loading/Loading";
import { CalendarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Form, { RuleObject } from "antd/es/form";
import { showAlert } from "../../../components/Alert/Alert";
import { TextInput } from "../../../components/Inputs/TextInputs/TextInput";
import { GenericModal } from "../../../components/Modal/Modal";
import { IBusinessData } from "../AllBusinessForm";
import styles from "../AllBusinessForm/BusinessForm.module.css";
import { DatePickerInput } from "../../../components/Inputs/DatePicker/DatePicker";

export default function BusinessList() {
  const [entities, setEntities] = useState<Record<string, unknown>[]>([]);
  const userData = JSON.parse(localStorage.getItem("user_data") as string);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [businessEntity, setBusinessEntity] = useState<Record<string, unknown>>(
    {}
  );

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

  const handleFinish = (values: Record<string, string>) => {
    const appointments = values;

    const formatedData = {
      appointmentDescription: appointments.appointmentDescription,
      start: formatDateISO(appointments.start.$d).start,
      end: formatDateISO(appointments.start.$d).end,
      userId: userData.id,
      businessId: businessEntity.businessId,
    };

    console.log(formatedData);
    serverConnection({
      suffixUrl: `appointments/schedule`,
      method: "POST",
      body: formatedData as unknown as Record<string, unknown>,
    })
      .then((response) => {
        openLoader();
      })
      .finally(() => {
        closeLoader();
        showAlert("success", "Agendamento realizado com sucesso.");
      })
      .catch((error) => {
        showAlert("error", "Erro ao realizar agendamento. Tente novamente.");
        throw error;
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsSaveEnabled(false);
    setOpenModal(false);
  };

  useEffect(() => {
    if (!openModal) {
      form.resetFields();
      setIsSaveEnabled(false);
    }
  }, [form, openModal]);

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
  useEffect(() => {
    openLoader();
    serverConnection({
      suffixUrl: `/businesses/all`,
      method: "GET",
    })
      .then((response) => {
        setEntities(response.data as Record<string, unknown>[]);
      })
      .finally(() => {
        closeLoader();
      });
  }, []);

  return (
    <>
      <GenericModal
        title={`Agendamento - ${businessEntity.businessName}`}
        openModal={openModal}
        setOpenModal={setOpenModal}
        footer={null}
        size={"large"}
        body={
          <div className={styles["modal_container"]}>
            <Form
              className={styles["form_container"]}
              onFinish={handleFinish}
              onFinishFailed={handleFinishFailed}
              autoComplete="off"
              form={form}
              onFieldsChange={handleFieldsChange}
            >
              <TextInput
                invertColorLabel={true}
                prefix={<CalendarOutlined className={styles["icon_input"]} />}
                type={"text"}
                placeholder="Digite o serviço"
                label={"Serviço"}
                id={"appointmentDescription"}
                onChange={() => {}}
                customContainerClassName={styles["input"]}
                validation={{
                  required: true,
                  message: "Campo obrigatório",
                }}
              />
              <DatePickerInput
                id="start"
                invertColorLabel={true}
                prefix={<CalendarOutlined className={styles["icon_input"]} />}
                onChange={(value) => {
                  console.log(typeof value);
                }}
                label="Data do agendamento"
                placeholder={"Selecione a data e o horário"}
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
        }
      />
      <TableCard
        title={{ title: "Estabelecimento" }}
        columns={[
          {
            value: "businessName",
            placeholder: "Digite um valor",
            label: "Nome",
          },
          {
            value: "businessPhoneNumber",
            placeholder: "Digite um valor",
            label: "Telefone",
          },
          {
            type: "actions",
            label: "Ações",
            actions: [
              {
                label: "Agendar",
                onClick: (record: Record<string, unknown>) => {
                  console.log(record);
                  setBusinessEntity(record);
                  setOpenModal(true);
                },
              },
            ],
          },
        ]}
        data={entities}
      />
    </>
  );
}

function formatDateISO(dateString: Date) {
  const date = new Date(dateString);

  // Formata a data inicial (start)
  const startYear = date.getFullYear();
  const startMonth = String(date.getMonth() + 1).padStart(2, "0"); // Meses começam em 0
  const startDay = String(date.getDate()).padStart(2, "0");
  const startHours = String(date.getHours()).padStart(2, "0");
  const startMinutes = String(date.getMinutes()).padStart(2, "0");

  const start = `${startDay}-${startMonth}-${startYear}T${startHours}:${startMinutes}`;

  // Calcula a data final (end) uma hora à frente
  date.setHours(date.getHours() + 1);

  const endYear = date.getFullYear();
  const endMonth = String(date.getMonth() + 1).padStart(2, "0");
  const endDay = String(date.getDate()).padStart(2, "0");
  const endHours = String(date.getHours()).padStart(2, "0");
  const endMinutes = String(date.getMinutes()).padStart(2, "0");

  const end = `${endDay}-${endMonth}-${endYear}T${endHours}:${endMinutes}`;

  return { start, end };
}
