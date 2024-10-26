import "./App.css";
import { CiLink } from "react-icons/ci";

function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-black gap-1">
      <p className="text-sm text-white">
        Say this is the website say wikipidia of
      </p>
      <p className="font-bold text-white inline">ReactJs</p>
      <a href="https://en.wikipedia.org/wiki/React_(JavaScript_library)">
        <CiLink  className="text-blue-500 inline ml-1" size={25} />
      </a>
    </div>
  );
}

export default App;
