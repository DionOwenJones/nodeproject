'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import EasterEgg from '../EasterEgg';

export default function EasterEggSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [sequence, setSequence] = useState<string[]>([]);
  const [isGameVisible, setIsGameVisible] = useState(false);
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  const buttons = [
    { label: '↑', value: 'ArrowUp' },
    { label: '↓', value: 'ArrowDown' },
    { label: '←', value: 'ArrowLeft' },
    { label: '→', value: 'ArrowRight' },
    { label: 'B', value: 'b' },
    { label: 'A', value: 'a' },
  ];

  const handleButtonClick = (value: string) => {
    const newSequence = [...sequence, value].slice(-10);
    setSequence(newSequence);
    
    if (newSequence.length === 10) {
      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        setIsGameVisible(true);
        setError(false);
      } else {
        setError(true);
        setTimeout(() => {
          setSequence([]);
          setError(false);
        }, 1000);
      }
    }
  };

  return (
    <>
      <motion.section
        ref={ref}
        className="min-h-screen bg-black relative py-20 mt-[-1px] overflow-hidden"
      >
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
              
              {isMobile ? (
                <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12">
                  Please view this section on a desktop device to discover the hidden feature.
                </p>
              ) : (
                <>
                  <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12">
                    Enter the legendary code to unlock a special game. Can you discover the sequence?
                  </p>
                  
                  {/* Sequence Display */}
                  <div className="flex justify-center gap-2 mb-8">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-10 h-10 rounded-lg border ${error ? 'border-red-500/50 bg-red-500/10' : 'border-white/10'} flex items-center justify-center text-white/60`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          scale: error ? 0.95 : 1
                        }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {sequence[i] ? sequence[i].includes('Arrow') ? sequence[i].replace('Arrow', '') : sequence[i].toUpperCase() : '?'}
                      </motion.div>
                    ))}
                  </div>

                  {/* Control Buttons */}
                  <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                    {buttons.map((button) => (
                      <motion.button
                        key={button.value}
                        onClick={() => handleButtonClick(button.value)}
                        className={`w-full h-12 rounded-lg ${error ? 'bg-red-500/10 border-red-500/50' : 'bg-white/5 border-white/10'} border text-white/60 hover:bg-white/10 hover:text-white`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {button.label}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {!isMobile && isGameVisible && (
        <EasterEgg isVisible={isGameVisible} setIsVisible={setIsGameVisible} />
      )}
    </>
  );
} 