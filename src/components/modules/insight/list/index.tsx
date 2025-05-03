import { Button } from "@/components/ui/button";
import { DUMMY_ARTICLES } from "./constants";
import { ArticleCard } from "./elements";

export function InsightPageModule() {
  return (
    <div className="w-full z-0 min-h-screen relative">
      <div className="w-full relative -z-10 md:px-20 px-8 md:pb-4 pb-6 md:pt-32 pt-20 mb-8">
        <div className="border-l-4 md:py-3 py-1 md:pl-6 pl-3 border-[#1059BD] text-neutral-950 font-semibold text-lg md:text-2xl">
          Article
        </div>
      </div>
      <Button
        variant="ghost"
        className="md:mx-20 mx-8 mb-12 border-[#1059BD] border-b-2 md:text-4xl text-2xl font-bold md:py-6 py-3 rounded-none px-2"
      >
        Add Article +
      </Button>
      <div className="md:gap-y-8 gap-y-12 gap-x-4 px-8 md:px-20 pb-20 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Replace with your actual team members data */}
        {DUMMY_ARTICLES.map((member) => (
          <ArticleCard key={member.title} {...member} />
        ))}
      </div>
    </div>
  );
}
