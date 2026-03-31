import { useState } from "react";
import { Phone, Instagram, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

const CALENDLY_URL = "https://calendly.com/workwithsebgreen/consultation";

const ActionZone = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from("enquiries")
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          source: "memorialplanning.withsebgreen.co.uk",
        });

      if (insertError) throw insertError;
      setSubmitted(true);
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setError("We couldn't send your enquiry just now. Please try calling or emailing us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="action" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Enquiry Form */}
          <div className="glass-card rounded-2xl p-8 md:p-10 border border-secondary/20 mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-4 text-center">
              Enquire Today
            </h2>
            <p className="text-muted-foreground mb-8 text-center max-w-xl mx-auto">
              Reach out at your own pace. We understand this is a sensitive time and are
              here to answer any questions with compassion and care.
            </p>

            {submitted ? (
              <div className="text-center py-8">
                <p className="text-lg text-primary font-serif font-semibold mb-2">
                  Thank you.
                </p>
                <p className="text-muted-foreground">
                  The Lead Strategist will review your enquiry and respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-full px-5 py-3 bg-background border border-border focus:border-primary/50 focus:outline-none text-foreground text-sm transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">
                    Business Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-full px-5 py-3 bg-background border border-border focus:border-primary/50 focus:outline-none text-foreground text-sm transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-1.5">
                    Subject / Service of Interest
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    maxLength={200}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-full px-5 py-3 bg-background border border-border focus:border-primary/50 focus:outline-none text-foreground text-sm transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-1.5">
                    Message (Why are you enquiring?)
                  </label>
                  <textarea
                    id="message"
                    required
                    maxLength={1000}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-2xl px-5 py-3 bg-background border border-border focus:border-primary/50 focus:outline-none text-foreground text-sm transition-colors resize-none"
                  />
                </div>
                {error && (
                  <p className="text-sm text-destructive text-center">{error}</p>
                )}
                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="pill-button bg-primary text-primary-foreground hover:bg-primary/90 font-medium inline-flex items-center gap-2 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" strokeWidth={1.5} />
                    {submitting ? "Sending…" : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-center"
              >
                Book a Strategy Call
              </a>
              <a
                href="#pricing"
                className="pill-button bg-transparent text-primary border border-primary/30 hover:border-primary/50 hover:bg-primary/5 font-medium text-center"
              >
                View Service Guide
              </a>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+447900332505"
                className="flex items-center justify-center gap-3 pill-button bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              >
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                <span>Call Seb Green</span>
              </a>
              <a
                href="https://www.instagram.com/_sebgreen_/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 pill-button bg-transparent text-primary border border-primary/30 hover:border-primary/50 hover:bg-primary/5 font-medium"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
                <span>Message on Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionZone;
