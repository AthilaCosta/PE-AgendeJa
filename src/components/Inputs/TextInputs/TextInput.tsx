import { ITextInputProps } from "./interface";
import { Form, Input } from "antd";
import styles from "./TextInput.module.css";

export function TextInput(props: ITextInputProps) {
  return (
    <div className={`${styles["container"]} ${props.customContainerClassName}`}>
      <label className={styles["label"]}>{props.label}</label>
      <Form.Item
        style={{ width: "100%", height: "100%", margin: 0 }}
        name={props.id}
        rules={[
          {
            required: props.validation?.required,
            message: props.validation?.message,
            min: props.validation?.min,
            max: props.validation?.max,
          },
        ]}
      >
        <Input
          className={styles["text_input"]}
          type={props.type}
          placeholder={props.placeholder}
          classNames={{ input: styles["input"] }}
          prefix={props.prefix}
          onChange={props.onChange}
        />
      </Form.Item>
    </div>
  );
}
