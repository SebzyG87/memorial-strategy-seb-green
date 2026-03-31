const ServiceExamples = () => {
  return (
    <section id="examples" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-4">
            Service Examples
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See how we capture and share meaningful moments with discretion and care.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Memorial Video */}
          <div className="space-y-4">
            <div className="aspect-video rounded-2xl overflow-hidden border border-secondary/20">
              <iframe
                src="https://www.youtube.com/embed/Qc75LTEghJw"
                title="Memorial Video Example"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <h3 className="font-serif text-lg text-primary text-center">
              Memorial Video
            </h3>
          </div>

          {/* Live Stream Example */}
          <div className="space-y-4">
            <div className="aspect-video rounded-2xl overflow-hidden border border-secondary/20">
              <iframe
                src="https://www.youtube.com/embed/jovkBWz61wk"
                title="Live Stream Example"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <h3 className="font-serif text-lg text-primary text-center">
              Live Stream Example
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceExamples;
