import { ITextInputProps } from "./interface";
import { Form, Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./TextInput.module.css";

export function TextInput(props: ITextInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={`${styles["container"]} ${props.customContainerClassName}`}>
      <label className={styles["label"]}>{props.label}</label>
      <Form.Item
        style={{ width: "100%", height: "100%", margin: 0 }}
        name={props.id}
        initialValue={props.defaultValue}
        rules={[
          {
            required: props.validation?.required,
            message: props.validation?.message,
            min: props.validation?.min,
            max: props.validation?.max,
            pattern: props.validation?.pattern,
            validator: props.validation?.validator,
          },
        ]}
      >
        <Input
          className={styles["text_input"]}
          type={
            props.type === "password" && passwordVisible ? "text" : props.type
          }
          placeholder={props.placeholder}
          classNames={{ input: styles["input"] }}
          prefix={props.prefix}
          value={props.defaultValue}
          defaultValue={props.defaultValue}
          disabled={props.disable}
          suffix={
            props.type === "password" && (
              <span onClick={togglePasswordVisibility}>
                {passwordVisible ? (
                  <EyeInvisibleOutlined className={styles["eye_icon"]} />
                ) : (
                  <EyeOutlined className={styles["eye_icon"]} />
                )}
              </span>
            )
          }
          onChange={props.onChange}
        />
      </Form.Item>
    </div>
  );
}
