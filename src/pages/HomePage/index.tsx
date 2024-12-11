import { Calendar, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { GenericModal } from "../../components/Modal/Modal";
import { serverConnection } from "../../configs/connectionServerConfig";

dayjs.locale("pt-br");

export function HomePage() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<
    Record<string, unknown>[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [events, setEvents] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user_data") as string);
  const businessData = JSON.parse(
    localStorage.getItem("user_business") as string
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (businessData && businessData.length > 0) {
          // Requisições para cada empresa
          const responses = await Promise.all(
            businessData.map((business) =>
              serverConnection({
                method: "GET",
                suffixUrl: `/appointments/business/${business.id}`,
              })
            )
          );

          // Transformar e concatenar os resultados
          const allAppointments = responses.flatMap((response) =>
            transformAppointments(response.data)
          );

          setEvents(allAppointments); // Atualiza o estado com os eventos das empresas
        } else {
          // Requisição para o usuário caso não existam empresas
          const response = await serverConnection({
            method: "GET",
            suffixUrl: `/appointments/user/${userData.id}`,
          });

          setEvents(transformAppointments(response.data)); // Atualiza com eventos do usuário
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, [userData.id]);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleDateSelect = (date: Dayjs) => {
    if (!date.isSame(currentDate, "month")) {
      setCurrentDate(date);
    }
  };

  const headerRender = ({ value }) => {
    const month = value.format("MMMM YYYY");

    return (
      <div className={styles["calendar_header"]}>
        <Button icon={<LeftOutlined />} onClick={handlePrevMonth} />
        <span className={styles["calendar_header_title"]}>
          {month.toUpperCase()}
        </span>
        <Button icon={<RightOutlined />} onClick={handleNextMonth} />
      </div>
    );
  };

  const dateFullCellRender = (value) => {
    const isSelected = value.isSame(currentDate, "day");
    const dayEvents = events.filter((event) => event.date.isSame(value, "day"));

    const handleClick = () => {
      if (dayEvents.length > 0) {
        handleDateSelect(value);
        setSelectedDate(value);
        setSelectedEvents(dayEvents);
        setOpenModal(true);
      }
    };

    return (
      <div
        className={
          isSelected ? styles["selected_date_cell"] : styles["date_cell"]
        }
        onClick={handleClick}
        style={{ cursor: dayEvents.length > 0 ? "pointer" : "not-allowed" }}
      >
        <span className={styles["date_cell_text"]}>{value.date()}</span>
        {dayEvents.map((event, index) => (
          <div key={index} className={styles["event_container"]}>
            - {event.title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles["container"]}>
      <GenericModal
        title={selectedDate ? selectedDate.format("DD MMMM YYYY") : ""}
        openModal={openModal}
        setOpenModal={setOpenModal}
        footer={
          <div>
            <Button
              type="primary"
              size="large"
              className={styles["button_save"]}
              htmlType="submit"
              onClick={() => {
                serverConnection({
                  method: "DELETE",
                  suffixUrl: `/appointments/delete/${selectedEvents[0].appoiment_id}`,
                }).finally(() => {
                  setOpenModal(false);
                  window.location.reload();
                });
              }}
            >
              CANCELAR AGENDAMENTO
            </Button>
          </div>
        }
        body={
          <div>
            {selectedEvents.map((event, index) => {
              return (
                <div key={index} className={styles["event_modal_container"]}>
                  <p>Serviço: {event.title as string}</p>
                  <p>Estabelecimento: {event.company_name as string}</p>
                  <p>Horário: {(event.date as Dayjs).format("HH:mm")}</p>
                </div>
              );
            })}
          </div>
        }
      />
      <div className={styles["calendar_container"]}>
        <Calendar
          headerRender={headerRender}
          fullscreen={true}
          className={styles["calendar"]}
          value={currentDate}
          onSelect={handleDateSelect}
          fullCellRender={dateFullCellRender}
          mode="month"
        />
      </div>
    </div>
  );
}

function generateMockEvents() {
  const userData = JSON.parse(localStorage.getItem("user_data") as string);

  if (userData.role === "CLIENT") {
    return [
      {
        date: dayjs("2024-10-05 10:00:00"),
        title: "Corte de cabelo",
        company_name: "Claudia Hair",
        address: "Rua dos Alfeneiros, 7",
      },
      {
        date: dayjs("2024-10-19 15:30:00"),
        title: "Unha francesinha",
        company_name: "Nail Art",
        address: "Rua Coronel Assis, 780",
      },
    ];
  }

  return [];
}

function transformAppointments(appointments: Record<string, unknown>[]) {
  return appointments.map((appointment) => {
    return {
      date: dayjs(appointment.start as Date),
      title: appointment.appointmentDescription,
      company_name: appointment.businessName,
      user_id: appointment.userId,
      appoiment_id: appointment.appointmentId,
    };
  });
}
