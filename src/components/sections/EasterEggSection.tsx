'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

export default function EasterEggSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0]);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const sequence = ['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'];

  // Function to simulate keypress
  const simulateKeyPress = (key: string) => {
    const event = new KeyboardEvent('keydown', {
      key: key === '↑' ? 'ArrowUp' :
           key === '↓' ? 'ArrowDown' :
           key === '←' ? 'ArrowLeft' :
           key === '→' ? 'ArrowRight' :
           key.toLowerCase(),
      bubbles: true
    });
    window.dispatchEvent(event);
  };

  const handleKeyClick = (key: string, index: number) => {
    if (index === currentSequenceIndex) {
      setCurrentSequenceIndex((prev) => (prev + 1) % sequence.length);
      simulateKeyPress(key);
    }
  };

  return (
    <motion.section
      ref={ref}
      className="min-h-screen bg-black relative py-20 mt-[-1px] overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-transparent" />
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-violet-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          style={{ y }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Hidden <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-500">Secret</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Enter the legendary code to unlock a special game. Can you discover the sequence?
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
            
            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-8">
                {sequence.map((key, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleKeyClick(key, i)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`aspect-square flex items-center justify-center rounded-xl text-xl font-bold transition-all duration-300
                      ${i === currentSequenceIndex 
                        ? 'bg-violet-500/30 text-white shadow-lg shadow-violet-500/20' 
                        : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                  >
                    {key}
                  </motion.button>
                ))}
              </div>
              
              <p className="text-white/40 text-sm">
                Click the buttons in sequence or use your keyboard
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 