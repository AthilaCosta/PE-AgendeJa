import BusinessList from "./BusinessList";
import styles from "./BusinessPage.module.css";

export function BusinessPage() {
  return (
    <div className={styles["container"]}>
      <BusinessList />
    </div>
  );
}
