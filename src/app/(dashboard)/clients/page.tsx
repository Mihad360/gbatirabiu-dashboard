"use client";

import { useState } from "react";
import { Search, ShieldOff, ShieldCheck } from "lucide-react";
import GbTable from "@/forms/GBTable";

// ── dummy data ────────────────────────────────────────────────
const dummyClients = [
  {
    _id: "1",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    phone: "+1 234 567 8900",
    orderCount: 12,
    isActive: true,
  },
  {
    _id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "+1 987 654 3210",
    orderCount: 5,
    isActive: true,
  },
  {
    _id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "+1 555 123 4567",
    orderCount: 0,
    isActive: false,
  },
  {
    _id: "4",
    name: "Diana Prince",
    email: "diana@example.com",
    phone: "+1 444 987 6543",
    orderCount: 24,
    isActive: true,
  },
  {
    _id: "5",
    name: "Eve Adams",
    email: "eve.a@example.com",
    phone: "+1 333 444 5555",
    orderCount: 2,
    isActive: true,
  },
];

type TClient = (typeof dummyClients)[0];

const ClientsPage = () => {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState(dummyClients);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );

  const toggleBlock = (id: string) => {
    setClients((prev) =>
      prev.map((c) => (c._id === id ? { ...c, isActive: !c.isActive } : c)),
    );
  };

  const columns = [
    {
      key: "name",
      title: "Client Name",
      render: (row: TClient) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
            {row.name.charAt(0)}
          </div>
          <span className="font-medium text-gray-700">{row.name}</span>
        </div>
      ),
    },
    {
      key: "contact",
      title: "Contact Info",
      render: (row: TClient) => (
        <div className="flex flex-col gap-0.5 text-sm text-gray-500">
          <span>✉ {row.email}</span>
          <span>📞 {row.phone}</span>
        </div>
      ),
    },
    {
      key: "orderCount",
      title: "Orders",
      render: (row: TClient) => (
        <span className="text-gray-700">{row.orderCount}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (row: TClient) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.isActive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-500"
          }`}
        >
          {row.isActive ? "Active" : "Blocked"}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (row: TClient) => (
        <button
          onClick={() => toggleBlock(row._id)}
          className={`flex items-center gap-1.5 text-sm font-medium transition ${
            row.isActive
              ? "text-red-500 hover:text-red-600"
              : "text-green-500 hover:text-green-600"
          }`}
        >
          {row.isActive ? (
            <>
              <ShieldOff size={14} /> Block
            </>
          ) : (
            <>
              <ShieldCheck size={14} /> Unblock
            </>
          )}
        </button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">Users</h2>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Search */}
        <div className="relative mb-4 w-full max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search clients by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
          />
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
    </div>
  );
};

export default ClientsPage;
