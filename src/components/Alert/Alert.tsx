import { useState } from "react";
import { Alert } from "antd";
import styles from "./styles.module.css";
import { getAlertClass } from "./utils";
import { v4 as uuidv4 } from "uuid";

export interface IAlert {
  id: string;
  type: "success" | "info" | "warning" | "error";
  message: string;
  description?: string;
}

export let showAlert: (
  type: "success" | "info" | "warning" | "error",
  message: string,
  description?: string
) => void;

export function GlobalAlert() {
  const [alerts, setAlerts] = useState<IAlert[]>([]);

  showAlert = (type, message, description) => {
    const newAlert = { id: uuidv4(), type, message, description };

    setAlerts((prevAlerts) => {
      const updatedAlerts = [newAlert, ...prevAlerts].slice(0, 3);

      setTimeout(() => {
        setAlerts((currentAlerts) =>
          currentAlerts.filter((alert) => alert.id !== newAlert.id)
        );
      }, 20000);

      return updatedAlerts;
    });
  };

  function closeAlert(id: string) {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }

  return (
    <div className={`${styles.globalAlert}`}>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          message={alert.message}
          description={alert.description}
          type={alert.type}
          closable
          showIcon
          onClose={() => closeAlert(alert.id)}
          className={styles[getAlertClass(alert)]}
        />
      ))}
    </div>
  );
}
