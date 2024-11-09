'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback } from 'react';

export default function Header() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.5 }}
      className="fixed top-0 w-full z-50 py-8"
    >
      <nav className="container mx-auto px-8">
        <div className="flex justify-between items-center">
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            NODE PROJECT
          </motion.button>
          <div className="flex gap-12">
            {['About', 'Skills', 'Contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative group text-white/60 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <span className="text-sm tracking-wide">{item}</span>
                <span className="h-px w-0 bg-gradient-to-r from-violet-500 to-indigo-500 absolute -bottom-1 left-0 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  );
} 