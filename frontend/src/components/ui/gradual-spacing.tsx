"use client";

import { AnimatePresence, motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

export function GradualSpacing({
                                 text,
                                 duration = 0.5,
                                 delayMultiple = 0.04,
                                 framerProps = {
                                   hidden: { opacity: 0, x: -20 },
                                   visible: { opacity: 1, x: 0 },
                                 },
                                 className,
                               }: GradualSpacingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger once when it comes into view

  return (
      <div ref={ref} className="flex justify-center space-x-1">
        <AnimatePresence>
          {isInView &&
              text.split("").map((char, i) => (
                  <motion.h1
                      key={i}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={framerProps}
                      transition={{ duration, delay: i * delayMultiple }}
                      className={cn("drop-shadow-sm", className)}
                  >
                    {char === " " ? <span>&nbsp;</span> : char}
                  </motion.h1>
              ))}
        </AnimatePresence>
      </div>
  );
}
