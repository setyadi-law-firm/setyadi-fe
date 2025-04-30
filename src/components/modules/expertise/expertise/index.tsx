import { cn } from "@/lib";
import { EXPERTISE_VALUES } from "./constants";
import Image from "next/image";

export function ExpertiseSection() {
  return (
    <div className="items-center w-full z-0 relative gap-16">
      <div className="w-full pb-12 relative -z-10 pt-20 md:px-20 px-8">
        <div className="py-3 text-neutral-950 font-bold text-base md:text-4xl">
          Our Expertise
        </div>
        <div className="text-[#777675] max-md:text-sm">
          We provide a wide range of legal services designed to support your
          business needs.
        </div>
      </div>
      <div className="flex gap-4 justify-between items-center overflow-auto md:px-20 px-8">
        {EXPERTISE_VALUES.map((value, index) => (
          <div
            key={index}
            className="flex flex-col relative gap-4 overflow-clip p-6 rounded-lg shadow-md w-2/3 md:w-64 shrink-0 aspect-[3/4] md:justify-end items-end"
          >
            <Image
              fill
              priority
              quality={100}
              alt="Hero Background Image"
              src={value.img_url}
              className={cn(
                "object-cover pointer-events-none brightness-50 -z-10 select-none drag-none"
              )}
            />
            <div className="text-neutral-50 font-semibold text-2xl h-fit">
              {value.header}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
