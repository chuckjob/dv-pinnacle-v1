import { cn } from "@/lib/utils";
import pinnacleLogo from "@/assets/pinnacle-logo.png";

interface TopHeaderProps {
  activeNav: string;
  onNavChange: (nav: string) => void;
}

const navItems = [
  { id: "settings", label: "Settings" },
  { id: "analytics", label: "Analytics" },
  { id: "proprietary-media-gardens", label: "Proprietary Media Gardens" },
  { id: "open-web", label: "Open Web" },
  { id: "resources", label: "Resources" },
];

export function TopHeader({ activeNav, onNavChange }: TopHeaderProps) {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Pinnacle Logo */}
      <img src={pinnacleLogo} alt="DV Pinnacle" className="h-7" />

      {/* Navigation - Right aligned */}
      <nav className="flex items-center gap-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={cn(
              "px-1 py-4 text-sm font-medium transition-colors border-b-2",
              activeNav === item.id
                ? "text-foreground border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
