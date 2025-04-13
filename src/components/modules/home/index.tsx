import { Assets } from "@/components/core";
import { cn } from "@/lib";
import Image from "next/image";
import { HeroSection } from "./hero";
import { AboutSection } from "./about";

export function HomePageModule() {
  return (
    <div className="items-center w-full z-0 min-h-screen relative justify-items-center gap-16">
      <HeroSection />
      <AboutSection />
    </div>
  );
}
