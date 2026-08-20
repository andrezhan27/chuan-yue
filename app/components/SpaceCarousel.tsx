"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { ReserveBanner } from "./ReserveBanner";

const spaces = [
  { image: "/space/space-1.webp", pt: "Sala principal do restaurante", en: "Main dining room" },
  { image: "/space/space-2.webp", pt: "Interior do Chuan Yue", en: "Chuan Yue interior" },
  { image: "/space/space-3.webp", pt: "Mesa preparada para receber", en: "A table set for guests" },
  { image: "/space/space-4.webp", pt: "Detalhes da sala", en: "Dining room details" },
  { image: "/space/space-5.webp", pt: "Ambiente do restaurante", en: "Restaurant atmosphere" },
  { image: "/space/space-6.webp", pt: "Espaço para celebrar", en: "A space for celebrations" },
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
      <ReserveBanner />
    </section>
  );
}
