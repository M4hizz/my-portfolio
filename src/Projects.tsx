import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Cursor from "./components/Cursor";
import PurpleCursor from "./components/PurpleCursor";
import Sidebar from "./components/Sidebar";

// Modal component
const ProjectModal = ({
  image,
  title,
  dsc,
  onClose,
}: {
  image: string;
  title: string;
  dsc: string;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-purple-500/30 shadow-2xl shadow-purple-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 text-white bg-purple-600 hover:bg-purple-700 rounded-full w-10 h-10 flex items-center justify-center transition-all hover:scale-110 hover:rotate-90 duration-300"
          >
            ✕
          </button>

          {image && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-full h-[400px] rounded-2xl overflow-hidden mb-6 shadow-lg"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            {dsc}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

//Project page
const ProjectPage = ({
  image,
  title,
  dsc,
}: {
  image: string;
  title: string;
  dsc: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasContent = title && dsc;

  return (
    <>
      <motion.div
        className={`bg-gray-700/5 h-full mx-4 rounded-2xl backdrop-blur-xs flex flex-col ${
          hasContent ? "cursor-pointer" : ""
        }`}
        onClick={() => hasContent && setIsOpen(true)}
        whileHover={hasContent ? { scale: 1.02, y: -5 } : {}}
        transition={{ duration: 0.3, ease: "easeOut" }}
        data-cursor-selectable={hasContent ? "true" : "false"}
      >
        <div className="relative w-[95%] h-[50%] m-2 rounded-2xl left-[50%] -translate-x-1/2 overflow-hidden">
          <img
            src={image}
            alt=""
            className="w-full h-full rounded-2xl object-cover"
          />
          {hasContent && (
            <motion.div
              className="absolute inset-0 bg-purple-600/0 hover:bg-purple-600/20 transition-all duration-300 flex items-center justify-center"
              whileHover={{ backgroundColor: "rgba(147, 51, 234, 0.2)" }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="text-white text-2xl font-bold drop-shadow-lg"
              >
                Click to view
              </motion.span>
            </motion.div>
          )}
        </div>
        <p className="relative text-2xl text-white m-5">{title}</p>
        <p className="relative text-md text-white h-fit mx-5">{dsc}</p>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <ProjectModal
            image={image}
            title={title}
            dsc={dsc}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const Projects = () => {
  return (
    <>
      <div id="bgthing">
        <div className="absolute w-screen h-screen bg-black -z-30">
          <motion.div
            className="absolute w-100 aspect-square -z-20 bg-white rounded-[100%] -bottom-60"
            animate={{
              x: [-10, 100, -10],
              y: [0, 100, 0],
              scale: [0.9, 1, 0.7, 0.9],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop",
            }}
          ></motion.div>
          <motion.div
            className="absolute w-50 aspect-square -z-20 bg-white rounded-[100%] -bottom-35 right-30"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
              scale: [0.9, 1, 0.7, 0.9],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          ></motion.div>
        </div>
        <div className="absolute w-screen h-screen backdrop-blur-[15vh] -z-20"></div>
      </div>
      <div className="absolute w-full h-full">
        <Cursor />
        <PurpleCursor />

        <div id="main area" className="absolute h-full w-full">
          <h1 className="absolute text-white text-8xl w-fit right-0 m-4">
            Mahin
          </h1>
          <div
            id="info"
            className="absolute grid grid-cols-3 grid-rows-2 gap-4 h-[70vh] w-[150vh] top-[50vh] left-[120vh] -translate-x-1/2 -translate-y-1/2"
          >
            <ProjectPage
              image=""
              title="Weather App"
              dsc="Very simple yet functional weather app design."
            />
            <ProjectPage
              image="/src/assets/project-images/rocky.png"
              title="Platformer"
              dsc="Introduction to events, calls, etc."
            />
            <ProjectPage image="" title="" dsc="" />
            <ProjectPage image="" title="" dsc="" />
            <ProjectPage image="" title="" dsc="" />
            <ProjectPage image="" title="" dsc="" />
          </div>
        </div>

        <Sidebar currentPage="projects" />
      </div>
    </>
  );
};

export default Projects;
