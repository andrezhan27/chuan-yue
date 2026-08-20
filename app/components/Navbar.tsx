"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { restaurantInfo } from "../data/restaurant";
import { useLanguage, type Language } from "./LanguageProvider";

const copy = {
  pt: { menu: "Menu", space: "O espaço", contact: "Contactos", book: "Reservar", language: "Selecionar idioma", home: "início", open: "Abrir menu", close: "Fechar menu", navigation: "Navegação principal" },
  en: { menu: "Menu", space: "Our space", contact: "Contact", book: "Book a table", language: "Select language", home: "home", open: "Open menu", close: "Close menu", navigation: "Main navigation" },
};

export function LanguageToggle({ id = "desktop" }: { id?: string }) {
  const { language, setLanguage } = useLanguage();
  const t = copy[language];
  return (
    <div className="language-toggle" aria-label={t.language}>
      {(["pt", "en"] as Language[]).map((item) => (
        <button key={item} onClick={() => setLanguage(item)} aria-pressed={language === item}>
          {language === item && <motion.span layoutId={`language-pill-${id}`} className="language-pill" />}
          <span>{item.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { language } = useLanguage();
  const t = copy[language];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
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
        <div className="nav-links nav-links-left">
          <Link href="/#menu-preview">{t.menu}</Link>
          <Link href="/#space">{t.space}</Link>
        </div>
        <Link className="wordmark" href="/" onClick={handleHomeClick} aria-label={`${restaurantInfo.name.latin}, ${t.home}`}>
          <span>{restaurantInfo.name.chinese}</span> {restaurantInfo.name.latin}
        </Link>
        <div className="nav-links nav-links-right">
          <Link href="/#contact">{t.contact}</Link>
          <LanguageToggle id="desktop" />
          <Link className="nav-book" href="/reservation">{t.book}</Link>
        </div>
        <div className="mobile-actions">
          <LanguageToggle id="mobile" />
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? t.close : t.open}>{open ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Link href="/#menu-preview" onClick={() => setOpen(false)}>{t.menu}<span>01</span></Link>
            <Link href="/#space" onClick={() => setOpen(false)}>{t.space}<span>02</span></Link>
            <Link href="/#contact" onClick={() => setOpen(false)}>{t.contact}<span>03</span></Link>
            <Link className="mobile-book" href="/reservation" onClick={() => setOpen(false)}>{t.book}</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
