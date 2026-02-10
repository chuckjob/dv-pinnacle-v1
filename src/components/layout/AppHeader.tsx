import { useState } from "react";
import { Menu, Search, Bell, Sparkles, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  onOpenVera: () => void;
  onToggleSidebar: () => void;
  veraOpen?: boolean;
}

export function AppHeader({ onOpenVera, onToggleSidebar, veraOpen }: AppHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll listener for shadow effect
  useState(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white border-b border-neutral-100 transition-shadow duration-200",
        isScrolled && "shadow-elevation-sticky"
      )}
    >
      <div className="h-16 px-4 flex items-center gap-4">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-cool-600 hover:text-cool-900 hover:bg-neutral-50 rounded-full"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-plum-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">DV</span>
            </div>
            <span className="text-h5 font-semibold text-cool-900">Pinnacle</span>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-cool-500" />
            <input
              type="text"
              placeholder="Search campaigns, metrics, insights..."
              className="w-full h-11 pl-10 pr-10 text-body3 bg-neutral-50 border border-neutral-200 rounded-full outline-none focus:bg-white focus:border-plum-300 focus:ring-2 focus:ring-plum-100 transition-all duration-200"
            />
            <button className="absolute right-3 p-1 text-cool-500 hover:text-cool-700 transition-colors" aria-label="Search filters">
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="plum"
            size="sm"
            onClick={onOpenVera}
            className={cn(
              "gap-2 font-medium rounded-lg",
              veraOpen && "bg-plum-700 hover:bg-plum-800"
            )}
          >
            <Sparkles className="h-4 w-4" />
            Ask Vera
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative w-9 h-9 text-cool-600 hover:text-cool-900 hover:bg-neutral-50"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tomato-500 rounded-full" />
          </Button>

          <button
            className="w-9 h-9 rounded-full bg-plum-100 flex items-center justify-center text-plum-700 text-label font-medium hover:bg-plum-200 transition-colors duration-200"
            aria-label="Account"
          >
            CJ
          </button>
        </div>
      </div>
    </header>
  );
}
