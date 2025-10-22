import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Cursor from "./components/Cursor";
import PurpleCursor from "./components/PurpleCursor";
import ScrambleText from "./components/ScrambleText";
import ButtonNorm from "./components/ButtonNorm";
import Sidebar from "./components/Sidebar";

// Import logos
import javascriptLogo from "./assets/logos/javascript.svg";
import typescriptLogo from "./assets/logos/typescript.svg";
import reactLogo from "./assets/logos/react.svg";
import tailwindLogo from "./assets/logos/tailwindcss.svg";
import framerLogo from "./assets/logos/framer.svg";
import pythonLogo from "./assets/logos/python.svg";
import luaLogo from "./assets/logos/lua.svg";

// Import character images
import foregroundImg from "./assets/foreground.PNG";
import diamImg from "./assets/diam.PNG";
import mainImg from "./assets/main.PNG";
import backgroundImg from "./assets/background.PNG";

// Logo Item Component
const LogoItem = ({ src, name }: { src: string; name: string }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 group cursor-pointer"
      whileHover={{ scale: 1.15, y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className="relative w-16 h-16 flex items-center justify-center"
        whileHover={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={src}
          alt={name}
          className="w-full h-full object-contain"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </motion.div>
      <motion.span
        className="text-white text-sm font-medium"
        initial={{ opacity: 1 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};

function App() {
  const [selected, setSelected] = useState<"education" | "work">("education");
  const [eduTrigger, setEduTrigger] = useState(0);
  const [workTrigger, setWorkTrigger] = useState(0);

  useEffect(() => {
    if (selected === "education") setEduTrigger((n) => n + 1);
    if (selected === "work") setWorkTrigger((n) => n + 1);
  }, [selected]);

  return (
    <>
      <div className="absolute w-full h-full bg-black">
        <Cursor />
        <PurpleCursor />
        <div id="main area" className="absolute h-full w-full">
          <h1 className="absolute text-white text-8xl w-fit right-0 m-4">
            Mahin
          </h1>

          {/* Logos Section */}
          <div className="absolute top-[23vh] right-4 flex gap-6 items-center">
            <LogoItem src={javascriptLogo} name="JavaScript" />
            <LogoItem src={typescriptLogo} name="TypeScript" />
            <LogoItem src={reactLogo} name="React" />
            <LogoItem src={tailwindLogo} name="Tailwind CSS" />
            <LogoItem src={framerLogo} name="Framer Motion" />
            <LogoItem src={pythonLogo} name="Python" />
            <LogoItem src={luaLogo} name="Lua" />
          </div>

          <div
            id="info"
            className="absolute bg-white/5 h-[50vh] w-[70vh] bottom-4 right-4 backdrop-blur-sm overflow-visible z-50"
          >
            <div className="flex">
              <ButtonNorm
                title="Education"
                cn="flex-1 text-white bg-black m-1 rounded-md"
                onClick={() => setSelected("education")}
                active={selected === "education"}
              />
              <ButtonNorm
                title="Awards"
                cn="flex-1 text-white bg-black m-1 rounded-md"
                onClick={() => setSelected("work")}
                active={selected === "work"}
              />
            </div>

            <div className="p-6 text-white">
              {selected === "education" ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    <ScrambleText text="Education" trigger={eduTrigger} />
                  </h2>
                  <p>
                    <ScrambleText
                      text="Harold M. Brathwaite Secondary School"
                      trigger={selected}
                    />
                    <em> (Brampton, ON)</em>
                  </p>
                  <p className="mt-2">
                    <ScrambleText
                      text="International Baccalaureate (IB) Diploma Program, Grade 11"
                      trigger={selected}
                    />
                  </p>
                  <p>
                    <em>Expected Graduation:</em>{" "}
                    <ScrambleText text="2027" trigger={selected} />
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    <ScrambleText text="Awards" trigger={workTrigger} />
                  </h2>
                  <p>
                    <ScrambleText
                      text="6th Place - FBLC Coding and Programming, March 2025"
                      trigger={workTrigger}
                    />
                  </p>
                  <p className="mt-2">
                    <ScrambleText
                      text="2nd Round - HOSA Forensic Science, March 2025"
                      trigger={workTrigger}
                    />
                  </p>
                  <p className="mt-2">
                    <ScrambleText
                      text="2nd Place (AI Ventures) SpurHacks, June 2025"
                      trigger={workTrigger}
                    />
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          id="images"
          className="relative h-[100vh] w-[100vh] overflow-hidden aspect-square"
        >
          <img
            id="foregroundimg"
            src={foregroundImg}
            alt=""
            className="absolute h-full"
          />

          <motion.img
            id="diamimg"
            src={diamImg}
            alt=""
            className="absolute h-[22vh] top-[64vh] left-[42vh] z-10"
            whileHover={{
              scale: 1.2,
            }}
          />
          <img
            id="mainimg"
            src={mainImg}
            alt=""
            className="absolute h-full"
          />
          <motion.img
            id="backgroundimg"
            src={backgroundImg}
            alt=""
            className="absolute h-full"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "circInOut",
            }}
          />
        </div>

        <Sidebar currentPage="about" />
      </div>
    </>
  );
}

export default App;
