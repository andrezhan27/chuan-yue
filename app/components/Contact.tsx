"use client";

import { CalendarDays, Clock3, MapPin, MoveUpRight, Phone, ShoppingBag } from "lucide-react";
import { restaurantInfo, restaurantMapUrl, restaurantPhoneHref } from "../data/restaurant";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";

const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.766294450323!2d-9.141707824024135!3d38.74612487175668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1933af3967ebd7%3A0xd66b04ac42bacd40!2sChuan%20Yue!5e0!3m2!1sen!2spt!4v1787240481200!5m2!1sen!2spt";
const uberEatsUrl = "https://www.ubereats.com/pt-en/store/restaurante-chuan-yue/5hvwd9RLT5WVLKj03rYaww";

const copy = {
  pt: {
    eyebrow: "Contactos",
    title: "Contacte-nos",
    body: "Encontre-nos em Alvalade, em Lisboa. Para reservas ou questões, estamos à distância de um telefonema.",
    reserve: "Reservar mesa",
    reservations: "Reservas",
    location: "Morada",
    hours: "Horário",
    regularDays: "Todos os dias",
    contact: "Telefone",
    map: "Abrir no Google Maps",
    mapTitle: "Localização do Restaurante Chuan Yue no Google Maps",
    deliveryEyebrow: "Chuan Yue em casa",
    deliveryTitle: "Peça através da Uber Eats",
    deliveryBody: "Os sabores da nossa cozinha, entregues à sua porta.",
    deliveryAction: "Pedir agora",
  },
  en: {
    eyebrow: "Contact",
    title: "Contact Us",
    body: "Find us in Alvalade, Lisbon. For reservations or questions, we are only a phone call away.",
    reserve: "Book a table",
    reservations: "Reservations",
    location: "Address",
    hours: "Opening hours",
    regularDays: "Every day",
    contact: "Phone",
    map: "Open in Google Maps",
    mapTitle: "Chuan Yue Restaurant location on Google Maps",
    deliveryEyebrow: "Chuan Yue at home",
    deliveryTitle: "Order through Uber Eats",
    deliveryBody: "The flavours of our kitchen, delivered to your door.",
    deliveryAction: "Order now",
  },
};

export function Contact() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <Reveal className="contact-heading">
        <span>{t.eyebrow}</span>
        <h2 id="contact-title">{t.title}</h2>
        <p>{t.body}</p>
      </Reveal>

      <div className="contact-layout">
        <Reveal className="contact-details">
          <div className="contact-row">
            <MapPin />
            <div>
              <span>{t.location}</span>
              <p>{restaurantInfo.address.street}<br />{restaurantInfo.address.postalCode} {restaurantInfo.address.city}, {restaurantInfo.address.country}</p>
              <a href={restaurantMapUrl} target="_blank" rel="noreferrer">{t.map} ↗</a>
            </div>
          </div>
          <div className="contact-row">
            <Clock3 />
            <div>
              <span>{t.hours}</span>
              <div className="hours-summary">
                <div><strong>{t.regularDays}</strong><p>11:45 — 15:00<br />18:45 — 23:00</p></div>
              </div>
            </div>
          </div>
          <div className="contact-row">
            <Phone />
            <div>
              <span>{t.contact}</span>
              <p><a href={restaurantPhoneHref}>{restaurantInfo.phone}</a></p>
            </div>
          </div>
          <div className="contact-row contact-reservation-row">
            <CalendarDays />
            <div>
              <span>{t.reservations}</span>
              <a className="contact-reserve-cta" href="/reservation">{t.reserve}<MoveUpRight size={18} /></a>
            </div>
          </div>
        </Reveal>

        <Reveal className="contact-map" delay={.08}>
          <iframe
            src={mapEmbedUrl}
            title={t.mapTitle}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </Reveal>
      </div>

      <Reveal className="delivery-card">
        <ShoppingBag aria-hidden="true" />
        <div>
          <span>{t.deliveryEyebrow}</span>
          <h3>{t.deliveryTitle}</h3>
          <p>{t.deliveryBody}</p>
        </div>
        <a href={uberEatsUrl} target="_blank" rel="noreferrer">{t.deliveryAction}<MoveUpRight size={19} /></a>
      </Reveal>
    </section>
  );
}
