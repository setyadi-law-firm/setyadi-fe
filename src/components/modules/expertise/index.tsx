import { HeroSection } from "./hero";
import { ExpertiseSection } from "./expertise";
import { WhySection } from "./why";

export function ExpertisePageModule() {
  return (
    <div className="items-center w-full z-0 min-h-screen relative justify-items-center gap-16">
      <HeroSection />
      <ExpertiseSection />
      <WhySection />
    </div>
  );
}
