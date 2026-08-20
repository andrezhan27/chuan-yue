import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade | Chuan Yue",
  description: "Política de privacidade do Restaurante Chuan Yue.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <Link className="privacy-back" href="/">← Chuan Yue</Link>
      <article>
        <p className="privacy-eyebrow">Informação legal</p>
        <h1>Política de Privacidade</h1>
        <p className="privacy-lead">Esta página explica, de forma simples, como o Restaurante Chuan Yue trata os dados pessoais associados à utilização deste website.</p>

        <h2>Dados que podemos receber</h2>
        <p>Este website não cria contas nem recolhe diretamente dados pessoais. Ao fazer uma reserva, poderá ser encaminhado para um serviço externo, que tratará os dados necessários para gerir o pedido de acordo com a respetiva política de privacidade.</p>

        <h2>Serviços de terceiros</h2>
        <p>A página pode carregar serviços de terceiros, incluindo o Google Maps para apresentar a localização, e incluir ligações para plataformas como Uber Eats, Instagram e Facebook. Estes serviços podem tratar dados técnicos e utilizar cookies segundo as suas próprias políticas.</p>

        <h2>Contactos</h2>
        <p>Para questões relacionadas com privacidade, contacte-nos através do telefone <a href="tel:+351211355164">+351 21 135 5164</a> ou na morada Av. Frei Miguel Contreiras 54B, 1700-081 Lisboa.</p>

        <p className="privacy-updated">Última atualização: 20 de agosto de 2026.</p>
      </article>
    </main>
  );
}
