"use client";

import { useState } from "react";
import { Eye, Download, Mail, X } from "lucide-react";
import GbTable from "@/forms/GBTable";

// ── dummy data ────────────────────────────────────────────────
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
    orderId: "ORD-001",
    user: "Alice Johnson",
    date: "2023-10-25",
    details: "Wash & Iron",
    items: 5,
    total: 25,
    status: "pending",
  },
  {
    _id: "3",
    orderId: "ORD-001",
    user: "Alice Johnson",
    date: "2023-10-25",
    details: "Wash & Iron",
    items: 5,
    total: 25,
    status: "pending",
  },
  {
    _id: "4",
    orderId: "ORD-001",
    user: "Alice Johnson",
    date: "2023-10-25",
    details: "Wash & Iron",
    items: 5,
    total: 25,
    status: "pending",
  },
];

const statusTabs = ["All", "Pending", "Processing", "Completed", "Canceled"];

const statusColors: Record<string, string> = {
  pending: "text-yellow-500",
  processing: "text-blue-500",
  completed: "text-green-500",
  cancelled: "text-red-500",
  delivered: "text-green-600",
};

type TOrder = (typeof dummyOrders)[0];

// ── Order Detail Modal ────────────────────────────────────────
const statusOptions = [
  "Picked Up",
  "Processing",
  "Completed",
  "Out for Delivery",
  "Delivered",
];

const OrderModal = ({
  order,
  onClose,
}: {
  order: TOrder;
  onClose: () => void;
}) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[400px] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-800">Order Management</h3>
          <button onClick={onClose} className="text-red-500 hover:text-red-600">
            <X size={18} />
          </button>
        </div>

        {/* Details */}
        <div className="px-6 py-4 flex flex-col gap-3 text-sm">
          {[
            { label: "Order ID", value: order.orderId },
            { label: "User name", value: order.user },
            { label: "Details", value: order.details },
            { label: "Total Cost", value: `$${order.total}` },
            { label: "Order date", value: order.date },
            { label: "Total Items", value: order.items },
          ].map((item) => (
            <div key={item.label} className="flex justify-between">
              <span className="text-gray-400">{item.label}</span>
              <span className="text-gray-700 font-medium">{item.value}</span>
            </div>
          ))}

          {/* Status row */}
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Status</span>
            <span className="text-yellow-500 font-medium capitalize">
              {order.status}
            </span>
          </div>

          {/* Change Status dropdown */}
          <div className="relative mt-2">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:border-primary transition"
            >
              {selectedStatus || "Change Status"}
              <span>▾</span>
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

          {/* Save button */}
          {selectedStatus && (
            <button className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-medium mt-1 hover:bg-primary-dark transition">
              Update Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Orders Page ──────────────────────────────────────────
const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

  const filtered = dummyOrders.filter((o) => {
    const matchTab =
      activeTab === "All" || o.status.toLowerCase() === activeTab.toLowerCase();
    const matchSearch =
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.user.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

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
            onClick={() => setSelectedOrder(row)}
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
        {/* Search + Filter Tabs */}
        <div className="flex items-center justify-between mb-5 gap-4">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          {/* Status tabs */}
          <div className="flex items-center gap-2">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <GbTable columns={columns} data={filtered} />

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              className={`w-8 h-8 rounded-full text-sm font-medium transition ${
                p === 1
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
          <button className="w-8 h-8 rounded-full bg-gray-800 text-white text-sm flex items-center justify-center">
            →
          </button>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
