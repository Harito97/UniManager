import React from "react";
import HusLogo from "../assets/hus-logo.svg";

const DesktopMenus = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "About",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
  {
    name: "Login",
    href: "#",
  },
];

const NavBar = ({ toggleLoginPopup }) => {
  return (
    <header className="fixed top-0 z-30 w-full bg-white/80 shadow-lg backdrop-blur-sm dark:bg-black/30">
      <div className="container">
        <nav className="flex items-center justify-between">
          <a
            href="#"
            className="text-3xl font-bold text-gray-800 dark:text-white"
          >
            <img src={HusLogo} alt="Logo" className="mr-1 inline h-10" />
            HUS
          </a>
          {/* Desktop Menu */}
          <div className="hidden sm:block">
            <ul className="flex items-center justify-center gap-4">
              {DesktopMenus.map((menu) => (
                <li>
                  <a
                    href={menu.href}
                    onClick={() => {
                      if (menu.name === "Login") {
                        toggleLoginPopup(true);
                      }
                    }}
                    className="inline-block select-none px-4 py-4 text-gray-700 hover:text-gray-900  dark:text-white"
                  >
                    {menu.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu */}
          <div className="block sm:hidden">
            <ul>
              <li>
                <a
                  href="#"
                  className="inline-block select-none px-4 py-4 text-xl font-semibold text-gray-700 hover:text-gray-900 dark:text-white"
                  onClick={() => {
                    toggleLoginPopup(true);
                  }}
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
