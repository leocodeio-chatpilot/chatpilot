import "./App.css";
import { CiLink } from "react-icons/ci";
import Header from "./components/Header";

function App() {
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      <Header />
        <p className="text-sm text-white">
          Say this is the wikipedia page of
        </p>
        <p className="font-bold text-white inline">ReactJs</p>
        <a href="https://en.wikipedia.org/wiki/React_(JavaScript_library)">
          <CiLink className="text-blue-500 inline ml-1" size={25} />
        </a>
    </div>
  );
}

export default App;
