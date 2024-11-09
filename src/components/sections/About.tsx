'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });   

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  const skills = [
    'Python',
    'Laravel',
    'PHP',
    'JavaScript',
    'React',
    'Node.js'
  ];

  const experiences = [
    '1 Year Web Development',
    'Full Stack Development',
    'Problem Solver'
  ];

  return (
    <motion.section
      ref={ref}
      className="min-h-screen bg-black relative py-20 mt-[-1px]"
      initial={{ opacity: 1 }}
      style={{ opacity }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          style={{ y }}
        >
          <motion.h2 
            className="text-[10vw] font-bold text-white mb-20"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            About
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <p className="text-white/80 text-lg leading-relaxed">
                A passionate self-taught developer with a year of hands-on experience in web development. 
                While I chose to leave university to pursue practical experience, 
                I&apos;ve dedicated myself to mastering modern web technologies and building real-world solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 bg-white/10 rounded-full text-white/60"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-2xl font-bold text-white">Experience</h3>
                <div className="space-y-4">
                  {experiences.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <span className="w-2 h-2 bg-violet-500 rounded-full" />
                      <span className="text-white/60">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 