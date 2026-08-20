"use client";

import { Clock3, MapPin, MoveUpRight, Phone } from "lucide-react";
import { restaurantInfo, restaurantMapUrl, restaurantPhoneHref } from "../data/restaurant";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

const copy = {
  pt: { title: "Contacte-nos", body: "Para jantares, celebrações ou apenas porque sim. Reserve e deixe o resto connosco.", reserve: "Fazer reserva", location: "Morada", hours: "Horário", closed: "Encerrado", contact: "Contacto", map: "Abrir no mapa" },
  en: { title: "Contact Us", body: "For dinner, a celebration, or simply because. Book your table and leave the rest to us.", reserve: "Make a reservation", location: "Location", hours: "Opening hours", closed: "Closed", contact: "Contact", map: "Open in maps" },
};

export function Contact() {
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <section className="contact-section @container" id="contact">
      <div className="contact-grid grid grid-cols-1 @5xl:grid-cols-2">
        <Reveal className="contact-intro">
          <h2>{t.title}</h2>
          <p>{t.body}</p>
          <a className="contact-cta" href="/reservation">{t.reserve}<MoveUpRight size={18} /></a>
        </Reveal>
        <Reveal className="contact-details" delay={.1}>
          <div className="contact-row"><MapPin /><div><span>{t.location}</span><p>{restaurantInfo.address.street}<br />{restaurantInfo.address.postalCode} {restaurantInfo.address.city}, {restaurantInfo.address.country}</p><a href={restaurantMapUrl} target="_blank" rel="noreferrer">{t.map} ↗</a></div></div>
          <div className="contact-row"><Clock3 /><div><span>{t.hours}</span><div className="hours-list">{restaurantInfo.openingHours.map((entry) => <div className="hours-entry" key={entry.day.en}><span className="hours-day">{entry.day[language]}</span><p className={entry.periods.length === 0 ? "is-closed" : ""}>{entry.periods.length > 0 ? entry.periods.join("\n") : t.closed}</p></div>)}</div></div></div>
          <div className="contact-row"><Phone /><div><span>{t.contact}</span><p><a href={restaurantPhoneHref}>{restaurantInfo.phone}</a></p></div></div>
        </Reveal>
      </div>
    </section>
  );
}
