import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import EasterEggSection from '@/components/sections/EasterEggSection';
import EasterEgg from '@/components/EasterEgg';
import Contact from '@/components/sections/Contact';
export default function Home() {
  return (
    <main className="relative">
      <EasterEgg />
      <Hero />
      <About />
      <Skills />
      <EasterEggSection />
      <Contact />
    </main>   
  );
}
