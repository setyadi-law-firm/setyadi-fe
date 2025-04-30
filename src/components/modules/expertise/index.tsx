import { HeroSection } from "./hero";
import { ExpertiseSection } from "./expertise";

export function ExpertisePageModule() {
  return (
    <div className="items-center w-full z-0 min-h-screen relative justify-items-center gap-16">
      <HeroSection />
      <ExpertiseSection />
    </div>
  );
}
