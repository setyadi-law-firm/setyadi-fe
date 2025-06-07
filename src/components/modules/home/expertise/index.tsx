"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function ExpertiseSection() {
  const router = useRouter();

  const EXPERTISES = [
    "Energy Law",
    "Business Legality",
    "Policy Advice",
    "Constitutional Review",
  ];

  return (
    <div className="max-md:px-12 max-md:py-12 px-16 items-center text-center py-18 bg-neutral-50 text-neutral-950 w-full z-0 relative flex flex-col gap-8 mb-16">
      <h1 className="md:text-4xl text-3xl font-bold">Our Expertise</h1>
      <p className="md:text-base text-sm text-neutral-950 leading-relaxed max-w-2xl mx-auto">
        We provide a wide range of legal services designed to support your
        business needs. Our team of experts has extensive experience across
        various areas of law, including:
      </p>
      <div className="flex-wrap items-center justify-center gap-4 grid grid-cols-4 w-2/3">
        {EXPERTISES.map((expertise, index) => (
          <div
            key={index}
            className="bg-[#0F172A] text-neutral-50 p-4 flex items-center justify-center text-center h-full"
          >
            {expertise}
          </div>
        ))}
      </div>{" "}
      <Button
        variant="outline"
        className="max-md:w-full max-md:text-sm md:text-base text-[#1059BD] border-[#1059BD] hover:bg-[#1059BD] hover:text-white rounded-xl !px-8 py-6"
        onClick={() => {
          router.push("/expertise#expertise");
        }}
      >
        See Details <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
