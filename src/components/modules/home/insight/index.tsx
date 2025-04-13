import { Assets } from "@/components/core";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function InsightSection() {
  type ExpertiseType = {
    title: string;
    imageUrl: string;
    actionUrl: string;
  };

  const INSIGHTS: ExpertiseType[] = [
    {
      title: "Web Development",
      imageUrl: Assets.insight1,
      actionUrl: "/expertise/web-development",
    },
    {
      title: "Mobile Development",
      imageUrl: Assets.insight1,
      actionUrl: "/expertise/mobile-development",
    },
    {
      title: "UI/UX Design",
      imageUrl: Assets.insight1,
      actionUrl: "/expertise/ui-ux-design",
    },
  ];

  return (
    <div className="max-md:px-12 max-md:py-12 px-16 py-18 bg-neutral-50 text-neutral-950 w-full z-0 relative flex flex-col gap-8">
      <h1 className="md:text-3xl text-2xl font-bold">Insight</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-8">
        {INSIGHTS.map((insight, index) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-4 relative aspect-[3/2] px-4 py-6"
          >
            <h2 className="text-xl font-semibold text-neutral-50 z-20">
              {insight.title}
            </h2>
            <Image
              src={insight.imageUrl}
              alt={insight.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md brightness-50 z-0"
            />
            <Button variant="outline" className="z-20 w-fit">
              Read Article
            </Button>
          </div>
        ))}
      </div>
      <h1 className="md:text-3xl text-2xl font-bold mt-4">Latest News</h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-8">
        {INSIGHTS.map((insight, index) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-4 relative aspect-[3/2] px-4 py-6"
          >
            <h2 className="text-xl font-semibold text-neutral-50 z-20">
              {insight.title}
            </h2>
            <Image
              src={insight.imageUrl}
              alt={insight.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md brightness-50 z-0"
            />
            <Button variant="outline" className="z-20 w-fit">
              Read Article
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
