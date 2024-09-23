import { useState } from "react";
import { Spin } from "antd";
import styles from "./Loading.module.css";

let setLoaderVisible: (visible: boolean) => void;

export function Loading() {
  const [visible, setVisible] = useState(false);

  setLoaderVisible = setVisible;

  return (
    visible && (
      <div className={styles.overlay}>
        <div className={styles.loaderContainer}>
          <Spin size="large" />
        </div>
      </div>
    )
  );
}

export function openLoader() {
  setLoaderVisible(true);
}

export function closeLoader() {
  setLoaderVisible(false);
}
