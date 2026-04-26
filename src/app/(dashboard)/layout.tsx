// src/app/(dashboard)/layout.tsx
"use client";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 ml-55">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
