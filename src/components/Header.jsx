import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showMenu &&
                !event.target.closest("[data-nav-menu]") &&
                !event.target.closest("[data-nav-toggle]")
            ) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [showMenu]);

    return (
        <header className="w-full fixed bottom-0 left-0 z-[1000] bg-[hsl(152,60%,99%)] shadow-[0_-1px_4px_rgba(0,0,0,0.15)] md:top-0 md:bottom-auto md:px-4">
            <nav className="h-10 flex justify-between items-center max-w-[768px] mx-6 md:h-16 md:mx-auto lg:max-w-[968px]">
                <Link
                    to="/"
                    className="text-[hsl(152,8%,15%)] font-medium hover:text-[hsl(152,65%,55%)]"
                >
                    Dr Hayday
                </Link>

                <div
                    data-nav-menu
                    className={`fixed left-0 w-full bg-[hsl(152,60%,99%)] px-6 pt-8 pb-16 
                    shadow-[0_-1px_4px_rgba(0,0,0,0.15)] rounded-t-[1.5rem] transition-all duration-300 ease-in-out
                    md:static md:w-auto md:p-0 md:shadow-none md:ml-auto md:rounded-none md:bg-transparent
                    ${showMenu ? "bottom-0" : "bottom-[-100%]"}`}
                >
                    <ul className="grid grid-cols-3 gap-8 md:flex md:gap-8">
                        <li>
                            <Link
                                to="/"
                                className={`flex flex-col items-center text-sm font-medium 
                                hover:text-[hsl(152,65%,55%)] ${location.pathname === "/" ? "text-[hsl(152,65%,55%)]" : "text-[hsl(152,8%,15%)]"}`}
                                onClick={() => setShowMenu(false)}
                            >
                                <i className="uil uil-estate text-[1.2rem] mb-1 md:hidden"></i>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/products"
                                className={`flex flex-col items-center text-sm font-medium
                                hover:text-[hsl(152,65%,55%)] ${location.pathname === "/products" ? "text-[hsl(152,65%,55%)]" : "text-[hsl(152,8%,15%)]"}`}
                                onClick={() => setShowMenu(false)}
                            >
                                <i className="uil uil-store text-[1.2rem] mb-1 md:hidden"></i>
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/calculator"
                                className={`flex flex-col items-center text-sm font-medium
                                hover:text-[hsl(152,65%,55%)] ${location.pathname === "/calculator" ? "text-[hsl(152,65%,55%)]" : "text-[hsl(152,8%,15%)]"}`}
                                onClick={() => setShowMenu(false)}
                            >
                                <i className="uil uil-calculator text-[1.2rem] mb-1 md:hidden"></i>
                                Calculator
                            </Link>
                        </li>
                    </ul>

                    <button
                        className="absolute right-5 bottom-2 text-[hsl(152,65%,55%)] text-2xl cursor-pointer 
                        hover:text-[hsl(152,57%,50%)] md:hidden"
                        onClick={() => setShowMenu(false)}
                    >
                        <i className="uil uil-times"></i>
                    </button>
                </div>

                <button
                    data-nav-toggle
                    className="text-[hsl(152,8%,15%)] text-[1.1rem] cursor-pointer hover:text-[hsl(152,65%,55%)] md:hidden"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <i className="uil uil-apps"></i>
                </button>
            </nav>
        </header>
    );
}

export default Header;