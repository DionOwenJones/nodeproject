'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  return (
    <section id="hero" className="h-screen relative flex items-center justify-center">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-screen w-full bg-black overflow-hidden"
      >
        <motion.div 
          className="h-full w-full flex items-center justify-center perspective-2000"
          style={{ 
            rotateX,
            rotateY,
            transition: 'all 0.15s ease'
          }}
        >
          {/* Main Content */}
          <div className="relative">
            {/* Glowing Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 blur-[100px] opacity-50"
              animate={{
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.7 : 0.5,
              }}
            />

            {/* Text Elements */}
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="overflow-hidden"
              >
<h1 className="text-[12vw] md:text-[15vw] font-bold leading-none tracking-tighter">
  <motion.span 
    className="inline-block"
    animate={{ 
      y: isHovered ? -20 : 0,
      color: isHovered ? '#fff' : '#888'
    }}
  >
    NODE
  </motion.span>
</h1>
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.1 }}
  className="overflow-hidden -mt-4 md:-mt-8"
>
  <h2 className="text-[8vw] md:text-[10vw] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-500">
    PROJECT
  </h2>
</motion.div>

              {/* Decorative Elements */}
              <div className="absolute -inset-40 -z-10">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-full h-full border border-white/10 rounded-full"
                    style={{
                      scale: 1 - i * 0.2,
                      rotate: i * 15,
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: isHovered ? [1 - i * 0.2, 1.1 - i * 0.2] : [1 - i * 0.2, 1 - i * 0.2],
                    }}
                    transition={{
                      rotate: { duration: 10 + i * 5, ease: "linear", repeat: Infinity },
                      scale: { duration: 1.5, ease: "easeInOut" }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}