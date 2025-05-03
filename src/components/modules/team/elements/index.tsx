import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Image from "next/image";

export interface TeamMemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
  email: string;
  description: string;
}

export const TeamMemberCard = ({
  name,
  role,
  imageUrl,
  email,
  description,
}: TeamMemberCardProps) => {
  return (
    <div className="flex max-md:flex-col md:h-72 gap-x-8 w-full p-4">
      <div className="relative rounded-sm shrink-0 aspect-[3/4] bg-red-500 h-full mb-4 overflow-clip shadow-lg max-md:w-2/3">
        <Image
          src={imageUrl}
          alt={name}
          objectFit="cover"
          layout="fill"
          className="mb-4 rounded-md"
        />
      </div>
      <div className="flex flex-col gap-6 max-md:gap-3">
        <h3 className="flex flex-col gap-1">
          <span className="md:text-4xl text-2xl font-bold text-neutral-950">
            {name}
          </span>
          <span className="md:text-2xl text-2xl font-bold text-[#1059BD]">
            {role}
          </span>
          <Button
            variant={"ghost"}
            className="md:text-base text-lg flex items-center gap-2 text-[#777675] w-fit"
            onClick={() => {
              window.open(`mailto:${email}`, "_blank");
            }}
          >
            <Mail /> <p>{email}</p>
          </Button>
        </h3>
        <p className="md:text-base text-base text-[#777675]">{description}</p>
      </div>
    </div>
  );
};
