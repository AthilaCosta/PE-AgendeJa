import { ITableProps } from "./interfaces";
import { Table } from "./tableBody";
import styles from "./TableCard.module.css";

export function TableCard({ title, columns, data, sections }: ITableProps) {
  return (
    <div className={styles["container"]}>
      <div className={styles["table_header_container"]}>
        <h1 className={styles["table_header"]}>{title.title as string}</h1>
        {(title.create as string) && (
          <span
            className={styles["create_button"]}
            onClick={() => {
              console.log("create");
              window.location.href = title.create as string;
            }}
          >
            <span className={styles["plus_icon"]}>+</span>
          </span>
        )}
      </div>
      {sections && (
        <div className={styles["sections_container"]}>
          {sections.map((section, index) => (
            <div key={index} className={styles["section_card"]}>
              {section.title as string}
            </div>
          ))}
        </div>
      )}
      <div
        className={styles["table_body_container"]}
        style={{ paddingTop: sections && sections.length > 0 ? "" : "20px" }}
      >
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}
