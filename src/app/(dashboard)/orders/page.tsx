"use client";

import { useState } from "react";
import { Eye, Download, Mail } from "lucide-react";
import GbTable from "@/forms/GBTable";
import GbPagination from "@/forms/GBPagination";
import GbModal from "@/forms/GBModal";

const dummyOrders = [
  {
    _id: "1",
    orderId: "ORD-001",
    user: "Alice Johnson",
    date: "2023-10-25",
    details: "Wash & Iron",
    items: 5,
    total: 25,
    status: "pending",
  },
  {
    _id: "2",
    orderId: "ORD-002",
    user: "Alice Johnson",
    date: "2023-10-25",
    details: "Wash & Iron",
    items: 5,
    total: 25,
    status: "pending",
  },
  {
    _id: "3",
    orderId: "ORD-003",
    user: "Alice Johnson",
    date: "2023-10-25",
    details: "Wash & Iron",
    items: 5,
    total: 25,
    status: "processing",
  },
  {
    _id: "4",
    orderId: "ORD-004",
    user: "Alice Johnson",
    date: "2023-10-25",
    details: "Wash & Iron",
    items: 5,
    total: 25,
    status: "completed",
  },
];

const statusTabs = ["All", "Pending", "Processing", "Completed", "Canceled"];
const statusOptions = [
  "Picked Up",
  "Processing",
  "Completed",
  "Out for Delivery",
  "Delivered",
];

const statusColors: Record<string, string> = {
  pending: "text-yellow-500",
  processing: "text-blue-500",
  completed: "text-green-500",
  cancelled: "text-red-500",
  delivered: "text-green-600",
};

type TOrder = (typeof dummyOrders)[0];

const ITEMS_PER_PAGE = 5;

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = dummyOrders.filter((o) => {
    const matchTab =
      activeTab === "All" || o.status.toLowerCase() === activeTab.toLowerCase();
    const matchSearch =
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.user.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const columns = [
    {
      key: "orderId",
      title: "Order ID",
      render: (row: TOrder) => (
        <span className="font-medium text-gray-700">{row.orderId}</span>
      ),
    },
    {
      key: "user",
      title: "User",
      render: (row: TOrder) => (
        <div>
          <p className="font-medium text-gray-700">{row.user}</p>
          <p className="text-xs text-gray-400">{row.date}</p>
        </div>
      ),
    },
    {
      key: "details",
      title: "Details",
      render: (row: TOrder) => (
        <div>
          <p className="text-gray-700">{row.details}</p>
          <p className="text-xs text-gray-400">{row.items} items</p>
        </div>
      ),
    },
    {
      key: "total",
      title: "Total",
      render: (row: TOrder) => (
        <span className="font-medium text-gray-700">${row.total}.00</span>
      ),
    },
    {
      key: "date",
      title: "Order Date",
      render: (row: TOrder) => (
        <span className="text-gray-500 text-sm">{row.date}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (row: TOrder) => (
        <span
          className={`text-sm font-medium capitalize ${statusColors[row.status] || "text-gray-500"}`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (row: TOrder) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedOrder(row);
              setSelectedStatus("");
            }}
            className="text-gray-400 hover:text-primary transition"
            title="View"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/${row._id}/invoice`,
                "_blank",
              )
            }
            className="text-gray-400 hover:text-primary transition"
            title="Download Invoice"
          >
            <Download size={16} />
          </button>
          <button
            className="text-gray-400 hover:text-primary transition"
            title="Email"
          >
            <Mail size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Orders Management
      </h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-64 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition"
          />

          <div className="flex items-center gap-2 flex-wrap">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${activeTab === tab ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <GbTable columns={columns} data={paginated} />
        <GbPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Order Detail Modal */}
      <GbModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title="Order Management"
      >
        {selectedOrder && (
          <div className="flex flex-col gap-3 text-sm">
            {[
              { label: "Order ID", value: selectedOrder.orderId },
              { label: "User name", value: selectedOrder.user },
              { label: "Details", value: selectedOrder.details },
              { label: "Total Cost", value: `$${selectedOrder.total}` },
              { label: "Order date", value: selectedOrder.date },
              { label: "Total Items", value: selectedOrder.items },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center border-b border-gray-50 pb-2"
              >
                <span className="text-gray-400">{item.label}</span>
                <span className="text-gray-700 font-medium">{item.value}</span>
              </div>
            ))}

            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className="text-gray-400">Status</span>
              <span
                className={`font-medium capitalize ${statusColors[selectedOrder.status]}`}
              >
                {selectedOrder.status}
              </span>
            </div>

            {/* Change Status dropdown */}
            <div className="relative mt-1">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:border-primary transition"
              >
                {selectedStatus || "Change Status"}
                <span className="text-xs">▾</span>
              </button>
              {showDropdown && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedStatus(s);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedStatus && (
              <button
                onClick={() => {
                  console.log("update status:", selectedStatus);
                  setSelectedOrder(null);
                }}
                className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg text-sm font-medium transition"
              >
                Update Status
              </button>
            )}
          </div>
        )}
      </GbModal>
    </div>
  );
};

export default OrdersPage;
