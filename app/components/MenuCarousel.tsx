"use client";

import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

const dishes = [
  { pt: "Frango Mala", en: "Mala Chicken", note: "花椒 · pimenta seca", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1000&q=88" },
  { pt: "Dumplings de porco", en: "Pork Dumplings", note: "óleo de chilli · vinagre preto", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=88" },
  { pt: "Dan Dan Mian", en: "Dan Dan Noodles", note: "sésamo · porco · amendoim", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1000&q=88" },
  { pt: "Beringela Yu Xiang", en: "Yu Xiang Aubergine", note: "alho · gengibre · feijão", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=88" },
  { pt: "Peixe em caldo picante", en: "Spicy Broth Fish", note: "doubanjiang · rebentos", image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1000&q=88" },
];

const copy = {
  pt: { label: "À mesa", title: "Uma viagem pelo menu", intro: "Pratos para partilhar, contrastes para descobrir e uma intensidade que permanece.", all: "Ver menu completo", previous: "Prato anterior", next: "Prato seguinte" },
  en: { label: "At the table", title: "A journey through the menu", intro: "Plates to share, contrasts to discover and an intensity that stays with you.", all: "View full menu", previous: "Previous dish", next: "Next dish" },
};

export function MenuCarousel() {
  const { language } = useLanguage();
  const t = copy[language];
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const go = (direction: number) => {
    const index = (active + direction + dishes.length) % dishes.length;
    setActive(index);
    const item = track.current?.children[index] as HTMLElement | undefined;
    if (item && track.current) track.current.scrollTo({ left: item.offsetLeft - track.current.offsetLeft, behavior: "smooth" });
  };
  return (
    <section className="menu-section" id="menu-preview">
      <div className="section-heading">
        <Reveal>
          <p className="section-label light"><span>03</span>{t.label}</p>
          <h2>{t.title}</h2>
        </Reveal>
        <Reveal className="menu-heading-side" delay={.08}>
          <p>{t.intro}</p>
          <Link href="/menu">{t.all}<MoveRight size={18} /></Link>
        </Reveal>
      </div>
      <div className="menu-carousel-wrap">
        <div className="menu-track" ref={track}>
          {dishes.map((dish, index) => (
            <article className={`dish-card ${active === index ? "active" : ""}`} key={dish.pt}>
              <div className="dish-image image-frame"><img src={dish.image} alt={dish[language]} /></div>
              <div className="dish-meta"><span>0{index + 1}</span><div><h3>{dish[language]}</h3><p>{dish.note}</p></div></div>
            </article>
          ))}
        </div>
        <div className="carousel-footer">
          <div className="carousel-progress"><span>{String(active + 1).padStart(2, "0")}</span><i><b style={{ width: `${((active + 1) / dishes.length) * 100}%` }} /></i><span>0{dishes.length}</span></div>
          <div className="carousel-buttons">
            <button onClick={() => go(-1)} aria-label={t.previous}><ArrowLeft /></button>
            <button onClick={() => go(1)} aria-label={t.next}><ArrowRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
