"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

const copy = {
  pt: { line: "Raízes em Sichuan. Alma em Lisboa.", nav: "Navegação", menu: "Menu", space: "O espaço", contact: "Contactos", legal: "Informação", privacy: "Privacidade" },
  en: { line: "Rooted in Sichuan. At home in Lisbon.", nav: "Navigation", menu: "Menu", space: "Our space", contact: "Contact", legal: "Information", privacy: "Privacy" },
};

export function Footer() {
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand"><Link className="wordmark" href="/#top"><span>川粤</span> Chuan Yue</Link><p>{t.line}</p></div>
        <div className="footer-nav"><div><span>{t.nav}</span><Link href="/menu">{t.menu}</Link><Link href="/#space">{t.space}</Link><Link href="/#contact">{t.contact}</Link></div><div><span>{t.legal}</span><span className="footer-static-link">{t.privacy}</span></div></div>
      </div>
      <div className="footer-bottom"><a href="https://intelis.pt" target="_blank" rel="noreferrer">Designed by Intelis. All Rights Reserve.</a><span>Lisboa · Portugal</span></div>
    </footer>
  );
}
