const steps = [
  {
    number: "01",
    title: "The Strategy Call",
    description:
      "A gentle conversation where we walk you through a comprehensive checklist of media and tribute options.",
  },
  {
    number: "02",
    title: "The Coordination",
    description:
      "We take over the logistics, liaising directly with funeral directors and venues for all technical setups.",
  },
  {
    number: "03",
    title: "The Execution",
    description:
      "Unobtrusive, highly respectful presence on the day to capture and broadcast the service flawlessly.",
  },
  {
    number: "04",
    title: "The Keepsakes",
    description:
      "Carefully edited galleries, recorded streams, and physical tributes delivered to your door.",
  },
];

const StrategicApproach = () => {
  return (
    <section id="approach" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-4">
            Seamless Memorial Planning
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A thoughtful, done-for-you approach to coordinating every detail
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="glass-card rounded-2xl p-6 text-center relative"
            >
              <span className="text-4xl font-serif font-semibold text-secondary/60 mb-3 block">
                {step.number}
              </span>
              <h3 className="text-lg font-serif font-semibold text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-secondary/40" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicApproach;
