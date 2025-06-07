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
    <div className="flex max-md:flex-col gap-x-8 w-full p-4 min-h-fit">
      <div className="relative rounded-sm shrink-0 aspect-[3/4] md:w-64 md:h-80 w-48 h-64 mb-4 overflow-clip shadow-lg">
        <Image
          src={imageUrl}
          alt={name}
          objectFit="cover"
          layout="fill"
          className="mb-4 rounded-md"
        />
      </div>
      <div className="flex flex-col max-md:gap-3 flex-1">
        <h3 className="flex flex-col gap-1 mb-4">
          <span className="md:text-4xl text-2xl font-bold text-neutral-950 leading-tight">
            {name}
          </span>
          <span className="md:text-2xl text-xl font-bold text-[#1059BD] leading-tight">
            {role}
          </span>
          <Button
            variant={"link"}
            className="md:text-base text-lg flex items-center gap-2 text-[#777675] w-fit px-0"
            onClick={() => {
              window.open(`mailto:${email}`, "_blank");
            }}
          >
            <Mail /> <p>{email}</p>
          </Button>
        </h3>
        <p className="md:text-base text-sm text-[#777675] leading-relaxed text-justify">
          {description}
        </p>
      </div>
    </div>
  );
};
