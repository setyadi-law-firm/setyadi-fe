import { Assets } from "@/components/core";
import { cn } from "@/lib";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="items-center w-full z-0 min-h-screen relative justify-items-center gap-16">
      <div className="w-full h-[60vh] relative -z-10 md:px-20 px-8 pb-20 md:pt-32 pt-20">
        <div className="border-l-4 py-3 pl-6 border-[#1059BD] text-neutral-950 font-semibold text-2xl md:text-2xl">
          Expertise
        </div>
        <div className="text-[#1059BD] font-bold text-3xl md:text-4xl mt-12">
        Our legal expertise is shaped by years of commitment to serving diverse client needs from individuals to leading corporations. 
        </div>
      </div>
      <div className="w-full h-[40vh] relative -z-10">
        <Image
          fill
          priority
          quality={100}
          alt="Hero Background Image"
          src={Assets.insight1}
          className={cn(
            "object-cover pointer-events-none -z-10 select-none drag-none"
          )}
        />
      </div>
    </div>
  );
}
