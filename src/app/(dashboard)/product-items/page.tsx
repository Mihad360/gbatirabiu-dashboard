"use client";

import { useState } from "react";
import { Trash2, Tag } from "lucide-react";
import Image from "next/image";
import GbPagination from "@/forms/GBPagination";
import GbModal from "@/forms/GBModal";

// ── dummy data ────────────────────────────────────────────────
const dummyItems = [
  { _id: "1", name: "Shirt", image: "/items/shirt.jpg" },
  { _id: "2", name: "duvet", image: "/items/duvet.jpg" },
  { _id: "3", name: "Pants", image: "/items/pants.jpg" },
  { _id: "4", name: "Towel", image: "/items/towel.jpg" },
  { _id: "5", name: "Bedsheet", image: "/items/bedsheet.jpg" },
];

const ITEMS_PER_PAGE = 5;

const ProductItemsPage = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newItemName, setNewItemName] = useState("");

  const totalPages = Math.ceil(dummyItems.length / ITEMS_PER_PAGE);
  const paginated = dummyItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <Tag size={16} className="text-primary" /> Product Items
          </h2>
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            + Add Dress Items
          </button>
        </div>

        {/* List */}
        <div className="flex flex-col divide-y divide-gray-100">
          {paginated.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between py-3.5 hover:bg-gray-50/50 px-2 rounded-lg transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {item.name}
                </span>
              </div>
              <button
                onClick={() => console.log("delete", item._id)}
                className="text-red-400 hover:text-red-500 transition p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <GbPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Add Dress Item Modal */}
      <GbModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add Dress Item"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Dress Item"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="w-full border-b border-gray-200 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary transition"
          />

          {/* Upload Image */}
          <div className="flex items-center justify-between border-b border-gray-200 py-2.5">
            <span className="text-sm text-gray-400">Upload Image</span>
            <button className="text-gray-400 hover:text-primary transition">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  strokeWidth="1.5"
                />
                <path d="M3 15l5-5 4 4 3-3 6 6" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => {
              console.log("add item:", newItemName);
              setAddOpen(false);
              setNewItemName("");
            }}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg text-sm font-medium transition mt-1"
          >
            Add Dress Item
          </button>
        </div>
      </GbModal>
    </div>
  );
};

export default ProductItemsPage;
