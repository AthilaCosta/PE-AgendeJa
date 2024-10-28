import { MyProfileForm } from "./MyProfileForm";
import styles from "./MyProfilePage.module.css";

export function MyProfilePage() {
  return (
    <div className={styles["container"]}>
      <MyProfileForm />
    </div>
  );
}
