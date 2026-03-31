import { Radio, Camera, Sparkles, Printer } from "lucide-react";

const columns = [
  {
    icon: Radio,
    title: "Remote Attendance (Streaming)",
    items: [
      "Professional Multi-Camera Live Streaming",
      "Secure, Private Family Viewing Links",
      "Full Digital Recording Provided",
      "Venue Internet/4G Strategy & Testing",
    ],
  },
  {
    icon: Camera,
    title: "Discreet Documentation",
    items: [
      "Respectful Funeral Photography",
      "Memorial Videography & Highlight Films",
      "Cinematic Drone Tributes",
      "Candid Family Moment Capture",
    ],
  },
  {
    icon: Sparkles,
    title: "AI & Digital Restoration",
    items: [
      "AI Photo Restoration & Enhancement",
      "AI-Generated Painted Memorial Portraits",
      "Background Removal & Isolation",
      "Audio Voice Preservation",
    ],
  },
  {
    icon: Printer,
    title: "Print & Memory Design",
    items: [
      "Animated Photo Slideshows for the Wake",
      "Order of Service Design & Print",
      "Framed Prints & Canvas Art",
      "Bespoke Memorial Cards",
    ],
  },
];

const TributeChecklist = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-4">
            Our Complete Selection of Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive checklist of memorial media and tribute options, tailored to your family's wishes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {columns.map((col) => (
            <div
              key={col.title}
              className="glass-card rounded-2xl p-6 border border-secondary/20"
            >
              <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <col.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg font-semibold text-primary mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/60 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TributeChecklist;
