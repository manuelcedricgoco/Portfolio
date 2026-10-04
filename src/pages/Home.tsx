import { About } from '@/sections/About';
import { Contact } from '@/sections/Contact';
import { GithubSection } from '@/sections/GithubSection';
import { Hero } from '@/sections/Hero';
import { Journey } from '@/sections/Journey';
import { Projects } from '@/sections/Projects';
import { Services } from '@/sections/Services';
import { Skills } from '@/sections/Skills';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Services />
      <GithubSection />
      <Contact />
    </>
  );
}
