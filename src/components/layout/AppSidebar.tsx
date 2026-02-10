import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BarChart3, ShieldCheck, Settings, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Campaign Health", path: "/", icon: BarChart3 },
  { label: "Brand Safety", path: "/brand-safety", icon: ShieldCheck },
  { label: "Settings", path: "/settings", icon: Settings },
  { label: "Resources", path: "/resources", icon: BookOpen },
];

interface AppSidebarProps {
  collapsed: boolean;
}

export function AppSidebar({ collapsed }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/" || location.pathname.startsWith("/campaign");
    return location.pathname.startsWith(path);
  };

  const expanded = !collapsed || hovered;

  return (
    <aside
      onMouseEnter={() => collapsed && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "flex-shrink-0 bg-white border-r border-neutral-100 flex flex-col transition-all duration-200 ease-out overflow-hidden",
        expanded ? "w-56" : "w-16"
      )}
    >
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              title={!expanded ? item.label : undefined}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg transition-colors duration-200",
                expanded ? "px-3 py-2.5" : "justify-center px-0 py-2.5",
                active
                  ? "bg-plum-50 text-plum-700"
                  : "text-cool-600 hover:text-cool-900 hover:bg-neutral-50"
              )}
            >
              <Icon className={cn("h-5 w-5 flex-shrink-0", active && "text-plum-600")} />
              {expanded && (
                <span className="text-body3 font-medium truncate whitespace-nowrap">{item.label}</span>
              )}
              {expanded && active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-plum-500 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
