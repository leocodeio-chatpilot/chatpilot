import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { ToggleButton } from "../context/ThemeToggle";

const Try = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    alert("api created sucess fully, select the website from your profile");
    navigate("/profile");
    try {
    } catch (err: any) {
      console.error("something went wrong");
      throw err;
    }
  };

  return (
    <div className="relative w-full h-screen mx-auto overflow-hidden bg-gradient-to-b from-[#13111C] via-[#1F1B3C] to-[#13111C] dark:from-white dark:via-purple-10 dark:to-white">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute w-full h-full animate-gradient-y">
          <div className="absolute inset-0 opacity-30 bg-gradient-to-t from-purple-600/20 via-transparent to-purple-600/20 dark:from-purple-300/30 dark:to-purple-300/30" />
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
            animate={{
              y: [-20, -40, -20],
              x: i % 2 === 0 ? [-5, 5, -5] : [5, -5, 5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + (i % 2),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center min-h-[70vh]">
        <h1 className="text-[3rem] sm:text-[4rem] font-bold bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800 bg-clip-text text-transparent mb-8">
          Try ChatPilot
        </h1>
        <div className="flex justify-center items-center mb-8 gap-4">
          <Link
            to="/"
            className="text-white dark:text-black hover:text-secondary transition-colors"
          >
            <FaHome size={30} />
          </Link>
          <ToggleButton />
        </div>

        <div className="w-full max-w-xl bg-white/80 dark:bg-gray-800/70 p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Enter Website Details
            </h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Website Name"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <input
                  type="url"
                  placeholder="Website URL"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 
                  hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg 
                  transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg 
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                ChatPilot your website
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Try;
