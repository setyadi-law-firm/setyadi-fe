import { ENDPOINTS, useSetyadiClient } from "@/components/core";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";
import { InsightDetailType } from "../types";

export const useArticleDetail = (article_id: string) => {
  const client = useSetyadiClient();
  const session = useSession();
  const queryClient = useQueryClient();

  const { data, isFetching, error } = useQuery<InsightDetailType, Error>(
    ["get-article-by-id", article_id],
    {
      queryFn: async () => {
        let apiUrl = `${ENDPOINTS.ARTICLE}/${article_id}`;

        const { data } = await client.get(apiUrl);

        return data as InsightDetailType;
      },
      enabled: !!session.data,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: onDelete } = useMutation({
    mutationFn: async () => {
      const res = client.delete(`${ENDPOINTS.ARTICLE}/${article_id}`);

      toast.promise(res, {
        loading: "Deleting article...",
        success: () => {
          return "Article deleted successfully";
        },
        error: (error) => {
          return error.response.data.error ?? "Something went wrong";
        },
      });

      await res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["get-article-by-id", article_id]);
    },
  });

  return {
    data,
    error,
    isFetching,
    onDelete,
  };
};
