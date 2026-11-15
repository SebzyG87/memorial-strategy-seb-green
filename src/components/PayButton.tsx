import { paymentLinkFor, serviceKind } from "@/lib/payments";

// Shows a Stripe payment button only when Seb has set the link for this service.
export function PayButton({ title }: { title: string }) {
  const link = paymentLinkFor(title);
  if (!link) return null;
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      data-seb-pay
      className="mt-3 inline-flex w-full min-h-[44px] items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold underline-offset-4 hover:underline"
      style={{ border: "1px solid currentColor" }}
    >
      {link.label}
      <span className="sr-only"> for {title} (opens Stripe)</span>
    </a>
  );
}

// "Membership" or "One-off" label shown on every service card (Goal 10).
export function ServiceTag({ title }: { title: string }) {
  const kind = serviceKind(title);
  return (
    <p data-seb-service-kind={kind} className="mt-3 text-xs font-semibold uppercase tracking-wider opacity-80">
      {kind === "Membership" ? "Membership · recurring" : "One-off service"}
    </p>
  );
}
