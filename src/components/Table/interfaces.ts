export interface ITableProps {
    title: Record<string, unknown>;
    columns: Record<string, unknown>[];
    data: Record<string, unknown>[];
    sections?: Record<string, unknown>[];
}

export interface ITableBodyProps {
    columns: Record<string, unknown>[];
    data: Record<string, unknown>[];
}