import AllBusinessList from "./AllBusinessList";
import styles from "./BusinessPage.module.css";

export function AllBusinessPage() {
  return (
    <div className={styles["container"]}>
      <AllBusinessList />
    </div>
  );
}
