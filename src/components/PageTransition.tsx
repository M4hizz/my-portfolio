import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900 z-[9999] origin-bottom pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{
          scaleY: 0,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
        }}
        exit={{ scaleY: 1, transition: { duration: 0 } }}
      />
      {children}
    </>
  );
};

export default PageTransition;
