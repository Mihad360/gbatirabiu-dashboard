"use client";

import { useState } from "react";
import { Search, ShieldOff, ShieldCheck } from "lucide-react";
import GbPagination from "@/forms/GBPagination";
import GbTable from "@/forms/GBTable";

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
  {
    _id: "6",
    name: "Eve Adams",
    email: "eve.a@example.com",
    phone: "+1 333 444 5555",
    orderCount: 2,
    isActive: true,
  },
  {
    _id: "7",
    name: "Eve Adams",
    email: "eve.a@example.com",
    phone: "+1 333 444 5555",
    orderCount: 2,
    isActive: true,
  },
];

type TClient = (typeof dummyClients)[0];

const ITEMS_PER_PAGE = 5;

const ClientsPage = () => {
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState(dummyClients);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
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
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
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
          <span className="flex items-center gap-1.5">
            <span className="text-xs">✉</span> {row.email}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-xs">📞</span> {row.phone}
          </span>
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
          className={`px-3 py-1 rounded-full text-xs font-medium ${row.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}
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
          className={`flex items-center gap-1.5 text-sm font-medium transition ${row.isActive ? "text-red-500 hover:text-red-600" : "text-green-500 hover:text-green-600"}`}
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
        <div className="relative mb-5 w-full max-w-md">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search clients by name, email or phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition"
          />
        </div>

        <GbTable columns={columns} data={paginated} />
        <GbPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ClientsPage;
