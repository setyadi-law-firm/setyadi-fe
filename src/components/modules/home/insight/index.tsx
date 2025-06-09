"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useInsights } from "../../insight/list/hooks";
import { useRouter } from "next/navigation";

export function InsightSection() {
  type ExpertiseType = {
    title: string;
    imageUrl: string;
    actionUrl: string;
  };

  const router = useRouter();

  const { articles: apiArticles, isLoading } = useInsights();

  if (isLoading) {
    return (
      <div className="max-md:px-12 max-md:py-12 px-16 py-18 bg-neutral-50 text-neutral-950 w-full z-0 relative flex flex-col gap-8">
        <h1 className="md:text-3xl text-2xl font-bold">Insight</h1>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col justify-between gap-4 relative aspect-[3/2] px-4 py-6"
            >
              <div className="h-6 bg-gray-300 rounded animate-pulse z-20"></div>
              <div className="absolute inset-0 bg-gray-300 rounded-lg animate-pulse z-0"></div>
              <div className="h-10 w-24 bg-gray-300 rounded animate-pulse z-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (apiArticles.length === 0) {
    return (
      <div className="max-md:px-12 max-md:py-12 px-16 py-18 bg-neutral-50 text-neutral-950 w-full z-0 relative flex flex-col gap-8">
        <h1 className="md:text-3xl text-2xl font-bold">Insight</h1>
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="text-6xl text-neutral-300">📰</div>
          <h3 className="text-xl font-semibold text-neutral-600">
            No Insights Available
          </h3>
          <p className="text-neutral-500 text-center max-w-md">
            Check back later for the latest insights and articles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-md:px-12 max-md:py-12 px-16 py-18 bg-neutral-50 text-neutral-950 w-full z-0 relative flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="md:text-3xl text-2xl font-bold">Insight</h1>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-8">
        {apiArticles.slice(0, 3).map((insight, index) => (
          <div
            key={index}
            className="flex flex-col justify-between gap-4 relative aspect-[3/2] px-4 py-6"
          >
            <h2 className="text-xl font-semibold text-neutral-50 z-20">
              {insight.title}
            </h2>
            <Image
              src={insight.image_url}
              alt={insight.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md brightness-50 z-0"
            />
            <Button
              variant="outline"
              className="z-20 w-fit"
              onClick={() => router.push(`/insights/${insight.id}`)}
            >
              Read Article
            </Button>
          </div>
        ))}
      </div>
      <Button
        variant="default"
        className="w-fit self-center"
        onClick={() => router.push("/insights")}
      >
        Show All
      </Button>
    </div>
  );
}
