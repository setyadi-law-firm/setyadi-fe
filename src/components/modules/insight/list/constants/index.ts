import { Assets } from "@/components/core";
import { ArticleCardProps } from "../elements";

export const DUMMY_ARTICLES: ArticleCardProps[] = [
  {
    articleId: "1",
    title: "Jane Smith",
    imageUrl: Assets.homeContactBg,
    description: "Lorem Ipsum is simply dummy text of the ",
  },
  {
    articleId: "2",
    title: "John Doe",
    imageUrl: Assets.homeHeroBg,
    description:
      "Creative designer focused on creating intuitive and accessible user interfaces.",
  },
  {
    articleId: "3",
    title: "Emily Johnson",
    imageUrl: Assets.insight1,
    description:
      "Certified project manager with expertise in agile methodologies.",
  },
  {
    articleId: "4",
    title: "Michael Chen",
    imageUrl: Assets.homeContactBg,
    description: "Specializes in database optimization and API development.",
  },
];
