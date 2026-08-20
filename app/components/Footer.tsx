"use client";

import Link from "next/link";
import Image from "next/image";
import { restaurantInfo } from "../data/restaurant";
import { useLanguage } from "./LanguageProvider";
import logoBg from "../../public/other-images/logo-bg.png";

const copy = {
  pt: { line: "Raízes em Sichuan. Alma em Lisboa.", nav: "Navegação", menu: "O Nosso Menu", space: "O Nosso Espaço", contact: "Contactos", legal: "Informação", privacy: "Política de privacidade", complaints: "Livro de Reclamações", social: "Siga-nos" },
  en: { line: "Rooted in Sichuan. At home in Lisbon.", nav: "Navigation", menu: "Our Menu", space: "Our Space", contact: "Contact", legal: "Information", privacy: "Privacy policy", complaints: "Complaints book", social: "Follow us" },
};

export function Footer() {
  const { language } = useLanguage();
  const t = copy[language];
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="footer-brand-lockup" href="/">
            <Image src={logoBg} alt="" width={74} height={74} />
            <span className="wordmark"><span>{restaurantInfo.name.chinese}</span> {restaurantInfo.name.latin}</span>
          </Link>
          <p>{t.line}</p>
        </div>
        <div className="footer-nav">
          <div><span>{t.nav}</span><a href="/menu/chuan-yue-menu.pdf" target="_blank" rel="noreferrer">{t.menu}</a><Link href="/#space">{t.space}</Link><Link href="/#contact">{t.contact}</Link></div>
          <div><span>{t.legal}</span><Link href="/privacy">{t.privacy}</Link><a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noreferrer">{t.complaints}</a></div>
          <div><span>{t.social}</span><a href="https://www.instagram.com/chuanyuept/?hl=en" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/restaurantechuanyue/photos/" target="_blank" rel="noreferrer">Facebook</a></div>
        </div>
      </div>
      <div className="footer-bottom"><a href="https://intelis.pt" target="_blank" rel="noreferrer">Designed by Intelis. All Rights Reserved.</a><span>{restaurantInfo.address.city} · {restaurantInfo.address.country}</span></div>
    </footer>
  );
}
