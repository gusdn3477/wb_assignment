import Switch from './Switch';

export interface Column<T> {
  key: keyof T;
  label: string;
}

interface GridProps<T> {
  data: T[];
  columns: Column<T>[];
}

const Grid = <T,>({ data, columns }: GridProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-2 text-left font-medium text-gray-700">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-2">
                  {col.key === 'enabled' ? (
                    <Switch checked={!!row[col.key]} onChange={() => {}} />
                  ) : (
                    String(row[col.key])
                  )}
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
