export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode; // ✅ 특정 컬럼만 커스텀 렌더링 가능
  renderHeader?: () => React.ReactNode; // ✅ 특정 컬럼 헤더도 커스텀 렌더링 가능
}

interface GridProps<T> {
  data: T[];
  columns: Column<T>[];
}

const Grid = <T,>({ data, columns }: GridProps<T>) => {
  const renderCell = (col: Column<T>, row: T) => {
    return col.render ? col.render(row) : String(row[col.key]);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-2 text-left font-medium text-gray-700">
                {col.renderHeader ? col.renderHeader() : col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.key)} className="truncate px-4 py-2">
                  {renderCell(col, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
