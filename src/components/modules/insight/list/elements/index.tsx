import { Check } from "lucide-react";
import Image from "next/image";

export interface ArticleCardProps {
  title: string;
  imageUrl: string;
  description: string;
  articleId: string;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export const ArticleCard = ({
  title,
  imageUrl,
  description,
  articleId,
  isSelectable = false,
  isSelected = false,
  onSelect,
}: ArticleCardProps) => {
  const handleCardClick = () => {
    if (isSelectable && onSelect) {
      onSelect(articleId);
    } else {
      window.open(`/insights/${articleId}`, "_blank");
    }
  };

  return (
    <div
      className={`flex flex-col gap-x-8 w-full cursor-pointer transition-all relative ${
        isSelected && isSelectable ? "opacity-70" : ""
      }`}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative rounded-sm shrink-0 aspect-video mb-4 shadow-lg">
        <Image
          src={imageUrl}
          alt={title}
          objectFit="cover"
          layout="fill"
          className="mb-4 rounded-md"
        />
        {isSelectable && (
          <div className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full border-2 border-[#1059BD] flex items-center justify-center bg-[#D7D5D3]">
            <div
              className={`w-full h-full bg-blue-600 rounded-full flex items-center transition-all justify-center pt-0.5 ${
                isSelected && isSelectable
                  ? "scale-100 opacity-100"
                  : "scale-0 opacity-0"
              }`}
            >
              <Check
                className="text-white"
                size={20}
                strokeWidth={4}
                color="white"
              />
            </div>
          </div>
        )}
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
