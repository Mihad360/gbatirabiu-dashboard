"use client";

import { ChevronRight } from "lucide-react";

type TGbPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const GbPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: TGbPaginationProps) => {
  if (totalPages <= 1) return null;

  // build page numbers — show max 5 pages around current
  const getPages = () => {
    const pages: number[] = [];
    const max = 5;

    let start = Math.max(1, currentPage - Math.floor(max / 2));
    let end = start + max - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - max + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {getPages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded-full text-sm font-medium transition ${
            page === currentPage
              ? "bg-primary text-white"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next arrow */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition"
        >
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
};

export default GbPagination;
