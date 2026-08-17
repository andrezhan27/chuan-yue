"use client";

import { Clock3, MapPin, MoveUpRight, Phone } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

const copy = {
  pt: { label: "Visite-nos", title: "A sua mesa espera.", body: "Para jantares, celebrações ou apenas porque sim. Reserve e deixe o resto connosco.", reserve: "Fazer reserva", location: "Morada", hours: "Horário", schedule: "Terça — Domingo\n18:30 — 23:00", closed: "Encerrado à segunda", contact: "Contacto", map: "Abrir no mapa" },
  en: { label: "Visit us", title: "Your table awaits.", body: "For dinner, a celebration, or simply because. Book your table and leave the rest to us.", reserve: "Make a reservation", location: "Location", hours: "Opening hours", schedule: "Tuesday — Sunday\n18:30 — 23:00", closed: "Closed on Mondays", contact: "Contact", map: "Open in maps" },
};

export function Contact() {
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <section className="contact-section @container" id="contact">
      <div className="contact-grid grid grid-cols-1 @5xl:grid-cols-2">
        <Reveal className="contact-intro">
          <p className="section-label"><span>05</span>{t.label}</p>
          <h2>{t.title}</h2>
          <p>{t.body}</p>
          <a className="contact-cta" href="mailto:reservations@chuanyuelisbon.com">{t.reserve}<MoveUpRight size={18} /></a>
        </Reveal>
        <Reveal className="contact-details" delay={.1}>
          <div className="contact-row"><MapPin /><div><span>{t.location}</span><p>Rua do Carmo 15<br />1200-093 Lisboa, Portugal</p><a href="https://www.openstreetmap.org/search?query=Rua%20do%20Carmo%2015%20Lisboa" target="_blank" rel="noreferrer">{t.map} ↗</a></div></div>
          <div className="contact-row"><Clock3 /><div><span>{t.hours}</span><p>{t.schedule}</p><small>{t.closed}</small></div></div>
          <div className="contact-row"><Phone /><div><span>{t.contact}</span><p><a href="tel:+351210123456">+351 210 123 456</a><br /><a href="mailto:reservations@chuanyuelisbon.com">reservations@chuanyuelisbon.com</a></p></div></div>
        </Reveal>
      </div>
    </section>
  );
}
