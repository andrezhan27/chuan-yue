"use client";

import { motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

const dishes = [
  { pt: "Lagosta com gema de ovo salgada", en: "Salted Egg Yolk Lobster", notePt: "gema de ovo salgada · alho · malagueta", noteEn: "salted egg yolk · garlic · chilli", image: "/menu/salted-egg-yolk-lobster.webp" },
  { pt: "Caranguejo com gengibre e cebolinho", en: "Ginger & Scallion Crab", notePt: "gengibre · cebolinho · molho da casa", noteEn: "ginger · scallion · house sauce", image: "/menu/ginger-scallion-crab.webp" },
  { pt: "Mao Xue Wang", en: "Mao Xue Wang", notePt: "sangue de pato · tripas · óleo de chilli", noteEn: "duck blood · tripe · chilli oil", image: "/menu/mao-xue-wang.webp" },
  { pt: "Mapo Tofu", en: "Mapo Tofu", notePt: "tofu · porco · doubanjiang", noteEn: "tofu · pork · doubanjiang", image: "/menu/mapo-tofu.webp" },
  { pt: "Peixe-esquilo agridoce", en: "Sweet & Sour Squirrel Fish", notePt: "pinhões · ervilhas · molho agridoce", noteEn: "pine nuts · peas · sweet-and-sour sauce", image: "/menu/sweet-and-sour-squirrel-fish.webp" },
  { pt: "Espetadas de Sichuan em óleo picante", en: "Sichuan Chilli-Oil Skewers", notePt: "Raiz de lótus · batatas · pimentos", noteEn: "Lotus root · potatoes · peppers", image: "/menu/sichuan-chilli-oil-skewers.webp" },
  { pt: "Caçarola de Gambas", en: "Prawn Casserole", notePt: "gambas · legumes · molho da casa", noteEn: "prawns · vegetables · house sauce", image: "/menu/dry-pot-chicken-wings.webp" },
  { pt: "Camarão Typhoon Shelter", en: "Typhoon Shelter Prawns", notePt: "alho crocante · malagueta seca · cebolinho", noteEn: "crispy garlic · dried chilli · spring onion", image: "/menu/typhoon-shelter-prawns.webp" },
  { pt: "Gyoza Frita de Porco", en: "Fried Pork Gyoza", notePt: "porco · legumes · cebolinho", noteEn: "pork · vegetables · spring onion", image: "/menu/scallop-omelette.webp" },
  { pt: "Frango picante de Chongqing", en: "Chongqing Chilli Chicken", notePt: "malagueta seca · pimenta de Sichuan · cebolinho", noteEn: "dried chilli · Sichuan pepper · spring onion", image: "/menu/chongqing-chilli-chicken.webp" },
];

const copy = {
  pt: { title: "O Nosso Menu", intro: "Pratos para partilhar, contrastes para descobrir e uma intensidade que permanece.", all: "Ver menu completo", allTitle: "Toda a carta, à sua mesa", allBody: "Descubra os clássicos de Sichuan e Guangdong, especialidades da casa e pratos pensados para partilhar.", previous: "Prato anterior", next: "Prato seguinte", select: "Mostrar", slider: "Posição no menu" },
  en: { title: "Our Menu", intro: "Plates to share, contrasts to discover and an intensity that stays with you.", all: "View full menu", allTitle: "The full menu, at your table", allBody: "Discover Sichuan and Guangdong classics, house specialities and dishes made for sharing.", previous: "Previous dish", next: "Next dish", select: "Show", slider: "Menu position" },
};

function circularOffset(index: number, active: number) {
  let offset = (index - active + dishes.length) % dishes.length;
  if (offset > dishes.length / 2) offset -= dishes.length;
  return offset;
}

export function MenuCarousel() {
  const { language } = useLanguage();
  const t = copy[language];
  const [active, setActive] = useState(0);
  const [cardStep, setCardStep] = useState(360);
  const wheelLocked = useRef(false);

  useEffect(() => {
    const updateCardStep = () => setCardStep(Math.min(445, Math.max(292, window.innerWidth * .31)));
    updateCardStep();
    window.addEventListener("resize", updateCardStep);
    return () => window.removeEventListener("resize", updateCardStep);
  }, []);

  const go = (direction: number) => setActive((value) => (value + direction + dishes.length) % dishes.length);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 55 || Math.abs(info.velocity.x) > 450) go(info.offset.x < 0 ? 1 : -1);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) < 28 || wheelLocked.current) return;
    wheelLocked.current = true;
    go(event.deltaX > 0 ? 1 : -1);
    window.setTimeout(() => { wheelLocked.current = false; }, 480);
  };

  return (
    <section className="menu-section" id="menu-preview">
      <div className="section-heading">
        <Reveal>
          <h2>{t.title}</h2>
        </Reveal>
        <Reveal className="menu-heading-side" delay={.08}>
          <p>{t.intro}</p>
        </Reveal>
      </div>
      <div className="menu-carousel-wrap">
        <button className="carousel-edge-button carousel-edge-left" onClick={() => go(-1)} aria-label={t.previous}><ArrowLeft /></button>
        <motion.div
          className="menu-stage"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={.09}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          onWheel={handleWheel}
          role="region"
          aria-roledescription="carousel"
          aria-label={t.title}
        >
          {dishes.map((dish, index) => {
            const offset = circularOffset(index, active);
            const distance = Math.abs(offset);
            const isActive = offset === 0;
            const isAdjacent = distance === 1;
            return (
              <motion.article
                className={`dish-card ${isActive ? "active" : ""}`}
                key={dish.image}
                initial={false}
                animate={{
                  x: offset * cardStep,
                  y: isActive ? 0 : isAdjacent ? 22 : 42,
                  scale: isActive ? 1 : isAdjacent ? .84 : .68,
                  opacity: isActive ? 1 : isAdjacent ? .46 : distance === 2 ? .09 : 0,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 32, mass: .9 }}
                style={{ zIndex: isActive ? 3 : isAdjacent ? 2 : 1, pointerEvents: distance <= 1 ? "auto" : "none" }}
                onClick={() => isAdjacent && setActive(index)}
                onKeyDown={(event) => {
                  if (isAdjacent && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault();
                    setActive(index);
                  }
                }}
                role={isAdjacent ? "button" : undefined}
                tabIndex={isAdjacent ? 0 : -1}
                aria-label={isAdjacent ? `${t.select} ${dish[language]}` : undefined}
                aria-hidden={distance > 1}
              >
                <div className="dish-image image-frame"><Image src={dish.image} alt={dish[language]} width={1456} height={1092} sizes="(max-width: 860px) 77vw, 420px" /></div>
                <div className="dish-meta"><div><h3>{dish[language]}</h3><p>{language === "pt" ? dish.notePt : dish.noteEn}</p></div></div>
              </motion.article>
            );
          })}
        </motion.div>
        <button className="carousel-edge-button carousel-edge-right" onClick={() => go(1)} aria-label={t.next}><ArrowRight /></button>
        <div className="menu-carousel-position" role="group" aria-label={t.slider}>
          <span className="sr-only" aria-live="polite">{active + 1} / {dishes.length}</span>
          {dishes.map((dish, index) => (
            <button
              className={index === active ? "is-active" : undefined}
              key={dish.image}
              type="button"
              aria-label={`${t.select} ${dish[language]}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
      <div className="menu-full-card-shell">
        <Reveal className="menu-full-card">
          <div className="menu-full-copy">
            <span>{t.title}</span>
            <h3>{t.allTitle}</h3>
            <p>{t.allBody}</p>
            <a href="/menu/chuan-yue-menu.pdf" target="_blank" rel="noreferrer">{t.all}<MoveRight size={19} /></a>
          </div>
          <div className="menu-full-image image-frame">
            <Image src="/menu/dish-2.png" alt="" width={1448} height={1086} sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
