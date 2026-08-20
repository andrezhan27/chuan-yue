import type { MetadataRoute } from "next";
import { siteUrl } from "./data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl.toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/reservation", siteUrl).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
