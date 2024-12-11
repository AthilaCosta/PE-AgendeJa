import styles from "./Table.module.css";
import { ITableBodyProps } from "./interfaces";

export function Table({ data, columns }: ITableBodyProps) {
  return (
    <div className={styles["table-container"]}>
      <table className={styles["table_component"]}>
        <thead>
          <tr className={styles["table_header_row"]}>
            {columns.map((column, index) => (
              <th key={index} className={styles["table_header_cell"]}>
                {column.label as string}
              </th>
            ))}
          </tr>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={styles["input_line"]}>
                {column.type !== "actions" && (
                  <input
                    type="text"
                    className={styles["input_text"]}
                    placeholder={column.placeholder as string}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0 ? styles["row_even"] : styles["row_odd"]
              }
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={
                    column.type !== "actions"
                      ? styles["table_cell"]
                      : styles["table_cell_action"]
                  }
                >
                  {row[column.value as string] && column.type !== "actions"
                    ? row[column.value]
                    : column.type === "actions"
                    ? (column.actions as Record<string, unknown>[]).map(
                        (action, actionIndex) => (
                          <button
                            key={actionIndex}
                            className={styles["action_button"]}
                            onClick={() => {
                              if (action.onClick) {
                                // Passa o `row` ao clicar
                                if (typeof action.onClick === "function") {
                                  action.onClick(row);
                                }
                              }
                            }}
                          >
                            {action.label as string}
                          </button>
                        )
                      )
                    : "---"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
