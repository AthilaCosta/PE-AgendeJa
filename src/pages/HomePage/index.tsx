import { Calendar, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./HomePage.module.css";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { GenericModal } from "../../components/Modal/Modal";

dayjs.locale("pt-br");

export function HomePage() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const [openModal, setOpenModal] = useState(false);

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
    return (
      <div
        className={
          isSelected ? styles["selected_date_cell"] : styles["date_cell"]
        }
        onClick = {() => {setOpenModal(true)}}
      >
        {value.date()}
      </div>
    );
  };

  return (
    <div className={styles["container"]}>
      <GenericModal title={currentDate.toString()} openModal={openModal} setOpenModal={setOpenModal} footer={<div></div>}/>
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