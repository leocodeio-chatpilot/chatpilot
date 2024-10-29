import { FiHome } from "react-icons/fi";

export default function Header() {
  return (
    <header className="fixed top-0 custom-shadow w-full bg-white text-black p-6 flex justify-between items-center shadow-lg rounded-md">
      <a to="/home">
        <h1 className="text-2xl font-bold">Chatpilot</h1>
      </a>
      <a to="/home" className="text-black hover:text-gray-400">
        <FiHome size={24} />
      </a>
    </header>
  );
}
