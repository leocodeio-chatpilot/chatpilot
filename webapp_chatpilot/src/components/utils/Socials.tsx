import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Socials = () => {
  return (
    <div className="social-icons flex gap-6">
      <a
        href="https://www.linkedin.com/in/sai-harsha-vardhan-pittada-8a9a74252/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex justify-center items-center w-12 h-12 bg-transparent border-3 border-white dark:border-secondary text-2xl rounded-full 
        text-white dark:text-black
        transition-all duration-300 ease-in-out
        hover:scale-125 hover:-translate-y-1 hover:bg-gray-800 dark:hover:bg-white
        hover:shadow-[0_0_25px_#b23deb] dark:hover:shadow-[0_0_25px_#b23deb] hover:border-secondary"
      >
        <FaLinkedin className="text-white dark:text-secondary" />
      </a>
      <a
        href="https://github.com/leocodeio"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex justify-center items-center w-12 h-12 bg-transparent border-3 border-white dark:border-secondary text-2xl rounded-full 
        text-white dark:text-black
        transition-all duration-300 ease-in-out
        hover:scale-125 hover:-translate-y-1 hover:bg-gray-800 dark:hover:bg-white
        hover:shadow-[0_0_25px_#b23deb] dark:hover:shadow-[0_0_25px_#b23deb] hover:border-secondary"
      >
        <FaGithub className="text-white dark:text-secondary" />
      </a>
      <a
        href="https://x.com/leocodeio"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex justify-center items-center w-12 h-12 bg-transparent border-3 border-white dark:border-secondary text-2xl rounded-full 
        text-white dark:text-black
        transition-all duration-300 ease-in-out
        hover:scale-125 hover:-translate-y-1 hover:bg-gray-800 dark:hover:bg-white
        hover:shadow-[0_0_25px_#b23deb] dark:hover:shadow-[0_0_25px_#b23deb] hover:border-secondary"
      >
        <FaTwitter className="text-white dark:text-secondary" />
      </a>
      <a
        href="https://www.instagram.com/leocodeio"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex justify-center items-center w-12 h-12 bg-transparent border-3 border-white dark:border-secondary text-2xl rounded-full 
        text-white dark:text-black
        transition-all duration-300 ease-in-out
        hover:scale-125 hover:-translate-y-1 hover:bg-gray-800 dark:hover:bg-white
        hover:shadow-[0_0_25px_#b23deb] dark:hover:shadow-[0_0_25px_#b23deb] hover:border-secondary"
      >
        <FaInstagram className="text-white dark:text-secondary" />
      </a>
      <a
        href="https://www.youtube.com/@leocodeio"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex justify-center items-center w-12 h-12 bg-transparent border-3 border-white dark:border-secondary text-2xl rounded-full 
        text-white dark:text-black
        transition-all duration-300 ease-in-out
        hover:scale-125 hover:-translate-y-1 hover:bg-gray-800 dark:hover:bg-white
        hover:shadow-[0_0_25px_#b23deb] dark:hover:shadow-[0_0_25px_#b23deb] hover:border-secondary"
      >
        <FaYoutube className="text-white dark:text-secondary" />
      </a>
    </div>
  );
};

export default Socials;