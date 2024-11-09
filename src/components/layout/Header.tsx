'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useState, memo } from 'react';

// Memoize navigation items to prevent unnecessary re-renders
const NavigationItems = memo(({ onItemClick }: { onItemClick: (item: string) => void }) => (
  ['About', 'Skills', 'Contact'].map((item) => (
    <motion.button
      key={item}
      onClick={() => onItemClick(item.toLowerCase())}
      className="relative group text-white/60 hover:text-white transition-colors"
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      <span className="tracking-wide">{item}</span>
      <span className="h-px w-0 bg-gradient-to-r from-violet-500 to-indigo-500 absolute -bottom-1 left-0 group-hover:w-full transition-all duration-300" />
    </motion.button>
  ))
));

NavigationItems.displayName = 'NavigationItems';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoize scroll function
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.5 }}
      className="fixed top-0 w-full z-50 py-8 bg-black/20 backdrop-blur-sm"
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            NODE PROJECT
          </motion.button>
          
          <div className="hidden md:flex gap-12">
            <NavigationItems onItemClick={scrollToSection} />
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col gap-4 bg-black/40 backdrop-blur-lg rounded-lg p-4">
                <NavigationItems onItemClick={scrollToSection} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}