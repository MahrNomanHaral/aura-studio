import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "motion/react";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const sx = useSpring(cursorX, springConfig);
  const sy = useSpring(cursorY, springConfig);
  
  const [variant, setVariant] = useState<"default" | "hover" | "three">("default");

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, select, textarea, .group")) {
        setVariant("hover");
      } else if (target.closest(".h-screen canvas")) {
        setVariant("three");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  const cursorContent = {
    default: (
      <div className="w-5 h-5 rounded-full border border-white" />
    ),
    hover: (
      <div className="w-2 h-2 rounded-full bg-white" />
    ),
    three: (
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className="absolute w-full h-[1px] bg-white opacity-40" />
        <div className="absolute h-full w-[1px] bg-white opacity-40" />
      </div>
    ),
  } as const;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={variant}
          initial={{ scale: 0, rotate: variant === "three" ? 45 : 0 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: variant === "three" ? -45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {cursorContent[variant]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

