import "./App.css";
import { Contact, Hero, Navbar, StarsCanvas } from "./components";
import Pricing from "./components/Pricing";
import HowItWorks from "./components/HowItWorks";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Entry() {
  useEffect(() => {
    toast.success("welcome to chatpilot");
  }, []);

  return (
    <div className="w-screen h-screen">
      <div className="h-full w-full bg-hero-bg bg-cover bg-no-repeat bg-center dark:bg-hero-bg-light">
        <Navbar />
        <Hero />
        <HowItWorks />
        <div className="w-full relative h-auto z-0">
          <Contact />
          <StarsCanvas />
        </div>
        <Pricing />
      </div>
    </div>
  );
}

export default Entry;
