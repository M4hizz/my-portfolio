import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PurpleCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [isHoveringSelectable, setIsHoveringSelectable] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Detect if hovered element is "selectable"
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.getAttribute("data-cursor-selectable") === "true"
      ) {
        setIsHoveringSelectable(true);
      } else {
        setIsHoveringSelectable(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
        x: mousePos.x - 10,
        y: mousePos.y - 10,
      }}
      animate={{
        scale: isClicked ? 0.7 : 1,
        backgroundColor: isHoveringSelectable ? "#d8b4fe" : "#7e22ce",
        boxShadow: isHoveringSelectable
          ? "0 0 15px 8px rgba(168, 85, 247, 0.1)"
          : isClicked
          ? "0 0 15px 5px rgba(168, 85, 247, 1)"
          : "0 0 0px rgba(0,0,0,0)",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );
};

export default PurpleCursor;
