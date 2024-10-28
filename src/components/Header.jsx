import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !event.target.closest("[data-nav-menu]") &&
        !event.target.closest("[data-nav-toggle]")
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMenuToggle = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
    // Reset animating state after animation completes
    setTimeout(() => setIsAnimating(false), 300);
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/calculator", label: "Calculator" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white border-b border-black/10 z-40 transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-[968px] mx-auto px-6 flex justify-between items-center h-12 lg:h-14">
        <Link to="/" className="text-base lg:text-lg font-medium leading-[0.9]">
          Dr Hayday
        </Link>
        <button
          data-nav-toggle
          className="lg:hidden relative w-5 h-4 flex flex-col justify-between"
          onClick={handleMenuToggle}
          aria-label="toggle menu"
        >
          <span
            className={`w-full h-[1px] bg-black transition-all duration-300 origin-left ${
              isOpen ? "rotate-45 translate-x-[1px] translate-y-[0.5px]" : ""
            }`}
          />
          <span
            className={`w-full h-[1px] bg-black transition-all duration-300 ${
              isOpen ? "opacity-0 -translate-x-full" : ""
            }`}
          />
          <span
            className={`w-full h-[1px] bg-black transition-all duration-300 origin-left ${
              isOpen ? "-rotate-45 translate-x-[1px] -translate-y-[0.5px]" : ""
            }`}
          />
        </button>
        <nav
          data-nav-menu
          className={`
            lg:block
            ${isOpen || isAnimating ? "block" : "hidden"}
            absolute lg:relative
            top-full lg:top-auto
            left-0 lg:left-auto
            w-full lg:w-auto
            bg-white lg:bg-transparent
            border-b lg:border-none
            border-black/10
            transition-all duration-300
            transform origin-top
            ${
              isOpen
                ? "translate-y-0 opacity-100 scale-y-100"
                : "-translate-y-4 opacity-0 scale-y-0 lg:translate-y-0 lg:opacity-100 lg:scale-y-100"
            }
          `}
        >
          <ul 
            className={`
              lg:flex lg:items-center py-4 lg:py-0 px-6 lg:px-0 space-y-3 lg:space-y-0 lg:space-x-6
              transition-all duration-300
              ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 lg:translate-y-0 lg:opacity-100"}
            `}
          >
            {navItems.map((item) => (
              <li 
                key={item.to}
                className="transform transition-transform duration -300 hover:-translate-y-0.5"
              >
                <Link
                  to={item.to}
                  className={`text-sm transition-colors duration-300 block lg:inline-block
                    ${location.pathname === item.to ? "text-[#ff6e40]" : "text-black"}
                    hover:text-[#ff6e40]`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;