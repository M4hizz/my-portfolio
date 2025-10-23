import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Cursor from "./components/Cursor";
import PurpleCursor from "./components/PurpleCursor";
import Sidebar from "./components/Sidebar";

// Import optimized skill images (compressed and resized to 1920x1080)
import avatarImg from "./assets/skills-images-optimized/avatar.jpg";
import demonSlayerImg from "./assets/skills-images-optimized/demon slayer.jpg";
import spidermanImg from "./assets/skills-images-optimized/spiderman.jpg";
import stadiumImg from "./assets/skills-images-optimized/stadium.jpg";

// Skill Section Component with progressive loading
const SkillSection = ({
  title,
  imageSrc,
  gradientFrom,
  gradientTo,
  index,
}: {
  title: string;
  imageSrc: string;
  gradientFrom: string;
  gradientTo: string;
  index: number;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section
      className="relative h-screen w-screen flex items-center justify-center snap-start snap-always overflow-hidden bg-black"
      data-index={index}
    >
      {/* Blur placeholder while loading */}
      {!imageLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black animate-pulse"
          style={{
            backgroundImage: `linear-gradient(135deg, ${gradientFrom}15 0%, ${gradientTo}10 100%)`,
          }}
        />
      )}

      {/* Lazy-loaded background image */}
      <motion.img
        className="absolute inset-0 w-full h-full object-cover"
        src={imageSrc}
        alt={`${title} background`}
        loading="lazy"
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        style={{
          willChange: "transform, opacity",
          opacity: imageLoaded ? 1 : 0,
        }}
        animate={{
          scale: imageLoaded ? [1, 1.02, 1] : 1,
          opacity: imageLoaded ? [1, 0.98, 1] : 0,
        }}
        transition={{
          scale: { duration: 24, repeat: Infinity, ease: "linear" },
          opacity: imageLoaded
            ? { duration: 24, repeat: Infinity, ease: "linear" }
            : { duration: 0.6 },
        }}
      />

      {/* Black Vignette Overlay with Pulse */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)",
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Text with Horizontal Gradient Glow and Animation */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
        }}
        className="relative text-8xl font-bold text-white z-10"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${gradientFrom} 20%, ${gradientTo} 50%, ${gradientFrom} 80%, transparent 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        <motion.span
          style={{
            WebkitTextFillColor: "white",
          }}
          animate={{
            textShadow: [
              `0 0 60px ${gradientFrom}, 0 0 120px ${gradientTo}, 0 4px 20px rgba(0,0,0,0.5)`,
              `0 0 80px ${gradientFrom}, 0 0 140px ${gradientTo}, 0 4px 20px rgba(0,0,0,0.5)`,
              `0 0 60px ${gradientFrom}, 0 0 120px ${gradientTo}, 0 4px 20px rgba(0,0,0,0.5)`,
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {title}
        </motion.span>
      </motion.h1>
    </section>
  );
};

function Skills() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const container = document.querySelector(
      "#scrollsection"
    ) as HTMLElement | null;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll("section")
    ) as HTMLElement[];
    // tag sections with index for click targeting
    sections.forEach((s, i) => s.setAttribute("data-index", String(i)));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index || 0
            );
            setActiveIndex(idx);
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    sections.forEach((s) => observer.observe(s));

    // Optimized wheel/trackpad handler - works for both scroll wheel and trackpad swipes
    const handleWheel = (e: WheelEvent) => {
      // Block if currently scrolling
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;

      // Lower threshold to catch trackpad swipes (which have smaller deltaY values)
      // Trackpad swipes typically have deltaY between 1-50, scroll wheels 100+
      if (Math.abs(delta) < 1) return;

      e.preventDefault();
      isScrollingRef.current = true;

      // Normalize direction (trackpad and wheel both use positive=down, negative=up)
      let nextIndex = activeIndex;
      if (delta > 0 && activeIndex < sections.length - 1) {
        nextIndex = activeIndex + 1;
      } else if (delta < 0 && activeIndex > 0) {
        nextIndex = activeIndex - 1;
      }

      if (nextIndex !== activeIndex) {
        const target = sections[nextIndex];
        container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      }

      // Timeout prevents rapid successive scrolls
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      observer.disconnect();
      container.removeEventListener("wheel", handleWheel);
    };
  }, [activeIndex]);

  const handleDotClick = (index: number) => {
    const container = document.querySelector(
      "#scrollsection"
    ) as HTMLElement | null;
    if (!container) return;
    const target = container.querySelector(
      `section[data-index=\"${index}\"]`
    ) as HTMLElement | null;
    if (!target) return;
    // smooth scroll within the container
    container.scrollTo({ top: target.offsetTop, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed pointer-events-none w-screen h-screen z-50">
        <div className="pointer-events-none">
          <Cursor />
          <PurpleCursor />
        </div>

        <div id="main area" className="absolute h-full w-full">
          <motion.h1
            className="absolute text-white text-8xl w-fit right-0 m-4"
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
        </div>

        <Sidebar currentPage="skills" />
      </div>

      <div
        id="scrollsection"
        ref={scrollRef}
        className="fixed top-0 left-0 h-screen w-screen overflow-y-auto snap-y snap-mandatory"
        style={{
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
          overscrollBehavior: "none",
        }}
      >
        <SkillSection
          title="Skills"
          imageSrc={avatarImg}
          gradientFrom="#4a9eff"
          gradientTo="#00d4ff"
          index={0}
        />
        <SkillSection
          title="UI/UX Design"
          imageSrc={demonSlayerImg}
          gradientFrom="#ff6b9d"
          gradientTo="#c9184a"
          index={1}
        />
        <SkillSection
          title="Frontend"
          imageSrc={spidermanImg}
          gradientFrom="#e63946"
          gradientTo="#1d3557"
          index={2}
        />
        <SkillSection
          title="Gamemaking"
          imageSrc={stadiumImg}
          gradientFrom="#38b000"
          gradientTo="#004b23"
          index={3}
        />

        {/* Dot navigation */}
        <div className="pointer-events-auto fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-60">
          {[0, 1, 2, 3].map((i) => {
            const active = i === activeIndex;
            return (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                aria-label={`Go to section ${i + 1}`}
                className={`w-3 h-3 rounded-full bg-white/50 transition-all duration-200 flex items-center justify-center ${
                  active
                    ? "w-4 h-4 bg-white ring-4 ring-purple-400/40 shadow-[0_0_12px_4px_rgba(124,58,237,0.18)] scale-110"
                    : ""
                }`}
              >
                <span
                  className={`block rounded-full ${
                    active ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-white/80"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Skills;
