import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onFinished }: { onFinished?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) return;
    const timer = setTimeout(() => onFinished?.(), 1000);
    return () => clearTimeout(timer);
  }, [isVisible, onFinished]);

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 1 } }}
          className="fixed inset-0 z-[100] bg-aura-bg flex items-center justify-center p-12"
        >
          <div className="relative w-full max-w-sm aspect-square">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-aura-dark/20 fill-none"
            >
              {/* Simplified architectural sketch of a room */}
              <motion.path
                d="M 10,90 L 10,40 L 40,20 L 90,40 L 90,90 Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <motion.path
                d="M 10,40 L 90,40"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <motion.path
                d="M 40,20 L 40,40"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <motion.path
                d="M 30,70 L 60,70 L 60,90 M 30,70 L 30,90"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </svg>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <h2 className="text-xl font-serif text-aura-dark tracking-widest lowercase">aura</h2>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
