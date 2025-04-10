import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ExploreStructures } from "@/components/home/ExploreStructures";
import { Testimonials } from "@/components/home/Testimonials";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CallToAction } from "@/components/home/CallToAction";

const Index = () => {
  return (
    <>
      <Hero />
      <ExploreStructures />
      <Features />
      <Testimonials />
      <HowItWorks />
      <CallToAction />
    </>
  );
};

export default Index;
