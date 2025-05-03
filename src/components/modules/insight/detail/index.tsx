"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { InsightDetailType } from "./types";
import Image from "next/image";
import { Assets } from "@/components/core";
import { ArrowLeft } from "lucide-react";

export function InsightDetailPageModule() {
  const { id } = useParams<{
    id: string;
  }>();
  const router = useRouter();

  const DUMMY_ARTICLE: InsightDetailType = {
    id: "1",
    title: "Article Title",
    subtitle: "Article Subtitle",
    imageUrl: Assets.insight1,
    uploadDate: "2023-10-01",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum tempor hendrerit. Aliquam nec fermentum felis, nec malesuada erat. Praesent et auctor tellus. Vivamus pulvinar dolor diam, at tempor turpis pellentesque vel. Nulla aliquam risus vitae quam luctus iaculis. Nullam interdum, leo a volutpat pellentesque, tellus diam pretium metus, non laoreet augue felis sit amet sapien. Sed rhoncus magna sit amet mauris viverra, ac blandit ante commodo. Praesent consequat pulvinar arcu porttitor bibendum. Suspendisse ut consequat purus. Nulla a dui ut tellus consectetur dictum. Integer dapibus ligula eu lacus fringilla vestibulum. Donec vehicula elit sed facilisis luctus.

Nunc vulputate faucibus magna, vel dignissim sem. Morbi iaculis auctor nulla quis porta. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse non neque mattis, semper augue eu, hendrerit lectus. Quisque vel ullamcorper metus, et ultrices nunc. Phasellus aliquet risus at magna ultrices, quis maximus nisl molestie. Ut condimentum vitae odio ac ultricies. Nam nibh enim, blandit id auctor nec, mattis id quam. Quisque eget augue lobortis, vehicula quam in, pulvinar massa. Sed nec enim eros. Praesent semper metus vel dolor pharetra, nec ultricies massa molestie.

Sed ligula nulla, placerat quis tellus eget, congue condimentum turpis. Donec nec sem in ex porttitor feugiat. Nullam euismod elit nec nibh iaculis tristique. Aliquam erat volutpat. Vestibulum efficitur volutpat malesuada. Praesent at cursus libero, scelerisque venenatis purus. Cras vitae nibh urna. Aliquam ac leo cursus, sollicitudin purus et, porttitor sapien. Nunc dignissim viverra ullamcorper. Praesent eu maximus mi. Duis at orci facilisis, porttitor mauris vulputate, lacinia diam. Pellentesque in lacinia quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras feugiat enim ac porta tempor. Etiam et augue turpis. Nullam tempor accumsan diam, et dictum mi commodo ut.

Curabitur at diam vitae odio bibendum luctus quis vestibulum erat. Donec malesuada tincidunt justo, in pretium justo varius at. Vestibulum tincidunt ex a venenatis volutpat. Etiam sed iaculis mauris. Etiam suscipit porta ipsum, eget suscipit lectus pulvinar vel. Donec et tempor ligula, ultricies pretium nisi. Aenean cursus efficitur felis at egestas. Sed facilisis fringilla tortor ac pulvinar. Nunc pretium vulputate ipsum a euismod. Integer suscipit convallis euismod. Sed nec pharetra ligula.

Aenean ut magna est. Donec vitae ipsum tortor. Praesent facilisis eu metus vel dignissim. Curabitur malesuada fermentum pulvinar. Maecenas pulvinar arcu mi, id auctor arcu sagittis sit amet. Aenean faucibus enim id nulla luctus, posuere varius orci fermentum. Sed mollis ullamcorper blandit. Nulla non diam condimentum, porttitor sem nec, molestie lorem. Phasellus lacinia purus in ante finibus ullamcorper.`,
  };

  return (
    <div className="w-full z-0 min-h-screen relative md:pt-20 pt-12">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="default"
          className="mb-6 rounded-md w-16 py-2"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
        </Button>

        {/* Title and Subtitle */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {DUMMY_ARTICLE.title}
          </h1>
          <h2 className="text-xl text-gray-600">{DUMMY_ARTICLE.subtitle}</h2>
        </div>

        {/* Main Image */}
        <div className="w-full h-[300px] relative mb-6">
          <Image
            src={DUMMY_ARTICLE.imageUrl}
            alt={DUMMY_ARTICLE.title}
            fill
            className="object-cover rounded-md"
            priority
          />
        </div>

        {/* Upload Date */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Uploaded:{" "}
            {new Date(DUMMY_ARTICLE.uploadDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="prose max-w-none">
          {DUMMY_ARTICLE.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
