"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { InsightDetailType } from "./types";
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

  const DUMMY_ARTICLE: InsightDetailType = {
    id: "1",
    title: "Article Title",
    image_url: Assets.insight1,
    author: "John Doe",
    created_at: "2023-10-01",
    content: `                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum tempor hendrerit. Aliquam nec fermentum felis, nec malesuada erat. Praesent et auctor tellus. Vivamus pulvinar dolor diam, at tempor turpis pellentesque vel. Nulla aliquam risus vitae quam luctus iaculis. Nullam interdum, leo a volutpat pellentesque, tellus diam pretium metus, non laoreet augue felis sit amet sapien. Sed rhoncus magna sit amet mauris viverra, ac blandit ante commodo. Praesent consequat pulvinar arcu porttitor bibendum. Suspendisse ut consequat purus. Nulla a dui ut tellus consectetur dictum. Integer dapibus ligula eu lacus fringilla vestibulum. Donec vehicula elit sed facilisis luctus.

                Nunc vulputate faucibus magna, vel dignissim sem. Morbi iaculis auctor nulla quis porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse non neque mattis, semper augue eu, hendrerit lectus. Quisque vel ullamcorper metus, et ultrices nunc. Phasellus aliquet risus at magna ultrices, quis maximus nisl molestie. Ut condimentum vitae odio ac ultricies. Nam nibh enim, blandit id auctor nec, mattis id quam. Quisque eget augue lobortis, vehicula quam in, pulvinar massa. Sed nec enim eros. Praesent semper metus vel dolor pharetra, nec ultricies massa molestie.

                Sed ligula nulla, placerat quis tellus eget, congue condimentum turpis. Donec nec sem in ex porttitor feugiat. Nullam euismod elit nec nibh iaculis tristique. Aliquam erat volutpat. Vestibulum efficitur volutpat malesuada. Praesent at cursus libero, scelerisque venenatis purus. Cras vitae nibh urna. Aliquam ac leo cursus, sollicitudin purus et, porttitor sapien. Nunc dignissim viverra ullamcorper. Praesent eu maximus mi. Duis at orci facilisis, porttitor mauris vulputate, lacinia diam. Pellentesque in lacinia quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras feugiat enim ac porta tempor. Etiam et augue turpis. Nullam tempor accumsan diam, et dictum mi commodo ut.

                Curabitur at diam vitae odio bibendum luctus quis vestibulum erat. Donec malesuada tincidunt justo, in pretium justo varius at. Vestibulum tincidunt ex a venenatis volutpat. Etiam sed iaculis mauris. Etiam suscipit porta ipsum, eget suscipit lectus pulvinar vel. Donec et tempor ligula, ultricies pretium nisi. Aenean cursus efficitur felis at egestas. Sed facilisis fringilla tortor ac pulvinar. Nunc pretium vulputate ipsum a euismod. Integer suscipit convallis euismod. Sed nec pharetra ligula.

                Aenean ut magna est. Donec vitae ipsum tortor. Praesent facilisis eu metus vel dignissim. Curabitur malesuada fermentum pulvinar. Maecenas pulvinar arcu mi, id auctor arcu sagittis sit amet. Aenean faucibus enim id nulla luctus, posuere varius orci fermentum. Sed mollis ullamcorper blandit. Nulla non diam condimentum, porttitor sem nec, molestie lorem. Phasellus lacinia purus in ante finibus ullamcorper.`,
  };

  const { isFetching, onDelete } = useArticleDetail(id);

  const data = DUMMY_ARTICLE;

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDelete = () => {
    onDelete();

    setShowDeleteConfirmation(false);
  };

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
            >
              Delete
            </Button>
            <Button
              variant="default"
              className="flex-1 py-6"
              onClick={() => setShowDeleteConfirmation(false)}
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
        {/* Title and Subtitle */}
        <div className="mb-6 flex max-md:flex-col max-md:w-full gap-y-3 md:items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {data.title}
            </h1>
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
            src={data.image_url}
            alt={data.title}
            fill
            className="object-cover rounded-md"
            priority
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
        </div>{" "}
        {/* Content */}
        <div
          className="prose max-w-none mb-4 text-gray-700 leading-relaxed article-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data.content),
          }}
        />
      </div>
    </div>
  );
}
