import { FaMoon, FaSun } from "react-icons/fa";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggleContext = createContext<ThemeContextType | undefined>(
  undefined
);

const ThemeToggleProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeToggleContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeToggleContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeToggleContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeToggleProvider");
  }
  return context;
};

export const ToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className=" h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 hover:ease-in-out dark:hover:ease-in-out"
    >
      {theme === "light" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggleProvider;
