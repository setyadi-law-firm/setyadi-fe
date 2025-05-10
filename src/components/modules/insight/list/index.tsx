"use client";

import { Button } from "@/components/ui/button";
import { DUMMY_ARTICLES } from "./constants";
import { ArticleCard } from "./elements";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Assets } from "@/components/core";
import { useState } from "react";
import { toast } from "sonner";

export function InsightPageModule() {
  const { data: session } = useSession();
  const [isBulking, setIsBulking] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [articles, setArticles] = useState(DUMMY_ARTICLES);

  const handleSelect = (id: string) => {
    setSelectedArticles((prev) =>
      prev.includes(id)
        ? prev.filter((articleId) => articleId !== id)
        : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedArticles.length === 0) {
      toast.error("No articles selected for deletion");
      return;
    }

    // In a real application, you would make an API call here
    setArticles((prev) =>
      prev.filter((article) => !selectedArticles.includes(article.articleId))
    );

    toast.success(`${selectedArticles.length} articles deleted successfully`);

    setSelectedArticles([]);
  };

  const exitBulkMode = () => {
    setIsBulking(false);
    setSelectedArticles([]);
  };

  return (
    <div className="w-full z-0 min-h-screen relative">
      <div className="w-full relative -z-10 md:px-20 px-8 md:pb-4 pb-6 md:pt-32 pt-20 mb-8">
        <div className="border-l-4 md:py-3 py-1 md:pl-6 pl-3 border-[#1059BD] text-neutral-950 font-semibold text-lg md:text-2xl">
          Article
        </div>
      </div>
      {session?.user && (
        <div className="flex md:items-center justify-between mx-8 md:mb-12 mb-4 md:mx-20 md:px-4">
          <Button
            variant="ghost"
            className="border-[#1059BD] border-b-2 md:text-4xl w-fit text-2xl font-bold md:py-6 py-3 rounded-none px-2"
          >
            Add Article +
          </Button>
          <div className="flex max-md:flex-col-reverse md:items-center items-end gap-4">
            <div
              className={`flex items-center gap-4 ${
                isBulking ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                disabled={selectedArticles.length === 0}
                className="md:text-lg text-base font-semibold"
              >
                Delete ({selectedArticles.length})
              </Button>
            </div>
            <Button
              variant={"ghost"}
              className={`cursor-pointer aspect-square rounded-full p-4 transition-all duration-300 w-fit md:w-16 h-fit md:h-16 flex items-center justify-center hover:bg-neutral-200 ${
                isBulking ? "bg-neutral-200" : ""
              }`}
              onClick={() => setIsBulking(!isBulking)}
            >
              <Image
                src={Assets.bulkIcon}
                alt="Bulk Icon"
                width={24}
                height={24}
                className={`transition-all duration-300 ease-out shrink-0 ${
                  isBulking ? "rotate-[225deg]" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      )}
      <div className="md:gap-y-8 gap-y-12 gap-x-4 px-8 md:px-20 pb-20 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.articleId}
            {...article}
            isSelectable={isBulking}
            isSelected={selectedArticles.includes(article.articleId)}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
