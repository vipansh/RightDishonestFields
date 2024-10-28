import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const NavLink = ({ item, isMobile, onClick, openSubMenus, toggleSubMenu }) => {
  const location = useLocation();

  const isLinkActive = (to) => {
    if (to === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(to);
  };

  const isItemActive = () => {
    if (item.subItems) {
      return item.subItems.some(subItem => isLinkActive(subItem.to));
    }
    return isLinkActive(item.to);
  };

  if (item.subItems) {
    if (isMobile) {
      return (
        <div className="relative">
          <div
            className={cn(
              "flex items-center justify-between px-3 py-2 text-base font-medium cursor-pointer transition-colors",
              isItemActive() ? "text-primary" : "text-gray-700 dark:text-gray-300"
            )}
            onClick={() => toggleSubMenu(item.name)}
          >
            <span>{item.name}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                openSubMenus[item.name] ? "rotate-180" : ""
              }`}
            />
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openSubMenus[item.name] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pl-6 space-y-1 py-2">
              {item.subItems.map((subItem) => (
                <Link
                  key={subItem.name}
                  to={subItem.to}
                  className={cn(
                    "block px-3 py-2 text-sm rounded-md transition-colors",
                    isLinkActive(subItem.to)
                      ? "text-primary font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                  onClick={onClick}
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                "px-3",
                isItemActive() && "text-primary font-semibold"
              )}
            >
              {item.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-48 p-2 bg-popover">
                {item.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={subItem.to}
                        className={cn(
                          "block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isLinkActive(subItem.to) && "bg-accent"
                        )}
                        onClick={onClick}
                      >
                        {subItem.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  const linkClass = isMobile
    ? cn(
        "block px-3 py-2 text-base font-medium rounded-md transition-colors",
        isItemActive()
          ? "text-primary"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
      )
    : cn(
        navigationMenuTriggerStyle(),
        "px-3",
        isItemActive() && "text-primary font-semibold"
      );

  return (
    <Link to={item.to} className={linkClass} onClick={onClick}>
      {item.name}
    </Link>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      return JSON.parse(stored);
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [openSubMenus, setOpenSubMenus] = useState({});
  const menuRef = useRef(null);

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
    const currentPath = location.pathname;
    const updatedOpenSubMenus = {};

    navItems.forEach((item) => {
      if (item.subItems) {
        const isSubItemActive = item.subItems.some((subItem) =>
          currentPath.startsWith(subItem.to)
        );
        if (isSubItemActive) {
          updatedOpenSubMenus[item.name] = true;
        }
      }
    });

    setOpenSubMenus(updatedOpenSubMenus);
  }, [location.pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const storedPreference = localStorage.getItem("darkMode");
      if (storedPreference === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const toggleSubMenu = (itemName) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              Dr Hayday
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8 flex-1 justify-end">
            <div className="mr-4 flex items-center space-x-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  item={item}
                  isMobile={false}
                  onClick={handleLinkClick}
                />
              ))}
            </div>

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
              <span className="sr-only">Toggle theme</span>
            </Button>
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
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-1" ref={menuRef}>
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                item={item}
                isMobile={true}
                onClick={handleLinkClick}
                openSubMenus={openSubMenus}
                toggleSubMenu={toggleSubMenu}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;