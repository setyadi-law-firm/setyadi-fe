import Image from "next/image";

export interface ArticleCardProps {
  title: string;
  imageUrl: string;
  description: string;
  articleId: string;
}

export const ArticleCard = ({
  title,
  imageUrl,
  description,
  articleId,
}: ArticleCardProps) => {
  return (
    <div
      className="flex flex-col gap-x-8 w-full cursor-pointer"
      onClick={() => {
        window.open(`/insights/${articleId}`, "_blank");
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          window.open(`/insights/${articleId}`, "_blank");
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative rounded-sm shrink-0 aspect-video mb-4 overflow-clip shadow-lg">
        <Image
          src={imageUrl}
          alt={title}
          objectFit="cover"
          layout="fill"
          className="mb-4 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="flex flex-col gap-1 md:text-2xl text-lg font-bold text-neutral-950">
          {title}
        </h3>
        <p className="md:text-lg text-base text-[#777675]">{description}</p>
      </div>
    </div>
  );
};
