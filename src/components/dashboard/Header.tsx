"use client";

import { usePathname } from "next/navigation";

// map routes to page titles — matching Figma "Admin Portal" header
const pageTitles: Record<string, string> = {
  "/dashboard": "Admin Portal",
  "/clients": "Admin Portal",
  "/orders": "Admin Portal",
  "/services": "Admin Portal",
  "/product-items": "Admin Portal",
  "/content": "Admin Portal",
  "/settings": "Admin Portal",
};

const Header = () => {
  const pathname = usePathname();

  // get base path for title lookup
  const basePath = "/" + pathname.split("/")[1];
  const title = pageTitles[basePath] || "Admin Portal";

  return (
    <header className="h-15 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Page title */}
      <h1 className="text-base font-semibold text-gray-700">{title}</h1>

      {/* Admin info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">Admin User</p>
          <p className="text-xs text-gray-400">owner@elaundry.com</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
          AD
        </div>
      </div>
    </header>
  );
};

export default Header;
