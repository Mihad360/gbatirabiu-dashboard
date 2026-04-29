"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";

// ── dummy data ────────────────────────────────────────────────
const stats = [
  {
    label: "Total Clients",
    value: "1,248",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    label: "Active Orders",
    value: "84",
    icon: Clock,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
  },
  {
    label: "Completed Orders",
    value: "3,421",
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    label: "Canceled Orders",
    value: "42",
    icon: XCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-400",
  },
];

const revenueData = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 300 },
  { month: "Mar", value: 480 },
  { month: "Apr", value: 380 },
  { month: "May", value: 500 },
  { month: "Jun", value: 800 },
  { month: "Jul", value: 750 },
];

const recentActivity = [
  {
    name: "John Doe",
    action: "placed an order",
    service: "Wash & Iron",
    time: "2 hours ago",
    amount: "+$24.00",
  },
  {
    name: "John Doe",
    action: "placed an order",
    service: "Wash & Iron",
    time: "2 hours ago",
    amount: "+$24.00",
  },
  {
    name: "John Doe",
    action: "placed an order",
    service: "Wash & Iron",
    time: "2 hours ago",
    amount: "+$24.00",
  },
  {
    name: "John Doe",
    action: "placed an order",
    service: "Wash & Iron",
    time: "2 hours ago",
    amount: "+$24.00",
  },
  {
    name: "John Doe",
    action: "placed an order",
    service: "Wash & Iron",
    time: "2 hours ago",
    amount: "+$24.00",
  },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Overview</h2>
        <button className="flex items-center gap-2 text-sm text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition">
          <span>↗</span> Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-full ${stat.iconBg} flex items-center justify-center`}
                >
                  <Icon size={20} className={stat.iconColor} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart + Recent Activity */}
      <div className="grid grid-cols-5 gap-4">
        {/* Revenue Chart */}
        <div className="col-span-3 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Revenue & Orders Trend
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1A9FAA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1A9FAA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1A9FAA"
                strokeWidth={2.5}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Recent Activity
          </h3>
          <div className="flex flex-col gap-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    JD
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">{item.name}</span>{" "}
                      {item.action}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.service} • {item.time}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-sm text-primary mt-4 hover:underline">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
