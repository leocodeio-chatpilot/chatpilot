import "./App.css";
import { Contact, Hero, Navbar, StarsCanvas } from "./components";

function Entry() {
  return (
    <div className="w-screen h-screen">
      <div className="h-full w-full bg-hero-bg bg-cover bg-no-repeat bg-center dark:bg-hero-bg-light">
        <Navbar />
        <Hero />
        <div className="w-full relative h-[1000px] z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </div>
  );
}

export default Entry;
