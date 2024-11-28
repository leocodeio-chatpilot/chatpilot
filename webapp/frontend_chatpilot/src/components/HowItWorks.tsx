import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { slideIn } from "./utils/motion";

const HowItWorks = () => {
  return (
    <section
      id="howitworks"
      className="relative w-full h-screen mx-auto overflow-hidden bg-gradient-to-b from-[#13111C] via-[#1F1B3C] to-[#13111C] dark:from-white dark:via-purple-10 dark:to-white"
    >
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

      <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-8">
        <motion.div
          variants={slideIn("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          className="flex flex-col items-center max-w-4xl text-center z-10 space-y-8"
        >
          <h2 className="text-[3rem] sm:text-[4rem] font-bold bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800 bg-clip-text text-transparent">
            How It Works
          </h2>

          <motion.p
            className="text-[1.2rem] sm:text-[1.4rem] text-gray-200 dark:text-gray-800 leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            ChatPilot uses advanced AI to understand your website's content and
            provide intelligent responses to visitor queries. Simply integrate
            our widget and let AI handle customer support 24/7.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link
              to="/docs"
              className="px-8 py-4 rounded-xl bg-purple-600 text-white font-bold
              hover:bg-purple-700 transition-all duration-300 text-center
              min-w-[200px] transform hover:scale-105 hover:shadow-lg
              hover:shadow-purple-500/25 dark:shadow-purple-300/30"
            >
              View Docs
            </Link>
            <Link
              to="/try"
              className="px-8 py-4 rounded-xl bg-transparent text-white dark:text-purple-800 
              font-bold border-2 border-purple-600 hover:bg-purple-600 hover:text-white
              transition-all duration-300 text-center min-w-[200px] transform hover:scale-105
              hover:shadow-lg hover:shadow-purple-500/25 dark:hover:border-purple-700 
              dark:hover:bg-purple-700 dark:hover:text-white"
            >
              Try It Out
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
