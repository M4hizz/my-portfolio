import { motion } from "framer-motion";

const glowVariants = {
  initial: {
    scale: 1,
    textShadow: "0px 0px 0px rgba(255, 255, 255, 0)",
    x: 0,
  },
  hover: {
    scale: 1.2,
    textShadow: "0px 0px 8px rgba(255, 0, 255, 1)",
    x: 5,
  },
  tap: {
    scale: 0.8,
    textShadow: "0px 0px 5px rgba(255, 255, 255, 1)",
  },
};

const ButtonNorm = ({
  title,
  cn,
  onClick,
  active,
}: {
  title: string;
  cn?: string;
  onClick?: () => void;
  active?: boolean;
}) => {
  return (
    <motion.button
      id={title}
      onClick={onClick}
      className={`${cn || ""} ${
        active ? "ring-2 ring-purple-500" : ""
      } overflow-visible relative z-50`}
      variants={glowVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      transition={{
        duration: 0.1,
        ease: "circInOut",
      }}
    >
      {title}
    </motion.button>
  );
};

export default ButtonNorm;
