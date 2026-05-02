import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Tag,
  FileText,
  Settings,
  Wrench,
} from "lucide-react";

export type TNavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export const navItems: TNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Services", href: "/services", icon: Wrench },
  { label: "Product Items", href: "/product-items", icon: Tag },
  { label: "Content & FAQ", href: "/content", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
];
