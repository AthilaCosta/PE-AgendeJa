import { ITextInputProps } from "./interface";
import { Input } from "antd";
import styles from "./TextInput.module.css";

export function TextInput(props: ITextInputProps) {
  return (
    <div className={styles["container"]}>
      <label className={styles["label"]}>{props.label}</label>
      <Input
        className={styles["text_input"]}
        type={props.type}
        placeholder={props.placeholder}
        classNames={{ input: styles["input"] }}
        prefix={props.preffix}
      />
    </div>
  );
}
