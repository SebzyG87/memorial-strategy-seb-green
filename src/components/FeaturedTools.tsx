const FeaturedTools = () => {
  return (
    <section id="tools" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-4">
              Compassionate Planning Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Free tools to help you prepare and coordinate every detail with ease and care.
            </p>
          </div>

          {/* Timezone Invites Tool */}
          <div className="glass-card rounded-2xl p-6 md:p-8 border border-secondary/20">
            <h3 className="text-xl font-serif font-semibold text-primary mb-2">
              Timezone Invites
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Coordinate attendance across time zones — perfect for live-streamed services with family abroad.
            </p>
            <div className="w-full rounded-xl overflow-hidden border border-border" style={{ minHeight: 500 }}>
              <iframe
                src="https://time-connect-invites.lovable.app"
                title="Timezone Invites Tool"
                className="w-full border-0"
                style={{ height: 500 }}
                loading="lazy"
                allow="clipboard-read; clipboard-write"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;
