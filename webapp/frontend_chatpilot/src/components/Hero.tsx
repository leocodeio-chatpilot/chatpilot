import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { MichiBot } from "./canvas/MichiBot";
import CanvasLoader from "./Loader";

const Hero = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-start sm:justify-center items-center">
      <div className="mt-[80px] xs:mt-[100px] sm:mt-[200px] sm:mb-[-200px]">
        <div className="px-4 xs:px-6 sm:px-16 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5">
          <div className="flex flex-col justify-center items-center mt-3 sm:mt-5">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#915EFF]" />
            <div className="w-1 h-24 xs:h-32 sm:h-80 violet-gradient" />
          </div>

          <div className="text-center sm:text-left">
            <h1 className="font-black text-white dark:text-black text-[28px] xs:text-[40px] sm:text-[60px] lg:text-[80px] lg:leading-[98px] mt-2">
              Chat<span className="text-[#915EFF]">Pilot</span>
            </h1>
            <p className="text-[14px] xs:text-[18px] sm:text-[26px] lg:text-[30px] text-white dark:text-black mt-2">
              Make your website talk!
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[350px] xs:h-[400px] sm:h-[550px] mt-4 sm:mt-0">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 45,
            near: 0.1,
            far: 200,
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
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
    </section>
  );
};

export default Hero;
