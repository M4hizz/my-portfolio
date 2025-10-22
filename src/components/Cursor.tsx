import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import amongUsImg from "../assets/among us.png";

const Cursor = () => {
  const [prevPos, setPrevPos] = useState({ x: 0, y: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotation = useMotionValue(0);

  // Spring smoothing
  const smoothX = useSpring(x, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 20 });
  const smoothRotation = useSpring(rotation, { stiffness: 100, damping: 15 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };

      const dx = newPos.x - prevPos.x;
      const dy = newPos.y - prevPos.y;

      let newAngle = Math.atan2(dy, dx) * (180 / Math.PI);

      const currentAngle = rotation.get();
      const angleDiff = ((newAngle - currentAngle + 540) % 360) - 180;
      newAngle = currentAngle + angleDiff * 0.2; // interpolate a bit manually

      // Update everything
      rotation.set(newAngle);
      x.set(newPos.x);
      y.set(newPos.y);
      setPrevPos(newPos);
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [prevPos, rotation, x, y]);

  return (
    <motion.img
      src={amongUsImg}
      alt="cursor"
      className="w-10 fixed pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
        rotate: smoothRotation,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
};

export default Cursor;
