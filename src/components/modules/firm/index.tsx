import { HeroSection } from "./hero";
import { ValuesSection } from "./values";
import { VisionSection } from "./vision";

export function FirmPageModule() {
  return (
    <div className="items-center w-full z-0 min-h-screen relative justify-items-center gap-16">
      <HeroSection />
      <VisionSection />
      <ValuesSection />
    </div>
  );
}
