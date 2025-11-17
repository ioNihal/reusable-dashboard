export interface Column<RowType> {
    key: keyof RowType | string;
    title: string;
    hidden?: boolean;
    render?: (row: RowType) => React.ReactNode;
}

export interface TableProps<RowType extends Record<string, any>> {
    columns: Column<RowType>[];
    data: RowType[];
}