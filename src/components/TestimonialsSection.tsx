const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Working with Seb took an incredibly difficult responsibility off our shoulders. Family members abroad were able to be part of the service in real time — it meant everything.",
      name: "M.W.",
      role: "Bereaved Family Member",
    },
    {
      quote: "The care and professionalism throughout the whole process made a world of difference. Seb coordinated everything seamlessly with our venue. We couldn't have asked for more.",
      name: "D.H.",
      role: "Funeral Director Partner",
    },
  ];

  return (
    <section className="py-24 px-4 hidden">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-4">
            Families We've Supported
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Gentle words from those we've had the honour of helping through difficult times.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card rounded-2xl p-8 border border-secondary/20 flex flex-col gap-5">
              <p className="font-serif text-muted-foreground leading-relaxed italic text-base">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-secondary/20 pt-4">
                <p className="font-serif font-semibold text-primary">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
