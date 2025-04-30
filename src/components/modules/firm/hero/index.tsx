import { Assets } from "@/components/core";
import { cn } from "@/lib";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="items-center w-full z-0 min-h-screen relative justify-items-center gap-16">
      <div className="absolute w-full h-[100vh] top-0 -z-10">
        <Image
          fill
          priority
          quality={100}
          alt="Hero Background Image"
          src={Assets.homeContactBg}
          className={cn(
            "object-cover pointer-events-none -z-10 brightness-[40%] grayscale select-none drag-none"
          )}
        />
      </div>
      <div className="min-h-screen w-full text-neutral-50 gap-7 flex flex-col justify-between md:px-20 px-8 pb-20 pt-32 z-10">
        <div className="border-l-4 py-3 pl-6 border-[#1059BD] text-neutral-50 font-semibold text-2xl md:text-2xl">
          Firm
        </div>
        <h1 className="md:text-5xl text-4xl font-bold text-end">
          Our Purpose is Legal <br className="md:hidden" /> Clarity &{" "}
          <br className="max-md:hidden" />
          Strategic <br className="md:hidden" /> Guidance
        </h1>
      </div>
    </div>
  );
}
