import styles from "./Table.module.css";
import { ITableBodyProps } from "./interfaces";

export function Table({ data, columns }: ITableBodyProps) {
  return (
    <div className={styles["table-container"]}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label as string}</th>
            ))}
          </tr>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={styles["input_line"]}>
                {column.type !== "actions" && (
                  <input
                    type="text"
                    placeholder={column.placeholder as string}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {row[column.value] && column.type !== "actions"
                    ? row[column.value]
                    : column.type === "actions"
                    ? (column.actions as Record<string, unknown>[]).map(
                        (action, actionIndex) => (
                          <button key={actionIndex} onClick={action.onClick}>
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
