'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error();
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus('error');
    }
  };

  const socialLinks = [
    {
      icon: <FaGithub className="w-6 h-6" />,
      url: 'https://github.com/DionOwenJones',
      label: 'GitHub'
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      url: 'https://www.linkedin.com/in/dionojones/',
      label: 'LinkedIn'
    },
    {
      icon: <FaInstagram className="w-6 h-6" />,
      url: 'https://www.instagram.com/dion.joness/',
      label: 'Instagram'
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="min-h-screen bg-black relative py-20 mt-[-1px]"
      style={{ opacity }}
    >
      <motion.h2 
        className="text-[10vw] font-bold text-white mb-20 container mx-auto px-4"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contact
      </motion.h2>

      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          style={{ y }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 md:space-y-6"
            >
              <p className="text-white/80 text-lg leading-relaxed">
                Ready to start a project together? Send me a message and let&apos;s create something amazing.
              </p>
              
              <div className="space-y-4">
                {socialLinks.map(({ icon, url, label }) => (
                  <motion.a
                    key={label}
                    href={url}
                    className="flex items-center space-x-4 text-white/60 hover:text-white/80 transition-colors"
                    whileHover={{ x: 10 }}
                  >
                    {icon}
                    <span>{label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 blur-3xl" />
              <div className="relative z-10 space-y-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      required
                    />
                    <textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 min-h-[150px]"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold py-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formStatus === 'loading'}
                  >
                    {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 