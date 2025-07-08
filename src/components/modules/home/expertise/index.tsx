"use client";

import { Assets } from "@/components/core";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ExpertiseSection() {
  const router = useRouter();

  const EXPERTISES = [
    {
      header: "Energy Law",
      img_url: Assets.energyLaw,
      description:
        "As the backbone of a society’s development, the energy sector industry is important to get right. We advise and assist businesses in this sector on, but not limited to, oil and gas matters, mining industry, as well as new and renewable energy development. We help your business in addressing the challenges of Production Sharing Contract (PSC), mining concessions, and business and administrative-related issues.",
    },
    {
      header: "Business Legality",
      img_url: Assets.businessLegality,
      description:
        "Completing the legality is an essential step in conducting your business. We will assist you in completing your business administrative needs such as permits and registration to the government’s website. We can also help with the compliance aspect in order for your business to operate regularly without any concerns, thus giving you a peace of mind.",
    },
    {
      header: "Constitutional Issues",
      img_url: Assets.constitutionalIssues,
      description:
        "Fighting for your basic rights is key to every person. We can assist you to file a constitutional review of a law that may have violated you, your company, or your organisation’s rights. We also provide a Constitutional Decision Impact Assessment (CDIA) should your business need to pay attention to some legal provisions affected by the Constitutional Court (Mahkamah Konstitusi)’s decision.",
    },
    {
      header: "Policy Studies and Advice",
      img_url: Assets.insight1,
      description:
        "We can provide advisory opinions on the policies that may affect your business. We will help you to analyse important aspects to bear in mind and navigate through all the issues that may arise from a policy. For government officials, we can also provide studies to advise on what to improve in the regulations and their implementation, to bridge the interests between stakeholders.",
    },
  ];

  return (
    <div className="max-md:px-12 max-md:py-12 px-16 items-center text-center py-18 text-neutral-950 w-full z-0 relative flex flex-col gap-8 mb-16">
      <h1 className="md:text-4xl text-3xl font-bold">Our Expertise</h1>
      <p className="md:text-base text-sm text-neutral-950 leading-relaxed max-w-2xl mx-auto">
        We provide a wide range of legal services designed to support your
        business needs. Our team of experts has extensive experience across
        various areas of law, including:
      </p>
      <div className="flex-wrap items-center justify-center gap-4 md:gap-6 grid md:grid-cols-2 sm:grid-cols-1 max-md:grid-cols-1 md:w-4/5 w-full">
        {EXPERTISES.map((expertise, index) => (
          <div
            key={index}
            className="bg-[#00000099] relative text-neutral-50 p-4 flex items-center justify-center text-center h-full aspect-video w-full"
          >
            <Image
              fill
              priority
              quality={100}
              alt="Hero Background Image"
              src={expertise.img_url}
              className="object-cover pointer-events-none -z-10 select-none drag-none transition-all duration-500"
            />
            {expertise.header}
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
