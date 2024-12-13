import { Link } from "react-router-dom";
import { ToggleButton } from "../context/ThemeToggle";
import toast from "react-hot-toast";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    toast.success("you are lost!!!");
  }, []);
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="relative w-64 h-64 mb-8">
        <div className="absolute inset-0 rounded-full bg-gray-800 dark:bg-black shadow-[0_0_50px_rgba(0,0,0,0.3)] dark:shadow-[0_0_50px_rgba(0,0,0,0.7)] animate-pulse">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-30 dark:opacity-50 animate-spin"></div>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4"> Page Not Found</h1>
      <p className="text-lg mb-8">
        Looks like this page got sucked into a black hole...
      </p>
      <ToggleButton />
      <Link
        to="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors dark:bg-purple-200 dark:hover:bg-purple-500 dark:text-gray-900"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
