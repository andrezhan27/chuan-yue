"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import logoBg from "../../public/other-images/logo-bg.png";
import { restaurantInfo } from "../data/restaurant";
import { useLanguage } from "./LanguageProvider";

const copy = {
  pt: { menu: "Menu", space: "O espaço", highlights: "Destaques", contact: "Contactos", book: "Reservar", language: "Selecionar idioma", home: "início", open: "Abrir menu", close: "Fechar menu", navigation: "Navegação principal" },
  en: { menu: "Menu", space: "Our space", highlights: "Highlights", contact: "Contact", book: "Book a table", language: "Select language", home: "home", open: "Open menu", close: "Close menu", navigation: "Main navigation" },
};

const sectionIds = ["menu-preview", "space", "contact", "highlights"] as const;
type SectionId = (typeof sectionIds)[number];

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const t = copy[language];
  return (
    <div className="language-toggle" aria-label={t.language}>
      <button onClick={() => setLanguage("pt")} aria-pressed={language === "pt"}>PT</button>
      <span aria-hidden="true">/</span>
      <button onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
    </div>
  );
}

export function Navbar() {
  const { language } = useLanguage();
  const t = copy[language];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      const marker = window.scrollY + window.innerHeight * .42;
      let current: SectionId | null = null;
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top + window.scrollY <= marker) current = id;
      });
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleHomeClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (window.location.pathname !== "/") return;
    event.preventDefault();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
      <nav className="nav-shell" aria-label={t.navigation}>
        <Link className="brand-lockup" href="/" onClick={handleHomeClick} aria-label={`${restaurantInfo.name.latin}, ${t.home}`}>
          <Image className="brand-logo" src={logoBg} alt="" width={54} height={54} priority />
          <span className="wordmark"><span>{restaurantInfo.name.chinese}</span> {restaurantInfo.name.latin}</span>
        </Link>
        <div className="nav-links nav-links-center">
          <Link className={activeSection === "menu-preview" ? "is-active" : undefined} aria-current={activeSection === "menu-preview" ? "location" : undefined} href="/#menu-preview">{t.menu}</Link>
          <Link className={activeSection === "space" ? "is-active" : undefined} aria-current={activeSection === "space" ? "location" : undefined} href="/#space">{t.space}</Link>
          <Link className={activeSection === "contact" ? "is-active" : undefined} aria-current={activeSection === "contact" ? "location" : undefined} href="/#contact">{t.contact}</Link>
          <Link className={activeSection === "highlights" ? "is-active" : undefined} aria-current={activeSection === "highlights" ? "location" : undefined} href="/#highlights">{t.highlights}</Link>
        </div>
        <div className="nav-actions">
          <LanguageToggle />
          <Link className="nav-book" href="/reservation">{t.book}</Link>
        </div>
        <div className="mobile-actions">
          <LanguageToggle />
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? t.close : t.open}>{open ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Link className={activeSection === "menu-preview" ? "is-active" : undefined} href="/#menu-preview" onClick={() => setOpen(false)}>{t.menu}<span>01</span></Link>
            <Link className={activeSection === "space" ? "is-active" : undefined} href="/#space" onClick={() => setOpen(false)}>{t.space}<span>02</span></Link>
            <Link className={activeSection === "contact" ? "is-active" : undefined} href="/#contact" onClick={() => setOpen(false)}>{t.contact}<span>03</span></Link>
            <Link className={activeSection === "highlights" ? "is-active" : undefined} href="/#highlights" onClick={() => setOpen(false)}>{t.highlights}<span>04</span></Link>
            <Link className="mobile-book" href="/reservation" onClick={() => setOpen(false)}>{t.book}</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
