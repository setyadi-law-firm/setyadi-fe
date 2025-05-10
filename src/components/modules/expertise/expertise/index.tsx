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
            className="flex flex-col relative gap-4 overflow-clip p-6 rounded-lg shadow-md w-2/3 md:w-64 shrink-0 aspect-[3/4] group transition-all duration-300 ease-in-out hover:shadow-lg"
          >
            <Image
              fill
              priority
              quality={100}
              alt="Hero Background Image"
              src={value.img_url}
              className={cn(
                "object-cover pointer-events-none brightness-50 -z-10 select-none drag-none transition-all duration-300 ease-in-out group-hover:brightness-30"
              )}
            />

            {/* Content container that moves on hover */}
            <div className="absolute inset-0 md:p-6 p-4 flex flex-col pt-36 md:pt-56 transition-all duration-500 ease-in-out md:group-hover:pt-6 group-hover:pt-3">
              {/* Title */}
              <h3 className="text-neutral-50 font-semibold md:text-2xl text-lg mb-2 transition-all duration-500">
                {value.header}
              </h3>

              {/* Description - only visible on hover */}
              <div className="text-neutral-50 text-sm opacity-0 max-h-0 overflow-auto group-hover:opacity-100 group-hover:max-h-full md:group-hover:mt-4 transition-all duration-500 ease-in-out">
                {value.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
