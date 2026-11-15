import { SebSiteHeader } from "@seb-os/site-design-system";

const links = [
  { label: "Approach", href: "#approach" },
  { label: "Services", href: "#services" },
  { label: "Options", href: "#pricing" },
  { label: "Examples", href: "#examples" },
];

export default function Navigation() {
  return <SebSiteHeader siteName="Memorial Strategy" links={links} accent="#34d399" />;
}
