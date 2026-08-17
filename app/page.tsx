"use client";

import { Hero } from "./components/Hero";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { LanguageProvider } from "./components/LanguageProvider";
import { MenuCarousel } from "./components/MenuCarousel";
import { Navbar } from "./components/Navbar";
import { SpaceCarousel } from "./components/SpaceCarousel";
import { Story } from "./components/Story";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <MenuCarousel />
        <SpaceCarousel />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
