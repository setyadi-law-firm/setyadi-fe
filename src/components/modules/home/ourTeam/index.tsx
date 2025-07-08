import { Button } from "@/components/ui/button";
import { Assets } from "@/components/core";
import Image from "next/image";
import Link from "next/link";

export function OurTeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Didik Sasono Setyadi, S.H., M.H.",
      title: "Partner of the D.S. Setyadi & Partners Firm",
      image: Assets.team1,
    },
    {
      id: 2,
      name: "Azeem M. Amedi",
      title: "Partner of the D.S. Setyadi & Partners Firm",
      image: Assets.team2,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-8 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Our Team
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Our legal and business experts bring deep knowledge and ready to
                support clients through every stage of growth.
              </p>
            </div>

            <Link href="/team">
              <Button
                className="bg-[#1059BD] hover:bg-blend-darken text-white px-8 py-6 rounded-xl font-medium text-base transition-colors duration-200 w-full"
                size="lg"
              >
                Explore Our Team
              </Button>
            </Link>
          </div>

          {/* Right Content - Team Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="duration-300 overflow-hidden"
              >
                {/* Team Member Image */}
                <div className="aspect-[4/5] relative overflow-clip rounded-2xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Team Member Info */}
                <div className="py-4 space-y-2">
                  <h3 className="font-semibold text-gray-900 text-lg md:text-md leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[#1059BD] text-sm md:text-md leading-relaxed">
                    {member.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
