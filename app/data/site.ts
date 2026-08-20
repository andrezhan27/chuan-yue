const FALLBACK_SITE_URL = "http://localhost:3000";

function resolveSiteUrl(): URL {
  const configuredUrl = process.env.SITE_URL?.trim();
  const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const value =
    configuredUrl ||
    (vercelProductionHost ? `https://${vercelProductionHost}` : FALLBACK_SITE_URL);

  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("Unsupported protocol");
    }
    return url;
  } catch {
    throw new Error(
      `Invalid SITE_URL: "${value}". Set it to an absolute URL such as https://example.com.`,
    );
  }
}

export const siteUrl = resolveSiteUrl();
