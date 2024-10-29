import React, { useState, useEffect, createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { HamburgerMenuIcon, ChevronDownIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Types
type Theme = "dark" | "light" | "system";
type NavItem = {
  name: string;
  to?: string;
  subItems?: Array<{ name: string; to: string }>;
};

// Theme Context
const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "system",
  setTheme: () => null,
});

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

// Navigation Data
const NAV_ITEMS: NavItem[] = [
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
  {
    name: "Calculators",
    subItems: [
      { name: "Barn Size Calculator", to: "/barnsizecalculator" },
      { name: "XP Calculator", to: "/xpcalculator" },
    ],
  },
];

// Theme Toggle Component
const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {["light", "dark", "system"].map((t) => (
          <DropdownMenuItem key={t} onClick={() => setTheme(t as Theme)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Mobile Navigation Item Component
const MobileNavItem: React.FC<{
  item: NavItem;
  isActive: (to: string) => boolean;
  onSelect: () => void;
}> = ({ item, isActive, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!item.subItems) {
    return (
      <Link
        to={item.to!}
        onClick={onSelect}
        className={cn(
          "block px-6 py-2.5 text-[15px] rounded-md transition-colors",
          isActive(item.to!) 
            ? "bg-accent text-accent-foreground font-semibold"
            : "hover:bg-accent/50"
        )}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div className="w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`${item.name}-submenu`}
        className={cn(
          "flex w-full items-center justify-between py-2.5 px-6 text-[15px] transition-colors hover:bg-accent/50 rounded-md",
          item.subItems.some(subItem => isActive(subItem.to)) && 
          "bg-accent text-accent-foreground font-semibold"
        )}
      >
        <span>{item.name}</span>
        <ChevronDownIcon className={cn("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-180")} />
      </button>
      <div 
        id={`${item.name}-submenu`}
        className={cn(
          "overflow-hidden transition-all duration-200 pl-4",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {item.subItems.map((subItem) => (
          <Link
            key={subItem.name}
            to={subItem.to}
            onClick={onSelect}
            className={cn(
              "block px-6 py-2.5 text-[14px] rounded-md transition-colors",
              isActive(subItem.to)
                ? "bg-accent text-accent-foreground font-semibold"
                : "hover:bg-accent/50"
            )}
          >
            {subItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem("vite-ui-theme") as Theme) || "system";
  });

  const updateTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const activeTheme = newTheme === 'system' ? systemTheme : newTheme;

    root.classList.remove('light', 'dark');
    root.classList.add(activeTheme);
    root.setAttribute('data-theme', activeTheme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]') ||
      Object.assign(document.createElement('meta'), { name: 'theme-color' });
    metaThemeColor.content = activeTheme === 'dark' ? '#000000' : '#ffffff';
    if (!metaThemeColor.parentNode) document.head.appendChild(metaThemeColor);
  };

  useEffect(() => {
    updateTheme(theme);
    localStorage.setItem("vite-ui-theme", theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => updateTheme('system');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const isLinkActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="text-lg font-semibold">
              Dr Hayday
            </Link>

            <div className="hidden md:flex md:items-center flex-1 justify-end">
              <div className="flex items-center space-x-4">
                {NAV_ITEMS.map((item) =>
                  item.subItems ? (
                    <div key={item.name} className="relative dropdown-container">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        aria-expanded={activeDropdown === item.name}
                        aria-controls={`${item.name}-dropdown`}
                        className={cn(
                          "px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent inline-flex items-center gap-1",
                          (item.subItems.some(sub => isLinkActive(sub.to)) || activeDropdown === item.name) && 
                          "bg-accent text-accent-foreground font-semibold"
                        )}
                      >
                        {item.name}
                        <ChevronDownIcon className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          activeDropdown === item.name && "rotate-180"
                        )} />
                      </button>
                      {activeDropdown === item.name && (
                        <div 
                          id={`${item.name}-dropdown`}
                          className="absolute left-0 top-full w-48 pt-2"
                        >
                          <div className="bg-popover rounded-md shadow-md border p-2">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.to}
                                onClick={() => setActiveDropdown(null)}
                                className={cn(
                                  "block w-full rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                                  isLinkActive(subItem.to) &&
                                  "bg-accent text-accent-foreground font-semibold"
                                )}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.to!}
                      className={cn(
                        "px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent",
                        isLinkActive(item.to!) && "bg-accent text-accent-foreground font-semibold"
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>

              <div className="ml-8">
                <ModeToggle />
              </div>
            </div>

            <div className="flex md:hidden items-center space-x-2">
              <ModeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    aria-label="Open navigation menu"
                  >
                    <HamburgerMenuIcon className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                  <SheetHeader className="px-6 py-4 border-b">
                    <SheetTitle>Navigation</SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-auto py-4">
                    {NAV_ITEMS.map((item) => (
                      <MobileNavItem
                        key={item.name}
                        item={item}
                        isActive={isLinkActive}
                        onSelect={() => setIsOpen(false)}
                      />
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </ThemeContext.Provider>
  );
};

export default Navbar;