"use client";

import React from "react";

type Column<T> = {
  key: keyof T | string;
  title: string;
  render?: (record: T) => React.ReactNode;
};

type GbTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
};

const GbTable = <T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
}: GbTableProps<T>) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-400">
        Loading...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-400">
        No data found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow rounded-md mt-5">
      <table className="w-full border-collapse">
        <thead className="bg-primary text-white">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="text-left px-4 py-3 text-sm font-medium"
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key as string} className="px-4 py-3 text-sm">
                  {col.render
                    ? col.render(row)
                    : (row[col.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GbTable;
