import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MichiBot } from "./canvas/MichiBot";
import { styles } from "./styles";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto px-6 sm:px-16 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div className="text-center sm:text-left">
          <h1 className="font-black text-white dark:text-black text-[40px] xs:text-[50px] sm:text-[60px] lg:text-[80px] lg:leading-[98px] mt-2">
            Chat<span className="text-[#915EFF]">Pilot</span>
          </h1>
          <p className="text-[16px] xs:text-[20px] sm:text-[26px] lg:text-[30px] text-white dark:text-black mt-2">
            Make your website talk!
          </p>
        </div>
      </div>
      
      <div className="w-full flex justify-end items-end">
        <div className="w-full h-[300px] sm:h-[550px]">
          <Canvas
            camera={{
              position: [0, 0, 5],
              fov: 45,
              near: 0.1,
              far: 200,
            }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[0, 0, 5]} intensity={1} />
              <OrbitControls
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
              <MichiBot isMobile={window.innerWidth <= 500} />
            </Suspense>
          </Canvas>
        </div>
      </div>
      
      <div className="absolute bottom-10 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
