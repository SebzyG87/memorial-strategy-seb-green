import { SebSiteFooter } from "@seb-os/site-design-system";

export default function Footer() {
  return <SebSiteFooter siteName="Memorial Strategy" descriptor="Compassionate memorial coordination with dignity and respect." accent="#34d399" links={[{ label: "Privacy", href: "/privacy" }]} siteUrl="https://memorial-strategy.withsebgreen.com" bookingUrl="https://calendly.com/workwithsebgreen/30min" whatsappMessage="Hi Seb, I found your Memorial Strategy website and I'd like to ask about memorial support." reviewUrl={import.meta.env.VITE_GOOGLE_REVIEW_URL || undefined} />;
}
