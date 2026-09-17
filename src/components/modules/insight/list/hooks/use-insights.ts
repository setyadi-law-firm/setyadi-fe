"use client";

import { ENDPOINTS, useSetyadiClient } from "@/components/core";
import { useQuery } from "react-query";

export type ArticleResponseType = {
  id: string;
  title: string;
  content: string;
  author: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export const useInsights = () => {
  const client = useSetyadiClient();

  const { data, isLoading, error, refetch } = useQuery<
    ArticleResponseType[],
    Error
  >(["get-all-articles"], {
    queryFn: async () => {
      const { data } = await client.get(ENDPOINTS.ARTICLE);
      return data as ArticleResponseType[];
    },
    refetchOnWindowFocus: false,
  });

  return {
    articles: data || [],
    isLoading,
    error,
    refetch,
  };
};
