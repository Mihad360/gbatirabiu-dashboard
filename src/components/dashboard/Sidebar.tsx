"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Wrench,
  Tag,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Services", href: "/services", icon: Wrench },
  { label: "Product Items", href: "/product-items", icon: Tag },
  { label: "Content & FAQ", href: "/content", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    // TODO: dispatch logout — clear token from cookie/localStorage
    window.location.href = "/login";
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-55 bg-[#1a1a2e] flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
          <span className="text-white text-xs font-bold">E</span>
        </div>
        <span className="text-white font-semibold text-sm">
          E-Laundry Admin
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-primary text-white font-medium"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors w-full"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
