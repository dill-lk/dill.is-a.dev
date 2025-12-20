import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Philosophy from '../components/Philosophy';
import Process from '../components/Process';
import Skills from '../components/Skills';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Journal from '../components/Journal';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import BlurFade from '../components/BlurFade';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <BlurFade delay={0.2}><Philosophy /></BlurFade>
      <BlurFade delay={0.2}><Process /></BlurFade>
      <BlurFade delay={0.2}><Skills /></BlurFade>
      <BlurFade delay={0.2}><Services /></BlurFade>
      <BlurFade delay={0.2}><Experience /></BlurFade>
      <BlurFade delay={0.2}><Projects /></BlurFade>
      <Journal />
      <Testimonials />
      <BlurFade delay={0.2}><Contact /></BlurFade>
    </main>
  );
};

export default Home;