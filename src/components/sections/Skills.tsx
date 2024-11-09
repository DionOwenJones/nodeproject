'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface SkillCategory {
  name: string;
  skills: string[];
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0]);

  const categories: SkillCategory[] = [
    {
      name: "Frontend",
      skills: ["React", "JavaScript", "HTML/CSS", "Responsive Design"]
    },
    {
      name: "Backend",
      skills: ["Python", "PHP", "Laravel", "Node.js"]
    },
    {
      name: "Learning",
      skills: ["TypeScript", "Next.js", "API Design", "Database Design"]
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="min-h-screen bg-black relative py-20 mt-[-1px]"
      style={{ opacity }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-6xl mx-auto"
          style={{ y }}
        >
          <motion.h2 
            className="text-[10vw] font-bold text-white mb-20"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Skills
          </motion.h2>

          <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
            {/* Category Selection */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-20 space-y-4">
                {categories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    onClick={() => setActiveCategory(index)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      activeCategory === index 
                        ? 'bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-white' 
                        : 'text-white/40 hover:text-white/60'
                    }`}
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-2xl font-bold block">{category.name}</span>
                    <span className="text-sm opacity-60">
                      {category.skills.length} technologies
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Skills Display */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories[activeCategory].skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{skill}</h3>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 