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
  { pt: "Frango Gong Bao", en: "Gong Bao Chicken", notePt: "frango · amendoim · malagueta seca", noteEn: "chicken · peanuts · dried chilli", image: "/menu/gong-bao-chicken.webp" },
  { pt: "Peixe-esquilo agridoce", en: "Sweet & Sour Squirrel Fish", notePt: "pinhões · ervilhas · molho agridoce", noteEn: "pine nuts · peas · sweet-and-sour sauce", image: "/menu/sweet-and-sour-squirrel-fish.webp" },
  { pt: "Espetadas de Sichuan em óleo picante", en: "Sichuan Chilli-Oil Skewers", notePt: "raiz de lótus · sésamo · óleo de chilli", noteEn: "lotus root · sesame · chilli oil", image: "/menu/sichuan-chilli-oil-skewers.webp" },
  { pt: "Asas de frango Dry Pot", en: "Dry Pot Chicken Wings", notePt: "malagueta seca · pimento · sésamo", noteEn: "dried chilli · peppers · sesame", image: "/menu/dry-pot-chicken-wings.webp" },
  { pt: "Camarão Typhoon Shelter", en: "Typhoon Shelter Prawns", notePt: "alho crocante · malagueta seca · cebolinho", noteEn: "crispy garlic · dried chilli · spring onion", image: "/menu/typhoon-shelter-prawns.webp" },
  { pt: "Omelete crocante de vieiras", en: "Crispy Scallop Omelette", notePt: "vieiras · ovo · cebolinho", noteEn: "scallops · egg · spring onion", image: "/menu/scallop-omelette.webp" },
  { pt: "Peixe ao vapor com camarão", en: "Steamed Fish with Shrimp", notePt: "camarão · pimentos · molho de soja", noteEn: "shrimp · peppers · soy sauce", image: "/menu/steamed-fish-with-shrimp.webp" },
  { pt: "Frango picante de Chongqing", en: "Chongqing Chilli Chicken", notePt: "malagueta seca · pimenta de Sichuan · cebolinho", noteEn: "dried chilli · Sichuan pepper · spring onion", image: "/menu/chongqing-chilli-chicken.webp" },
];

const copy = {
  pt: { title: "O Nosso Menu", intro: "Pratos para partilhar, contrastes para descobrir e uma intensidade que permanece.", all: "Ver menu completo", previous: "Prato anterior", next: "Prato seguinte", select: "Mostrar" },
  en: { title: "Our Menu", intro: "Plates to share, contrasts to discover and an intensity that stays with you.", all: "View full menu", previous: "Previous dish", next: "Next dish", select: "Show" },
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
          <a href="/menu/chuan-yue-menu.pdf" target="_blank" rel="noreferrer">{t.all}<MoveRight size={18} /></a>
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
                <div className="dish-meta"><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{dish[language]}</h3><p>{language === "pt" ? dish.notePt : dish.noteEn}</p></div></div>
              </motion.article>
            );
          })}
        </motion.div>
        <button className="carousel-edge-button carousel-edge-right" onClick={() => go(1)} aria-label={t.next}><ArrowRight /></button>
      </div>
    </section>
  );
}
