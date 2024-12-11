import { ITextInputProps } from "./interface";
import { DatePicker, Form } from "antd";
import styles from "./DatePicker.module.css";
import { ChangeEvent } from "react";

export function DatePickerInput(props: ITextInputProps) {
  return (
    <div
      className={`${styles["container"]} ${props.customContainerClassName} custom-date-picker`}
    >
      <label
        className={
          props.invertColorLabel ? styles["label_invert"] : styles["label"]
        }
      >
        {props.label}
      </label>
      <Form.Item
        style={{ width: "100%", height: "100%", margin: 0 }}
        name={props.id}
        initialValue={props.defaultValue}
      >
        <DatePicker
          className={styles["text_input"]}
          suffixIcon={props.prefix}
          placeholder={props.placeholder}
          value={props.defaultValue as unknown as ChangeEvent<HTMLInputElement>}
          defaultValue={
            props.defaultValue as unknown as ChangeEvent<HTMLInputElement>
          }
          showTime={{ format: "HH:mm", showNow: true }}
          onChange={props.onChange}
          format={{ format: "DD/MM/YYYY HH:mm", type: "mask" }}
        />
      </Form.Item>
    </div>
  );
}
