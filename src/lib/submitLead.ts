// Saves a website enquiry to Seb Green's shared Supabase "leads" table.
// The table allows anonymous INSERTs (see Strategic Growth supabase/migrations).
// The anon key below is a public, browser-safe key (row level security applies).
// Email alerts are sent server-side by the "lead-alert" Supabase Edge Function
// (see Strategic Growth supabase/functions/lead-alert). The saved row is the
// source of truth: if the email fails, the lead is still stored.
const LEADS_URL = "https://hhqsbizftwtgfuivuyxm.supabase.co/rest/v1/leads";
const LEADS_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhocXNiaXpmdHd0Z2Z1aXZ1eXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2OTM5NjgsImV4cCI6MjA4NzI2OTk2OH0.GvftmIcdIpBEZqJvxsl8aG0N3rMrckgmS76qZHgbZII";

export const CONTACT_EMAIL = "workwithsebgreen@gmail.com";
export const CONTACT_PHONE_DISPLAY = "07903 325057";
export const CONTACT_PHONE_TEL = "tel:+447903325057";

/** Name of the hidden anti-spam field. Real visitors never see or fill it. */
export const HONEYPOT_FIELD = "company_website";
const THROTTLE_KEY = "seb-lead-last-sent";
const THROTTLE_MS = 30_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface LeadInput {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface SubmitOptions {
  /** Value of the hidden honeypot field. Anything in it means a bot. */
  honeypot?: string;
  /** Feedback forms may leave the email empty. */
  allowEmptyEmail?: boolean;
}

export class LeadValidationError extends Error {}

function lastSent(): number {
  try {
    return Number(window.localStorage.getItem(THROTTLE_KEY) || 0);
  } catch {
    return 0;
  }
}

function markSent() {
  try {
    window.localStorage.setItem(THROTTLE_KEY, String(Date.now()));
  } catch {
    /* storage unavailable: no throttle, still fine */
  }
}

/** Resolves only when the enquiry was stored. Throws if it was not. */
export async function submitLead(lead: LeadInput, site: string, options: SubmitOptions = {}): Promise<void> {
  // Bots fill every field. Pretend it worked and send nothing.
  if (options.honeypot && options.honeypot.trim() !== "") return;

  const name = lead.name.trim().slice(0, 100);
  const email = lead.email.trim().slice(0, 255);
  const service = lead.service.trim().slice(0, 200);
  const message = lead.message.trim().slice(0, 2000);
  if (!name) throw new LeadValidationError("Name is required");
  if (email ? !EMAIL_RE.test(email) : !options.allowEmptyEmail) throw new LeadValidationError("A valid email is required");
  if (!message) throw new LeadValidationError("Message is required");
  if (Date.now() - lastSent() < THROTTLE_MS) throw new LeadValidationError("Please wait a moment before sending again");

  const res = await fetch(LEADS_URL, {
    method: "POST",
    headers: {
      apikey: LEADS_ANON_KEY,
      Authorization: `Bearer ${LEADS_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name,
      email,
      service_interest: `${site}: ${service}`.slice(0, 300),
      message,
      source_url: typeof window !== "undefined" ? window.location.href : site,
    }),
  });
  if (!res.ok) {
    throw new Error(`Enquiry was not saved (HTTP ${res.status})`);
  }
  markSent();
}

/** A pre-filled email the visitor can send if saving failed. */
export function enquiryMailto(lead: LeadInput, site: string): string {
  const subject = `${site} enquiry: ${lead.service}`;
  const body = `Name: ${lead.name}\nEmail: ${lead.email}\nService: ${lead.service}\n\n${lead.message}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
