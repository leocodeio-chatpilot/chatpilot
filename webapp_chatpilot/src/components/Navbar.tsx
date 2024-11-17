import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "./styles";
import { navLinks } from "../constants";
import {
  lightLogo,
  darkLogo,
  menu,
  close,
  logoNamedDark,
  logoNamedLight,
} from "../assets";
import { ToggleButton } from "../context/ThemeToggle";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary dark:bg-gray-300" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <div
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="cursor-pointer flex items-center justify-center">
            <img
              src={logoNamedLight}
              alt="logo"
              className="w-48 h-12 object-contain hidden sm:block dark:hidden"
            />
            <img
              src={logoNamedDark}
              alt="logo"
              className="w-48 h-12 object-contain block sm:hidden dark:block"
            />
          </div>
          <img
            src={lightLogo}
            alt="logo"
            className="w-9 h-9 object-contain dark:hidden hover:scale-105 transition-all duration-300 ease-in-out"
          />
          <img
            src={darkLogo}
            alt="logo"
            className="w-9 h-9 object-contain hidden dark:block"
          />
          <Link
            to="https://github.com/leocodeio"
            className="text-white text-[18px] font-bold  py-2 sm:block hidden dark:text-black hover:text-gray-400 hover:ease-in-out dark:hover:text-gray-800"
          >
            | @leocodeio
          </Link>
        </div>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title
                  ? "text-white dark:text-secondary"
                  : "text-secondary dark:text-black"
              } hover:text-white text-[18px] font-medium cursor-pointer dark:hover:text-gray-700`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <ToggleButton />
        </ul>

        <div className="sm:hidden flex gap-4 items-center justify-end">
          <ToggleButton />
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title
                      ? "text-white dark:text-secondary"
                      : "text-secondary dark:text-black"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
