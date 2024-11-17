import "./App.css";
import { Hero, Navbar } from "./components";

function App() {
  return (
    <>
      <div className="bg-hero-bg bg-cover bg-no-repeat bg-center dark:bg-hero-bg-light">
        <Navbar />
        <Hero />
      </div>
      
    </>
  );
}

export default App;
