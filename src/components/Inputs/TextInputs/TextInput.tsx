import { ITextInputProps } from "./interface";
import { Input } from "antd";
import styles from "./TextInput.module.css";

export function TextInput(props: ITextInputProps) {
  return (
    <div className={styles["container"]}>
      <Input
        type={props.type}
        placeholder={props.placeholder}
        className={styles["text_input"]}
      />
    </div>
  );
}
