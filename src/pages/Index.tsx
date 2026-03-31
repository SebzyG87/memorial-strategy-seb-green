import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StrategicApproach from "@/components/StrategicApproach";
import TributeChecklist from "@/components/TributeChecklist";
import PricingSection from "@/components/PricingSection";
import ServiceExamples from "@/components/ServiceExamples";
import FeaturedTools from "@/components/FeaturedTools";
import ActionZone from "@/components/ActionZone";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <StrategicApproach />
      <TributeChecklist />
      <PricingSection />
      <ServiceExamples />
      <FeaturedTools />
      <TestimonialsSection />
      <ActionZone />
      <Footer />
    </div>
  );
};

export default Index;
