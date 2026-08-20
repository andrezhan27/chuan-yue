"use client";

import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

const copy = {
  pt: {
    eyebrow: "Uma mesa à sua espera",
    title: "Reserve o seu lugar",
    body: "Almoços demorados, jantares especiais e celebrações à mesa — trate da reserva em poucos instantes.",
    action: "Fazer reserva",
    imageAlt: "Mesa preparada no Restaurante Chuan Yue",
  },
  en: {
    eyebrow: "A table awaits",
    title: "Reserve your table",
    body: "Long lunches, special dinners and celebrations around the table — book yours in just a few moments.",
    action: "Book a table",
    imageAlt: "A table set at Chuan Yue Restaurant",
  },
};

export function ReserveBanner() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <div className="reserve-banner-section" aria-labelledby="reserve-banner-title">
      <Reveal className="reserve-banner">
        <div className="reserve-banner-copy">
          <span>{t.eyebrow}</span>
          <h2 id="reserve-banner-title">{t.title}</h2>
          <p>{t.body}</p>
          <a href="/reservation">{t.action}<MoveUpRight size={19} /></a>
        </div>
        <div className="reserve-banner-image image-frame">
          <Image src="/other-images/reserve-cta.png" alt={t.imageAlt} width={1122} height={1402} sizes="(max-width: 860px) 100vw, 42vw" />
        </div>
      </Reveal>
    </div>
  );
}
