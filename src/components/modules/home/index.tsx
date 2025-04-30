import { HeroSection } from "./hero";
import { AboutSection } from "./about";
import { ContactSection } from "./contact";
import { ExpertiseSection } from "./expertise";
import { InsightSection } from "./insight";

export function HomePageModule() {
  return (
    <div className="items-center w-full z-0 min-h-screen relative justify-items-center gap-16">
      <HeroSection />
      <AboutSection />
      <InsightSection />
      <ExpertiseSection />
      <ContactSection />
    </div>
  );
}
