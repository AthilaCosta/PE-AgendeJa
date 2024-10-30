import { BusinessForm } from "./BusinessForm/index";
import styles from "./BusinessPage.module.css";

export function BusinessPage() {
  return (
    <div className={styles["container"]}>
      <BusinessForm />
    </div>
  );
}
