// Edit this object to update the restaurant details everywhere on the website.
export const restaurantInfo = {
  name: {
    chinese: "川粤汇",
    latin: "Chuan Yue",
  },
  address: {
    street: "Av. Frei Miguel Contreiras 54B",
    postalCode: "1700-081",
    city: "Lisboa",
    country: "Portugal",
  },
  phones: ["+351 969 680 539", "+351 21 135 5164"],
  openingHours: [
    { day: { pt: "Segunda-feira", en: "Monday" }, periods: ["11:45 — 15:00", "18:45 — 23:00"] },
    { day: { pt: "Terça-feira", en: "Tuesday" }, periods: ["11:45 — 15:00", "18:45 — 23:00"] },
    { day: { pt: "Quarta-feira", en: "Wednesday" }, periods: ["11:45 — 15:00", "18:45 — 23:00"] },
    { day: { pt: "Quinta-feira", en: "Thursday" }, periods: ["11:45 — 15:00", "18:45 — 23:00"] },
    { day: { pt: "Sexta-feira", en: "Friday" }, periods: ["11:45 — 15:00", "18:45 — 23:00"] },
    { day: { pt: "Sábado", en: "Saturday" }, periods: ["11:45 — 15:00", "18:45 — 23:00"] },
    { day: { pt: "Domingo", en: "Sunday" }, periods: ["11:45 — 15:00", "18:45 — 23:00"] },
  ],
} as const;

export const restaurantName = `${restaurantInfo.name.chinese} ${restaurantInfo.name.latin}`;
export const restaurantPhoneHrefs = restaurantInfo.phones.map(
  (phone) => `tel:${phone.replace(/[^+\d]/g, "")}`,
);
export const restaurantMapUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(
  `${restaurantInfo.address.street}, ${restaurantInfo.address.postalCode} ${restaurantInfo.address.city}, ${restaurantInfo.address.country}`,
)}`;
