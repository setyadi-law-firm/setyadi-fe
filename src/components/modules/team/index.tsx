import { TEAM_MEMBERS } from "./constants";
import { TeamMemberCard } from "./elements";

export function TeamPageModule() {
  return (
    <div className="items-center w-full z-0 min-h-screen relative justify-items-center gap-16">
      <div className="w-full relative -z-10 md:px-20 px-8 md:pb-12 pb-6 md:pt-32 pt-20">
        <div className="border-l-4 md:py-3 py-1 md:pl-6 pl-3 border-[#1059BD] text-neutral-950 font-semibold text-lg md:text-2xl">
          Our Team
        </div>
      </div>
      <div className="flex flex-col gap-8 px-8 md:px-20 pb-20 w-full">
        {TEAM_MEMBERS.map((member) => (
          <TeamMemberCard key={member.name} {...member} />
        ))}
      </div>
    </div>
  );
}
