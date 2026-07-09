import { CtaSection } from "@/components/landing/cta-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { ModulesSection } from "@/components/landing/modules-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ModulesSection />
      <CtaSection />
    </>
  );
}
