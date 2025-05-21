"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import "@/components/core/styles/article-content.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Assets } from "@/components/core";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { useArticleDetail } from "./hooks/use-article-detail";

export function InsightDetailPageModule() {
  const { id } = useParams<{
    id: string;
  }>();
  const router = useRouter();

  const { data, isFetching, onDelete, error } = useArticleDetail(id);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete();
    setShowDeleteConfirmation(false);
    // Navigate back to insights list after deletion
    setTimeout(() => {
      router.push("/insights");
    }, 1000);
  };

  // Fallback image for when API doesn't return an image
  const fallbackImage = Assets.insight1;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Error loading article
        </h1>
        <p className="text-gray-600 mb-6">
          {error.message || "Something went wrong"}
        </p>
        <Button
          variant="default"
          onClick={() => router.push("/insights")}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Articles
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full z-0 min-h-screen relative md:pt-20 pt-12">
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
              Are you sure you want to delete this article?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-4 sm:justify-center pt-4">
            <Button
              variant="destructive"
              className="flex-1 py-6"
              onClick={handleDelete}
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
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="default"
          className="mb-6 rounded-md w-16 py-2"
          onClick={() => router.push("/insights")}
        >
          <ArrowLeft size={16} />
        </Button>

        {isFetching ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1059BD] mb-4"></div>
            <p className="text-gray-500">Loading article...</p>
          </div>
        ) : data ? (
          <>
            {/* Title and Actions */}
            <div className="mb-6 flex max-md:flex-col max-md:w-full gap-y-3 md:items-center justify-between">
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {data.title}
                </h1>
                <p className="text-gray-600">{data.author}</p>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Button
                  variant="default"
                  className="w-fit"
                  onClick={() => router.push(`/insights/${id}/edit/`)}
                >
                  <Edit size={16} className="mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="w-fit"
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  <Trash size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            {/* Main Image */}
            <div className="w-full h-[300px] relative mb-6">
              <Image
                src={data.image_url || fallbackImage}
                alt={data.title}
                fill
                className="object-cover rounded-md"
                priority
                onError={(e) => {
                  e.currentTarget.src = fallbackImage;
                }}
              />
            </div>

            {/* Upload Date */}
            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Uploaded:{" "}
                {new Date(data.created_at).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Content */}
            <div
              className="prose max-w-none mb-4 text-gray-700 leading-relaxed article-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.content),
              }}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-gray-600">Article not found</p>
            <Button
              variant="link"
              onClick={() => router.push("/insights")}
              className="mt-4"
            >
              Back to articles list
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
