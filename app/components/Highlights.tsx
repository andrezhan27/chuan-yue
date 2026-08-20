"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

const highlights = [
  {
    image: "/other-images/award-1.png",
    pt: "Distinções Lisboa à Prova",
    en: "Lisboa à Prova distinctions",
  },
  {
    image: "/other-images/award-2.png",
    pt: "Um reconhecimento partilhado com a nossa equipa",
    en: "A recognition shared with our team",
  },
  {
    image: "/other-images/award-3.png",
    pt: "A cozinha Chuan Yue na televisão portuguesa",
    en: "Chuan Yue cuisine on Portuguese television",
  },
];

const copy = {
  pt: {
    eyebrow: "Reconhecimento",
    title: "Destaques",
    intro: "Levamos os sabores autênticos de Sichuan até Lisboa, respeitando as receitas, os ingredientes e a intensidade que definem a nossa cozinha.",
    body: "Cada distinção recebida pertence também a quem se senta à nossa mesa. É a confiança dos nossos clientes que nos inspira a continuar, prato após prato.",
  },
  en: {
    eyebrow: "Recognition",
    title: "Highlights",
    intro: "We bring the authentic flavours of Sichuan to Lisbon, respecting the recipes, ingredients and intensity that define our cuisine.",
    body: "Every distinction we receive also belongs to those who sit at our tables. Our guests’ trust inspires us to keep going, one dish at a time.",
  },
};

export function Highlights() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="highlights-section" id="highlights" aria-labelledby="highlights-title">
      <div className="highlights-heading">
        <Reveal>
          <span>{t.eyebrow}</span>
          <h2 id="highlights-title">{t.title}</h2>
        </Reveal>
        <Reveal className="highlights-copy" delay={.08}>
          <p>{t.intro}</p>
          <p>{t.body}</p>
        </Reveal>
      </div>

      <div className="highlights-gallery">
        {highlights.map((highlight, index) => (
          <Reveal className="highlight-card" delay={index * .06} key={highlight.image}>
            <figure>
              <div className="highlight-image image-frame">
                <Image src={highlight.image} alt={highlight[language]} fill sizes="(max-width: 860px) 100vw, 33vw" />
              </div>
              <figcaption>{highlight[language]}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
