import { useState } from "react";
import SideBar from "../SideBar";
import styles from "./Layout.module.css";

interface ILayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: ILayoutProps) {
  const [isRetracted, setIsRetracted] = useState(false);
  const isLogin = window.location.pathname === "/";

  return (
    <div className={styles["container"]}>
      {!isLogin && (
        <div
          className={
            isRetracted
              ? styles["sidebar_container_retracted"]
              : styles["sidebar_container"]
          }
        >
          <SideBar retracted={isRetracted} setRetracted={setIsRetracted} />
        </div>
      )}
      <div className={styles["children_container"]}>{children}</div>
    </div>
  );
}
