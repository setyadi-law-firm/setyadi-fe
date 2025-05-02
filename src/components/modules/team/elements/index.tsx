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
    <div className="flex h-72 gap-8 w-full p-4">
      <div className="relative rounded-sm shrink-0 aspect-[3/4] bg-red-500 h-full mb-4 overflow-hidden shadow-lg">
        <Image
          src={imageUrl}
          alt={name}
          objectFit="cover"
          layout="fill"
          className="mb-4 rounded-md"
        />
      </div>
      <div className="flex flex-col gap-6">
        <h3 className="flex flex-col gap-1">
          <span className="text-4xl font-bold text-neutral-950">{name}</span>
          <span className="text-2xl font-bold text-[#1059BD]">{role}</span>
          <span className="text-base text-[#777675]">{email}</span>
        </h3>
        <p className="text-base text-[#777675]">{description}</p>
      </div>
    </div>
  );
};
