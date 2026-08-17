"use client";

import { Camera } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

const copy = {
  pt: { line: "Raízes em Sichuan. Alma em Lisboa.", nav: "Navegação", menu: "Menu", space: "O espaço", contact: "Contactos", legal: "Informação", privacy: "Privacidade", rights: "Todos os direitos reservados." },
  en: { line: "Rooted in Sichuan. At home in Lisbon.", nav: "Navigation", menu: "Menu", space: "Our space", contact: "Contact", legal: "Information", privacy: "Privacy", rights: "All rights reserved." },
};

export function Footer() {
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand"><a className="wordmark" href="/#top"><span>川粤</span> Chuan Yue</a><p>{t.line}</p></div>
        <div className="footer-nav"><div><span>{t.nav}</span><Link href="/menu">{t.menu}</Link><a href="/#space">{t.space}</a><a href="/#contact">{t.contact}</a></div><div><span>{t.legal}</span><a href="#">{t.privacy}</a><a href="mailto:reservations@chuanyuelisbon.com">Email</a><a href="#" aria-label="Instagram"><Camera size={16} /></a></div></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Chuan Yue. {t.rights}</span><span>Lisboa · Portugal</span></div>
    </footer>
  );
}
