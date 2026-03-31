import { Radio, Camera, Crown } from "lucide-react";

const tiers = [
  {
    icon: Radio,
    name: "The Broadcast",
    focus: "Connecting distant loved ones.",
    includes: [
      "Full Live Streaming Coordination",
      "2 Hours Coverage",
      "Private Family Viewing Link",
      "Full Digital Recording",
    ],
    price: "Starts at £250",
    highlighted: false,
  },
  {
    icon: Camera,
    name: "The Visual Tribute",
    focus: "Documenting the day.",
    includes: [
      "Discreet Funeral Photography",
      "Respectful AI Enhancement",
      "High-Resolution Digital Gallery",
    ],
    price: "Starts at £200",
    highlighted: false,
  },
  {
    icon: Crown,
    name: "Full Concierge Coordination",
    focus: "The complete 'Done-For-You' media plan.",
    includes: [
      "Full strategy call",
      "Choose exactly what you need",
      "Streaming + Photo + Prints + Slideshow",
      "We coordinate the entire package",
    ],
    price: "Bespoke pricing based on your checklist",
    highlighted: true,
    badge: "Complete Peace of Mind",
  },
];

const CALENDLY_URL = "https://calendly.com/workwithsebgreen/consultation";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-4">
            Service Options
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Transparent, starting-from pricing. Every package is tailored to your family's needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`glass-card rounded-2xl p-8 flex flex-col relative ${
                tier.highlighted
                  ? "border-2 border-secondary/60"
                  : "border border-secondary/20"
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-medium px-4 py-1 rounded-full">
                  {tier.badge}
                </span>
              )}
              <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                <tier.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                {tier.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 italic">
                {tier.focus}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.includes.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/60 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-lg font-semibold text-primary mb-4">
                {tier.price}
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`pill-button text-center font-medium ${
                  tier.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-transparent text-primary border border-primary/30 hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                Discuss Your Needs
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
