/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { navItems } from "../navbar/Navconfig";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("accessToken");
    router.push("/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-[220px] bg-white border-r border-gray-100 flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-sm">
          💧
        </div>
        <span className="text-gray-800 font-bold text-sm">E-Laundry Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item: any) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150
                ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-gray-500 hover:text-primary hover:bg-primary/5"
                }
              `}
            >
              <Icon
                size={17}
                className={
                  isActive
                    ? "text-primary"
                    : "text-gray-400 group-hover:text-primary"
                }
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150 w-full"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
