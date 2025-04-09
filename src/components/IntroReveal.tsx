"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroReveal() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 1800); // shorter reveal
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night text-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Curtains */}
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-br from-lavender via-seafoam to-peach"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ delay: 0.2, duration: 1, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-br from-lavender via-seafoam to-peach"
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ delay: 0.2, duration: 1, ease: "easeInOut" }}
          />

          {/* Title Text */}
          <motion.h1
            className="z-10 text-5xl md:text-7xl font-bold tracking-wide"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          >
            MoodBoard
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
