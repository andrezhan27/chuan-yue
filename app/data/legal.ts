import "server-only";

type LegalDocumentUrls = {
  privacyPolicyUrl: string | null;
  termsAndConditionsUrl: string | null;
};

type RestaurantLegalRow = {
  privacy_policy_url: unknown;
  terms_and_conditions_url: unknown;
};

const FALLBACK_LEGAL_DOCUMENTS: LegalDocumentUrls = {
  privacyPolicyUrl: "/privacy",
  termsAndConditionsUrl: null,
};

function asPublicUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;

  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export async function getLegalDocumentUrls(): Promise<LegalDocumentUrls> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(
    /\/$/,
    "",
  );
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!supabaseUrl || !supabaseKey) return FALLBACK_LEGAL_DOCUMENTS;

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/restaurants?id=eq.chuanyue&select=privacy_policy_url,terms_and_conditions_url&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      console.error(`Could not load legal document URLs (${response.status}).`);
      return FALLBACK_LEGAL_DOCUMENTS;
    }

    const rows = (await response.json()) as RestaurantLegalRow[];
    const restaurant = rows[0];

    if (!restaurant) return FALLBACK_LEGAL_DOCUMENTS;

    return {
      privacyPolicyUrl:
        asPublicUrl(restaurant.privacy_policy_url) ??
        FALLBACK_LEGAL_DOCUMENTS.privacyPolicyUrl,
      termsAndConditionsUrl: asPublicUrl(
        restaurant.terms_and_conditions_url,
      ),
    };
  } catch (error) {
    console.error("Could not load legal document URLs.", error);
    return FALLBACK_LEGAL_DOCUMENTS;
  }
}
