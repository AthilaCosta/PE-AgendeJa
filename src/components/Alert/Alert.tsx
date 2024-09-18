import { useState } from "react";
import { Alert } from "antd";
import styles from "./styles.module.css";

let showAlertFn: (
  type: "success" | "info" | "warning" | "error",
  message: string,
  description?: string
) => void;

function GlobalAlert() {
  const [alert, setAlert] = useState<{
    type: "success" | "info" | "warning" | "error";
    message: string;
    description?: string;
  } | null>(null);

  showAlertFn = (type, message, description) => {
    setAlert({ type, message, description });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const getAlertClass = () => {
    switch (alert?.type) {
      case "success":
        return styles.success;
      case "error":
        return styles.error;
      default:
        return "";
    }
  };

  return (
    <div className={`${styles.globalAlert} ${getAlertClass()}`}>
      {alert && (
        <Alert
          message={alert.message}
          description={alert.description}
          type={alert.type}
          closable
          showIcon
          onClose={closeAlert}
        />
      )}
    </div>
  );
}

export { GlobalAlert, showAlertFn };
