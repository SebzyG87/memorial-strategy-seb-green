// Stripe Payment Links for fixed-price services.
// Seb creates each link in Stripe and sets the matching VITE_STRIPE_LINK_* variable
// in Vercel (Production). An empty or missing variable hides that button, and the
// existing enquiry / booking route stays as it is.
const LINKS: Record<string, { href?: string; label: string }> = {
  "The Broadcast": { href: import.meta.env.VITE_STRIPE_LINK_BROADCAST, label: "Book & pay £250" },
  "The Visual Tribute": { href: import.meta.env.VITE_STRIPE_LINK_VISUAL_TRIBUTE, label: "Book & pay £200" },
};

export function paymentLinkFor(title: string) {
  const entry = LINKS[title];
  const href = (entry?.href || "").trim();
  return entry && href.startsWith("https://") ? { href, label: entry.label } : null;
}

// Goal 10: every service is tagged Membership (recurring by nature) or One-off.
const MEMBERSHIP: string[] = [];

export function serviceKind(title: string): "Membership" | "One-off" {
  const base = title.replace(/ (monthly|yearly)$/, "");
  return MEMBERSHIP.includes(base) ? "Membership" : "One-off";
}
