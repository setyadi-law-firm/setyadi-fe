"use client";

import { useState } from "react";
import { EXPERTISE_WHY } from "./constants";
import { cn } from "@/lib";

interface AnimatedWhyDivProps {
  header: string;
  text: string;
  isHovered: boolean;
  setHoveredIndex: (index: number | null) => void;
  idx: number;
}

export const AnimatedWhyDiv = ({
  header,
  text,
  isHovered,
  setHoveredIndex,
  idx,
}: AnimatedWhyDivProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 transition-all h-[500px] relative duration-500 text-neutral-50 overflow-clip ease-in-out mb-20",
        {
          "bg-[#11305A] md:w-64 w-48": isHovered,
          "bg-[#1059BD] md:w-16 w-12": !isHovered,
        }
      )}
      onMouseEnter={() => setHoveredIndex(idx)}
    >
      <div
        className={cn(
          "transition-all duration-500 mx:px-6 px-4 md:py-9 py-6 md:w-64 w-48",
          {
            "opacity-100": isHovered,
            "opacity-0": !isHovered,
          }
        )}
      >
        <h4 className="text-2xl max-md:text-xl font-semibold">{header}</h4>
        <p className="border-l-2 max-md:text-sm border-neutral-200 pl-4 mt-6">
          {text}
        </p>
      </div>
      <div
        className={cn(
          "transition-all duration-500 px-6 absolute bottom-0 text-center flex flex-col items-center justify-center right-0 h-[500px] py-9 md:w-16 w-12",
          {
            "opacity-100": !isHovered,
            "opacity-0": isHovered,
          }
        )}
      >
        <h4 className="md:text-2xl text-xl font-semibold rotate-270 text-nowrap">
          {header}
        </h4>
      </div>
    </div>
  );
};

export function WhySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <div className="flex max-md:flex-col items-center w-full z-0 min-h-screen relative gap-x-16 gap-y-8 md:px-20 px-8 max-md:mt-32">
      <div className="md:w-1/2 w-full flex justify-center flex-col">
        <h3 className="md:text-4xl font-bold md:mb-12 mb-6">Why Choose Us</h3>
        <h4 className="md:text-4xl text-2xl font-bold mb-4 text-[#1059BD]">
          Strategic Legal Partnership for Every Stage of Growth
        </h4>
        <p className="mb-8 text-[#777675]">
          In today’s evolving legal and business landscape, you need more than
          just legal representation — you need a partner who understands your
          industry, anticipates challenges, and protects your interests with
          precision and dedication.
        </p>
      </div>
      <div className="md:w-1/2 w-full flex items-center gap-3 justify-center">
        {EXPERTISE_WHY.map((item, index) => (
          <AnimatedWhyDiv
            key={index}
            header={item.header}
            text={item.text}
            isHovered={hoveredIndex === index}
            idx={index}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
    </div>
  );
}
