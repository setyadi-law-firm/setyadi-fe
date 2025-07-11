"use client";

import { Button } from "@/components/ui/button";
import { ArticleCard } from "./elements";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Assets, ENDPOINTS, useSetyadiClient } from "@/components/core";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArticleResponseType, useInsights } from "./hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export function InsightPageModule() {
  const router = useRouter();
  const setyadiClient = useSetyadiClient();

  const { data: session } = useSession();
  const { articles: apiArticles, isLoading, refetch } = useInsights();

  const [isBulking, setIsBulking] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [articles, setArticles] = useState<ArticleResponseType[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Update articles when API data is loaded
  useEffect(() => {
    if (apiArticles && apiArticles.length > 0) {
      setArticles(apiArticles);
    }
  }, [apiArticles]);

  const handleSelect = (id: string) => {
    setSelectedArticles((prev) =>
      prev.includes(id)
        ? prev.filter((articleId) => articleId !== id)
        : [...prev, id]
    );
  };
  const openDeleteConfirmation = () => {
    if (selectedArticles.length === 0) {
      toast.error("No articles selected for deletion");
      return;
    }
    setShowDeleteConfirmation(true);
  };
  const handleBulkDelete = async () => {
    const loadingToast = toast.loading(
      `Deleting ${selectedArticles.length} articles...`
    );
    try {
      setIsDeleting(true);

      // Send the selected article IDs to the API
      await setyadiClient.delete(ENDPOINTS.BULK_DELETE, {
        data: {
          report_ids: selectedArticles,
        },
      });

      // Update the local state to remove the deleted articles
      setArticles((prev) =>
        prev.filter((article) => !selectedArticles.includes(article.id))
      );

      toast.dismiss(loadingToast);
      toast.success(`${selectedArticles.length} articles deleted successfully`);

      setSelectedArticles([]);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting articles:", error);
      toast.error("Failed to delete articles. Please try again.");
    } finally {
      toast.dismiss(loadingToast);
      setIsDeleting(false);
    }
  };

  const exitBulkMode = () => {
    setIsBulking(false);
    setSelectedArticles([]);
  };

  return (
    <div className="w-full z-0 min-h-screen relative">
      {/* ShadCN Dialog Confirmation */}
      <Dialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Delete Article
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              {selectedArticles.length} Articles selected, are you sure you want
              to delete these articles?
            </DialogDescription>
          </DialogHeader>{" "}
          <DialogFooter className="flex flex-col sm:flex-row gap-4 sm:justify-center pt-4">
            <Button
              variant="destructive"
              className="flex-1 py-6"
              onClick={handleBulkDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button
              variant="default"
              className="flex-1 py-6"
              onClick={() => setShowDeleteConfirmation(false)}
              disabled={isDeleting}
            >
              Back
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            onClick={() => {
              router.push("/insights/create");
            }}
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
                onClick={openDeleteConfirmation}
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

      {/* Articles grid or empty state */}
      {articles.length > 0 ? (
        <div className="md:gap-y-8 gap-y-12 gap-x-4 px-8 md:px-20 pb-20 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              {...article}
              isSelectable={isBulking}
              isSelected={selectedArticles.includes(article.id)}
              onSelect={handleSelect}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-8 md:px-20 pb-20 pt-10">
          <div className="text-center max-w-2xl">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No articles yet
            </h3>
            {session?.user ? (
              <>
                <p className="text-gray-600 mb-6">
                  Get started by creating your first article to share insights
                  with your community.
                </p>
                <Button
                  onClick={() => router.push("/insights/create")}
                  className="bg-[#1059BD] hover:bg-[#0d4da3] text-white px-6 py-3"
                >
                  Create Your First Article
                </Button>
              </>
            ) : (
              <p className="text-neutral-500 text-center max-w-2xl">
                Check back later for the latest insights and articles.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
