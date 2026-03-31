const CALENDLY_URL = "https://calendly.com/workwithsebgreen/consultation";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image - Calming rays of light through trees */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80')",
        }}
      >
        {/* Warm cream overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-primary mb-6 animate-fade-in">
          Compassionate Coordination & Lasting Tributes
        </h1>
        <p
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Acting as your dedicated Memorial Media Strategist. From live streaming to AI keepsakes, we coordinate every digital and visual detail directly with your venue and funeral director—so you can simply focus on family.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block pill-button bg-primary text-primary-foreground hover:bg-primary/90 font-medium animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Discuss Your Family's Needs
        </a>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
