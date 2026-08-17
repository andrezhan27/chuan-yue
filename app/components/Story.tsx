"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

const copy = {
  pt: {
    label: "A nossa cozinha",
    title: "Entre o calor da wok e a delicadeza do tempo.",
    body: "Na Chuan Yue, cada prato nasce do equilíbrio. O picante não encobre: revela. As especiarias são torradas, os caldos descansam e a massa é trabalhada à mão. Uma cozinha com raízes em Sichuan e uma expressão naturalmente lisboeta.",
    quote: "Intenso por natureza. Preciso por escolha.",
  },
  en: {
    label: "Our kitchen",
    title: "Between the heat of the wok and the delicacy of time.",
    body: "At Chuan Yue, every dish begins with balance. Heat does not conceal: it reveals. Spices are toasted, broths are left to deepen and noodles are worked by hand. A kitchen rooted in Sichuan with a distinctly Lisbon expression.",
    quote: "Intense by nature. Precise by choice.",
  },
};

export function Story() {
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <section className="story-section @container" id="story">
      <div className="story-grid grid grid-cols-1 @4xl:grid-cols-2">
        <Reveal className="story-copy">
          <p className="section-label"><span>02</span>{t.label}</p>
          <h2>{t.title}</h2>
          <p className="story-body">{t.body}</p>
          <p className="story-quote">“{t.quote}”</p>
        </Reveal>
        <Reveal className="story-visual" delay={.12}>
          <div className="story-image image-frame"><img src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=88" alt="Dumplings artesanais acabados de preparar" /></div>
          <div className="story-detail image-frame"><img src="https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=88" alt="Massa chinesa feita à mão" /></div>
          <span className="chinese-stamp">川<br />味</span>
        </Reveal>
      </div>
    </section>
  );
}
