import type { Metadata } from "next";
import { restaurantInfo } from "../data/restaurant";

const title = `Reservas | ${restaurantInfo.name.latin}`;
const description = `Reserve a sua mesa no ${restaurantInfo.name.latin}, em Lisboa.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/reservation" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_PT",
    url: "/reservation",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function ReservationPage() {
  return (
    <main className="reservation-page">
      <iframe
        className="reservation-frame"
        src="https://reserve.intelis.pt/chuanyue"
        title={`${restaurantInfo.name.latin} table reservation`}
        allow="payment"
      />
    </main>
  );
}
