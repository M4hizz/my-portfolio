import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const PurpleCursor = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHoveringSelectable, setIsHoveringSelectable] = useState(false);

  // Use motion values for instant position updates (no spring lag)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Instant position update - no lag
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);

      // Check if hovering over any clickable element (including nested elements)
      const target = e.target as HTMLElement;
      const clickable = target.closest(
        'button, a, [data-cursor-selectable="true"], [role="button"]'
      );

      setIsHoveringSelectable(!!clickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999]"
      style={{
        x: mouseX,
        y: mouseY,
      }}
      animate={{
        scale: isClicked ? 0.7 : isHoveringSelectable ? 1.3 : 1,
        backgroundColor: isHoveringSelectable ? "#d8b4fe" : "#7e22ce",
        boxShadow: isHoveringSelectable
          ? "0 0 20px 10px rgba(168, 85, 247, 0.6)"
          : isClicked
          ? "0 0 15px 5px rgba(168, 85, 247, 1)"
          : "0 0 0px rgba(0,0,0,0)",
      }}
      transition={{ type: "spring", stiffness: 600, damping: 30, mass: 0.3 }}
    />
  );
};

export default PurpleCursor;
