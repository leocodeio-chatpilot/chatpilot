import React, {
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
      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggleProvider;
