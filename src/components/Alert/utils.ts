import { IAlert } from "./Alert";

export function getAlertClass(alert: IAlert) {
  switch (alert?.type) {
    case "success":
      return "success";
    case "error":
      return "error";
    default:
      return "";
  }
}
