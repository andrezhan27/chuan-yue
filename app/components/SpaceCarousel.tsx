"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

const spaces = [
  { image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90", pt: "Sala principal", en: "Main dining room" },
  { image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=2200&q=90", pt: "Mesa íntima", en: "Intimate dining" },
  { image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=2200&q=90", pt: "Luz e matéria", en: "Light and texture" },
  { image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2200&q=90", pt: "Ao cair da noite", en: "As evening falls" },
];

const copy = {
  pt: { label: "O espaço", title: "Um lugar para ficar.", body: "Luz baixa, materiais honestos e o rumor certo. Desenhado para jantares que pedem tempo.", prev: "Imagem anterior", next: "Imagem seguinte" },
  en: { label: "Our space", title: "A place to linger.", body: "Low light, honest materials and just the right murmur. Designed for dinners that deserve time.", prev: "Previous image", next: "Next image" },
};

export function SpaceCarousel() {
  const { language } = useLanguage();
  const t = copy[language];
  const [active, setActive] = useState(0);
  const go = (direction: number) => setActive((value) => (value + direction + spaces.length) % spaces.length);
  return (
    <section className="space-section" id="space">
      <div className="space-stage">
        <AnimatePresence mode="wait">
          <motion.div key={active} className="space-image image-frame" initial={{ opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7 }}>
            <img src={spaces[active].image} alt={spaces[active][language]} />
          </motion.div>
        </AnimatePresence>
        <div className="space-shade" />
        <div className="space-copy">
          <p className="section-label light"><span>04</span>{t.label}</p>
          <h2>{t.title}</h2>
          <p>{t.body}</p>
        </div>
        <div className="space-controls">
          <span className="space-caption">0{active + 1} / {spaces[active][language]}</span>
          <div><button onClick={() => go(-1)} aria-label={t.prev}><ArrowLeft /></button><button onClick={() => go(1)} aria-label={t.next}><ArrowRight /></button></div>
        </div>
        <div className="space-thumbs">
          {spaces.map((space, index) => <button className={active === index ? "active" : ""} onClick={() => setActive(index)} key={space.pt} aria-label={space[language]}><img src={space.image} alt="" /></button>)}
        </div>
      </div>
    </section>
  );
}
