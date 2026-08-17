"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage, type Language } from "./LanguageProvider";

const copy = {
  pt: { menu: "Menu", space: "O espaço", contact: "Contactos", book: "Reservar" },
  en: { menu: "Menu", space: "Our space", contact: "Contact", book: "Book a table" },
};

export function LanguageToggle({ id = "desktop" }: { id?: string }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="language-toggle" aria-label="Selecionar idioma">
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
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
      <nav className="nav-shell" aria-label="Navegação principal">
        <div className="nav-links nav-links-left">
          <Link href="/menu">{t.menu}</Link>
          <a href="/#space">{t.space}</a>
        </div>
        <a className="wordmark" href="/#top" aria-label="Chuan Yue, início">
          <span>川粤</span> Chuan Yue
        </a>
        <div className="nav-links nav-links-right">
          <a href="/#contact">{t.contact}</a>
          <LanguageToggle id="desktop" />
          <a className="nav-book" href="/#contact">{t.book}</a>
        </div>
        <div className="mobile-actions">
          <LanguageToggle id="mobile" />
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <Link href="/menu" onClick={() => setOpen(false)}>{t.menu}<span>01</span></Link>
            <a href="/#space" onClick={() => setOpen(false)}>{t.space}<span>02</span></a>
            <a href="/#contact" onClick={() => setOpen(false)}>{t.contact}<span>03</span></a>
            <a className="mobile-book" href="/#contact" onClick={() => setOpen(false)}>{t.book}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
