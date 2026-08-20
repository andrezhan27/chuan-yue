"use client";

import { motion } from "framer-motion";
import { getImageProps } from "next/image";
import { restaurantInfo, restaurantName } from "../data/restaurant";
import { useLanguage } from "./LanguageProvider";

const copy = {
  pt: {
    cta: "Reservar",
    menu: "Ver menu",
    imageAlt: `Fachada do restaurante ${restaurantName} em Lisboa`,
  },
  en: {
    cta: "Book a table",
    menu: "View menu",
    imageAlt: `${restaurantName} restaurant storefront in Lisbon`,
  },
};

export function Hero() {
  const { language } = useLanguage();
  const t = copy[language];
  const commonImageProps = { alt: t.imageAlt, sizes: "100vw", quality: 75 };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: "/hero/hero-desktop-v2.webp",
    width: 1672,
    height: 941,
  });
  const {
    props: { srcSet: mobileSrcSet, ...heroImageProps },
  } = getImageProps({
    ...commonImageProps,
    src: "/hero/hero-mobile-v2.webp",
    width: 941,
    height: 1672,
  });

  return (
    <section className="hero" id="top">
      <motion.div className="hero-image" initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}>
        <picture>
          <source media="(min-width: 861px)" srcSet={desktopSrcSet} />
          <source media="(max-width: 860px)" srcSet={mobileSrcSet} />
          <img {...heroImageProps} alt={t.imageAlt} fetchPriority="high" />
        </picture>
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-content">
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .08 }}><span>{restaurantInfo.name.chinese}</span> {restaurantInfo.name.latin}</motion.h1>
        <motion.div key={language} className="hero-actions" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .25 }}>
          <a className="hero-menu-cta" href="#menu-preview">{t.menu}</a>
          <a className="hero-reserve-cta" href="/reservation">{t.cta}</a>
        </motion.div>
      </div>
    </section>
  );
}
