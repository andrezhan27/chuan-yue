"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

const spaces = [
  { image: "/space/private-dining-room.webp", pt: "Sala privada", en: "Private dining room" },
  { image: "/space/banquet-table-setting-v2.webp", pt: "Mesa de banquete", en: "Banquet table" },
  { image: "/space/floral-banquet-table.webp", pt: "Mesa para celebrações", en: "Celebration table" },
  { image: "/space/main-dining-room.webp", pt: "Sala principal", en: "Main dining room" },
];

const copy = {
  pt: { title: "O Nosso Espaço" },
  en: { title: "Our Space" },
};

export function SpaceCarousel() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="space-section" id="space" aria-labelledby="space-title">
      <motion.h2
        id="space-title"
        className="space-title"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: .5 }}
        transition={{ duration: .6 }}
      >
        {t.title}
      </motion.h2>
      <div className="space-mosaic">
        {spaces.map((space, index) => (
          <motion.figure
            className="space-tile image-frame"
            key={space.image}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .18 }}
            transition={{ duration: .65, delay: index * .06 }}
          >
            <Image src={space.image} alt={space[language]} fill sizes="(max-width: 860px) calc(100vw - 32px), 50vw" />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
