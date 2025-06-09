import { cn } from "@/lib";
import { EXPERTISE_VALUES } from "./constants";
import Image from "next/image";
import React from "react";

export function ExpertiseSection() {
  const [isHovered, setIsHovered] = React.useState<number | null>(null);

  return (
    <div
      className="items-center w-full z-0 relative gap-16 pt-24"
      id="expertise"
    >
      <div className="w-full pb-12 relative -z-10 md:px-20 px-8">
        <div className="py-3 text-neutral-950 font-bold text-base md:text-4xl">
          Our Expertise
        </div>
        <div className="text-[#777675] max-md:text-sm">
          We provide a wide range of legal services designed to support your
          business needs.
        </div>
      </div>
      <div className="flex md:grid md:grid-cols-4 gap-4 items-center overflow-auto md:px-20 px-8 h-fit">
        {EXPERTISE_VALUES.map((value, index) => (
          <div
            key={index}
            className="flex flex-col relative gap-4 overflow-clip p-6 shadow-md w-2/3 md:w-full shrink-0 aspect-[3/4] transition-all duration-500"
            style={{
              boxShadow:
                isHovered === index
                  ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                  : "",
            }}
            onMouseEnter={() => setIsHovered(index)}
          >
            <Image
              fill
              priority
              quality={100}
              alt="Hero Background Image"
              src={value.img_url}
              className={cn(
                "object-cover pointer-events-none -z-10 select-none drag-none transition-all duration-500",
                isHovered === index ? "brightness-30" : "brightness-50"
              )}
            />

            {/* Content container that moves on hover */}
            <div
              className={cn(
                "absolute inset-0 md:p-6 p-4 flex flex-col justify-end transition-all duration-500",
                isHovered === index ? "md:pt-6 pt-3" : "pt-36 md:pt-56"
              )}
            >
              {/* Title */}
              <h3 className="text-neutral-50 font-semibold md:text-2xl text-lg mb-2 transition-all duration-500">
                {value.header}
              </h3>

              {/* Description - only visible on hover */}
              <div
                className={cn(
                  "text-neutral-50 text-sm overflow-auto transition-all duration-500",
                  isHovered === index
                    ? "opacity-100 max-h-full md:mt-4"
                    : "opacity-0 max-h-0"
                )}
              >
                {value.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
