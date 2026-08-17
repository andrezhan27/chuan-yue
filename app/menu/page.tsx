"use client";

import { ArrowLeft, Leaf, Wheat } from "lucide-react";
import Link from "next/link";
import { Footer } from "../components/Footer";
import { LanguageProvider, useLanguage } from "../components/LanguageProvider";
import { Navbar } from "../components/Navbar";
import { Reveal } from "../components/Reveal";

const categories = [
  {
    pt: "Para começar", en: "To begin",
    dishes: [
      { pt: "Pepino esmagado", en: "Smashed cucumber", descPt: "alho, sésamo, óleo de chilli", descEn: "garlic, sesame, chilli oil", price: "8", veg: true },
      { pt: "Dumplings de porco", en: "Pork dumplings", descPt: "óleo de chilli, vinagre preto", descEn: "chilli oil, black vinegar", price: "11" },
      { pt: "Tofu de seda", en: "Silken tofu", descPt: "cebolinho, molho mala, amendoim", descEn: "spring onion, mala dressing, peanut", price: "9", veg: true },
    ],
  },
  {
    pt: "Massas & arroz", en: "Noodles & rice",
    dishes: [
      { pt: "Dan Dan Mian", en: "Dan Dan noodles", descPt: "porco, sésamo, amendoim, chilli", descEn: "pork, sesame, peanut, chilli", price: "16", gluten: true },
      { pt: "Massa Biang Biang", en: "Biang Biang noodles", descPt: "massa larga, tomate, ervas aromáticas", descEn: "wide noodles, tomato, aromatic herbs", price: "17", veg: true, gluten: true },
      { pt: "Arroz frito da casa", en: "House fried rice", descPt: "ovo, cogumelos, legumes da época", descEn: "egg, mushrooms, seasonal vegetables", price: "14", veg: true },
    ],
  },
  {
    pt: "Fogo de Sichuan", en: "Sichuan fire",
    dishes: [
      { pt: "Frango Mala", en: "Mala chicken", descPt: "pimenta seca, pimenta de Sichuan, cebolinho", descEn: "dried chilli, Sichuan pepper, spring onion", price: "19" },
      { pt: "Mapo Tofu", en: "Mapo tofu", descPt: "tofu, porco, doubanjiang, pimenta de Sichuan", descEn: "tofu, pork, doubanjiang, Sichuan pepper", price: "17" },
      { pt: "Peixe em caldo picante", en: "Fish in spicy broth", descPt: "peixe do dia, couve chinesa, rebentos", descEn: "daily fish, Chinese cabbage, sprouts", price: "24" },
      { pt: "Beringela Yu Xiang", en: "Yu Xiang aubergine", descPt: "alho, gengibre, pasta de feijão", descEn: "garlic, ginger, bean paste", price: "16", veg: true },
    ],
  },
  {
    pt: "Final doce", en: "A sweet finish",
    dishes: [
      { pt: "Gelado de sésamo preto", en: "Black sesame ice cream", descPt: "praliné de amendoim, flor de sal", descEn: "peanut praline, sea salt", price: "8", veg: true },
      { pt: "Pêra em chá de jasmim", en: "Jasmine tea pear", descPt: "arroz tostado, gengibre", descEn: "toasted rice, ginger", price: "9", veg: true },
    ],
  },
];

const copy = {
  pt: { kicker: "Chuan Yue · Lisboa", title: "O menu", intro: "Sichuan é contraste: calor e frescura, textura e delicadeza. A nossa carta foi pensada para o centro da mesa.", back: "Voltar ao início", note: "A nossa equipa terá todo o gosto em informar sobre alergénios. Os preços incluem IVA à taxa legal.", veg: "vegetariano", gluten: "contém glúten" },
  en: { kicker: "Chuan Yue · Lisbon", title: "The menu", intro: "Sichuan is contrast: heat and freshness, texture and delicacy. Our menu is designed for the centre of the table.", back: "Back to home", note: "Our team will be happy to advise on allergens. Prices include VAT at the legal rate.", veg: "vegetarian", gluten: "contains gluten" },
};

function MenuContent() {
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <>
      <Navbar />
      <main className="full-menu-page">
        <section className="menu-hero">
          <div className="menu-hero-image image-frame"><img src="https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=2200&q=90" alt="Mesa com pratos chineses para partilhar" /></div>
          <div className="menu-hero-shade" />
          <div className="menu-hero-copy"><p>{t.kicker}</p><h1>{t.title}</h1><span>{t.intro}</span></div>
        </section>
        <section className="menu-list-shell">
          <div className="menu-list-intro"><Link href="/"><ArrowLeft size={16} />{t.back}</Link><p>{t.note}</p></div>
          {categories.map((category, categoryIndex) => (
            <Reveal className="menu-category @container" key={category.pt}>
              <div className="menu-category-grid grid grid-cols-1 @4xl:grid-cols-[.55fr_1fr]">
                <div className="menu-category-title"><span>0{categoryIndex + 1}</span><h2>{category[language]}</h2></div>
                <div className="menu-dishes">
                  {category.dishes.map((dish) => (
                    <article className="menu-dish" key={dish.pt}>
                      <div><h3>{dish[language]} {dish.veg && <Leaf size={13} aria-label={t.veg} />} {dish.gluten && <Wheat size={13} aria-label={t.gluten} />}</h3><p>{language === "pt" ? dish.descPt : dish.descEn}</p></div>
                      <span>€{dish.price}</span>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function MenuPage() {
  return <LanguageProvider><MenuContent /></LanguageProvider>;
}
