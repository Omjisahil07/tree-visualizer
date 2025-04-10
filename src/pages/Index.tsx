
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { ExploreStructures } from "@/components/home/ExploreStructures";
import { Testimonials } from "@/components/home/Testimonials";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CallToAction } from "@/components/home/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ExploreStructures />
      <Features />
      <Testimonials />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
