import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Cursor from "./components/Cursor";
import PurpleCursor from "./components/PurpleCursor";
import Sidebar from "./components/Sidebar";

// Roadmap Item Component
const RoadmapItem = ({
  title,
  date,
  description,
  index,
  isActive,
}: {
  title: string;
  date: string;
  description: string;
  index: number;
  isActive: boolean;
}) => {
  return (
    <motion.div
      className="relative flex items-start gap-8 mb-20"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.3, duration: 0.6 }}
    >
      {/* Timeline Line and Dot */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <motion.div
          className="w-6 h-6 rounded-full bg-purple-500 z-10 relative"
          animate={{
            scale: isActive ? [1, 1.3, 1] : 1,
            boxShadow: isActive
              ? [
                  "0 0 0 0 rgba(168, 85, 247, 0.7)",
                  "0 0 0 20px rgba(168, 85, 247, 0)",
                  "0 0 0 0 rgba(168, 85, 247, 0)",
                ]
              : "0 0 0 0 rgba(168, 85, 247, 0)",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Vertical Line */}
        {index < 1 && (
          <motion.div
            className="w-1 bg-gradient-to-b from-purple-500 to-pink-500 absolute top-6"
            initial={{ height: 0 }}
            animate={{ height: "180px" }}
            transition={{ delay: index * 0.3 + 0.3, duration: 0.8 }}
          />
        )}
      </div>

      {/* Content Card */}
      <motion.div
        className="flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300"
        whileHover={{ scale: 1.02, y: -5 }}
        animate={{
          boxShadow: isActive
            ? [
                "0 0 20px rgba(168, 85, 247, 0.3)",
                "0 0 40px rgba(168, 85, 247, 0.5)",
                "0 0 20px rgba(168, 85, 247, 0.3)",
              ]
            : "0 0 20px rgba(168, 85, 247, 0.1)",
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity },
        }}
      >
        <motion.h3
          className="text-3xl font-bold text-white mb-2"
          animate={{
            textShadow: isActive
              ? [
                  "0 0 10px rgba(168, 85, 247, 0.5)",
                  "0 0 20px rgba(168, 85, 247, 0.8)",
                  "0 0 10px rgba(168, 85, 247, 0.5)",
                ]
              : "0 0 10px rgba(168, 85, 247, 0.3)",
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {title}
        </motion.h3>
        <p className="text-purple-400 text-sm font-semibold mb-3">{date}</p>
        <p className="text-gray-300 text-base leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  );
};

function Future() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="absolute w-full h-full bg-black overflow-hidden">
        <Cursor />
        <PurpleCursor />

        {/* Grid Lines Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Vertical Lines */}
          {[20, 40, 60, 80].map((pos, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute h-full w-[2px] bg-gradient-to-b from-transparent via-purple-500 to-transparent"
              style={{ left: `${pos}%`, willChange: "opacity, transform" }}
              animate={{
                // Only animate opacity to reduce paint cost
                opacity: [0.25, 0.6, 0.25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Horizontal Lines */}
          {[20, 40, 60, 80].map((pos, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent"
              style={{ top: `${pos}%`, willChange: "opacity, transform" }}
              animate={{
                opacity: [0.25, 0.6, 0.25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.6 + 0.2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Diagonal Glow Effect */}
          <motion.div
            className="absolute w-full h-[4px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            style={{
              transformOrigin: "center",
              rotate: "45deg",
              left: "-50%",
              top: "50%",
              filter: "blur(1px)",
              willChange: "transform, opacity",
            }}
            animate={{
              left: ["-50%", "100%"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Animated Background Orbs */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px]"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: "10%", left: "10%" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-pink-500/20 blur-[100px]"
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ bottom: "10%", right: "10%" }}
          />
        </div>

        <div id="main area" className="absolute h-full w-full">
          {/* Title */}
          <motion.h1
            className="absolute text-white text-8xl w-fit right-4 top-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                  "0 0 40px rgba(236, 72, 153, 0.8)",
                  "0 0 20px rgba(168, 85, 247, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Mahin
            </motion.span>
          </motion.h1>

          {/* Roadmap Container */}
          <div
            ref={scrollRef}
            className="absolute top-[20vh] left-[50%] -translate-x-1/2 w-[60vh] h-[70vh] overflow-y-auto px-8 py-8"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#a855f7 transparent",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <RoadmapItem
                title="FBLC 2026"
                date="March 2026"
                description="Future Business Leaders of Canada competitive event. Aiming to compete in Coding & Programming and achieve top placement with my teammates."
                index={0}
                isActive={activeIndex === 0}
              />
              <RoadmapItem
                title="Internship 2026"
                date="Summer 2026"
                description="Seeking software development internship opportunities to gain real-world experience in full-stack development, AI/ML projects, or game development."
                index={1}
                isActive={activeIndex === 1}
              />
            </motion.div>
          </div>
        </div>

        <Sidebar currentPage="future" />
      </div>
    </>
  );
}

export default Future;
