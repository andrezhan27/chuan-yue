"use client";

import Link from "next/link";
import { restaurantInfo } from "../data/restaurant";
import { useLanguage } from "./LanguageProvider";

const copy = {
  pt: { line: "Raízes em Sichuan. Alma em Lisboa.", nav: "Navegação", menu: "O Nosso Menu", space: "O Nosso Espaço", contact: "Contactos", privacy: "Privacidade" },
  en: { line: "Rooted in Sichuan. At home in Lisbon.", nav: "Navigation", menu: "Our Menu", space: "Our Space", contact: "Contacts", privacy: "Privacy" },
};

export function Footer() {
  const { language } = useLanguage();
  const t = copy[language];
  const configuredPrivacyUrl = process.env.NEXT_PUBLIC_PRIVACY_URL?.trim();
  const privacyUrl =
    configuredPrivacyUrl?.startsWith("https://") ||
    configuredPrivacyUrl?.startsWith("http://")
      ? configuredPrivacyUrl
      : undefined;
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand"><Link className="wordmark" href="/"><span>{restaurantInfo.name.chinese}</span> {restaurantInfo.name.latin}</Link><p>{t.line}</p></div>
        <div className="footer-nav"><div><span>{t.nav}</span><a href="/menu/chuan-yue-menu.pdf" target="_blank" rel="noreferrer">{t.menu}</a><Link href="/#space">{t.space}</Link><Link href="/#contact">{t.contact}</Link></div></div>
      </div>
      <div className="footer-bottom"><div><a href="https://intelis.pt" target="_blank" rel="noreferrer">Designed by Intelis. All Rights Reserved.</a>{privacyUrl && <a href={privacyUrl} target="_blank" rel="noreferrer">{t.privacy}</a>}</div><span>{restaurantInfo.address.city} · {restaurantInfo.address.country}</span></div>
    </footer>
  );
}
