import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const MobileNavItem = ({ item, isActive, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (item.subItems) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex w-full items-center justify-between py-2.5 px-6 text-[15px] transition-colors hover:bg-accent/50 rounded-md",
            item.subItems.some(subItem => isActive(subItem.to)) && 
            "bg-accent text-accent-foreground font-semibold"
          )}
        >
          <span>{item.name}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </button>
        <div
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
  }

  return (
    <Link
      to={item.to}
      onClick={onSelect}
      className={cn(
        "block px-6 py-2.5 text-[15px] rounded-md transition-colors",
        isActive(item.to)
          ? "bg-accent text-accent-foreground font-semibold"
          : "hover:bg-accent/50"
      )}
    >
      {item.name}
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false;
  });
  const location = useLocation();

  const navItems = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Products",
      to: "/products",
    },
    {
      name: "Calculators",
      subItems: [
        { name: "Barn Size Calculator", to: "/barnsizecalculator" },
        { name: "XP Calculator", to: "/xpcalculator" },
      ],
    },
  ];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const isLinkActive = (to) => {
    if (to === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(to);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target) return;
      const target = event.target;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="text-lg font-semibold">
            Dr Hayday
          </Link>

          <div className="hidden md:flex md:items-center flex-1 justify-end">
            <div className="flex items-center space-x-4">
              {navItems.map((item) =>
                item.subItems ? (
                  <div key={item.name} className="relative dropdown-container">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className={cn(
                        "px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent inline-flex items-center gap-1",
                        (item.subItems.some(sub => isLinkActive(sub.to)) || activeDropdown === item.name) && 
                        "bg-accent text-accent-foreground font-semibold"
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.name && "rotate-180"
                      )} />
                    </button>
                    <div className={cn(
                      "absolute left-0 top-full w-48 pt-2",
                      activeDropdown === item.name ? "block" : "hidden"
                    )}>
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
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={cn(
                      "px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent",
                      isLinkActive(item.to) && "bg-accent text-accent-foreground font-semibold"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            <div className="ml-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <SheetHeader className="px-6 py-4 border-b">
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-auto py-4">
                  {navItems.map((item) => (
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
  );
};

export default Navbar;