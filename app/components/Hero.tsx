"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const copy = {
  pt: {
    eyebrow: "Lisboa · Cozinha Sichuan contemporânea",
    title: "川粤 Chuan Yue",
    body: "Sabores autênticos e intensos, noodles feitos à mão e pratos clássicos e autênticos de Sichuan, preparados de raiz todos os dias.",
    cta: "Reservar uma mesa",
    menu: "Descobrir o menu",
    note: "Tradição chinesa · Ritmo lisboeta",
  },
  en: {
    eyebrow: "Lisbon · Contemporary Sichuan cuisine",
    title: "川粤 Chuan Yue",
    body: "Authentic and bold flavors, handmade noodles, and classic authentic Sichuan dishes made from scratch daily.",
    cta: "Book a table",
    menu: "Discover the menu",
    note: "Chinese tradition · Lisbon rhythm",
  },
};

function MagneticButton({ children }: { children: React.ReactNode }) {
  const x = useSpring(useMotionValue(0), { stiffness: 190, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 190, damping: 15 });
  return (
    <motion.a
      href="/reservation"
      className="primary-cta"
      style={{ x, y }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.18);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}<ArrowDownRight size={17} />
    </motion.a>
  );
}

export function Hero() {
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <section className="hero" id="top">
      <motion.div className="hero-image" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>
        <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=2200&q=90" alt="Prato contemporâneo servido numa mesa elegante" />
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-content">
        <motion.p key={`${language}-eyebrow`} className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>{t.eyebrow}</motion.p>
        <motion.h1 key={`${language}-title`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .08 }}>{t.title}</motion.h1>
        <motion.p key={`${language}-body`} className="hero-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: .2 }}>{t.body}</motion.p>
        <div className="hero-actions">
          <MagneticButton>{t.cta}</MagneticButton>
          <a className="text-link" href="/menu">{t.menu}<span>↗</span></a>
        </div>
      </div>
      <p className="hero-note">{t.note}</p>
      <div className="hero-index"><span>01</span><i /><span>05</span></div>
    </section>
  );
}
