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
      <div className="flex justify-center items-center py-12 text-gray-400 text-sm">
        Loading...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex justify-center items-center py-12 text-gray-400 text-sm">
        No data found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
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
              className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors last:border-0"
            >
              {columns.map((col) => (
                <td key={col.key as string} className="px-4 py-3.5 text-sm">
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
