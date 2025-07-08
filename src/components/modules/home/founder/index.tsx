import { FOUNDER_DATA } from "./constant";
import { Assets } from "@/components/core";
import Image from "next/image";

export function FounderSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            The Founder
          </h2>
        </div>

        <div className="flex max-md:flex-col items-start gap-8">
          {/* Left Content - Founder Image and Info */}
          {/* Founder Image */}
          <div className="relative md:w-1/2 w-full max-md:px-12 max-w-2xl mx-auto lg:mx-0">
            <div className="aspect-[9/16] relative rounded-2xl overflow-hidden">
              <Image
                src={Assets.team1}
                alt="Dr. Didik Sasono Setyadi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Content - Companies Grid */}
          <div className="space-y-6">
            <div className="text-left">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Dr. Didik Sasono Setyadi, S.H., M.H.
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Meet our founder, a seasoned professional with a wealth of
                experience across Indonesia's leading companies. As a trusted
                advisor, strategic leader, and key contributor in various
                capacities, his diverse background underpins our strong
                foundation.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {FOUNDER_DATA.map((item, index) => (
                <div
                  key={`${item.img_url}-${index}`}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 items-center flex flex-col w-full gap-2 justify-between"
                >
                  {/* Description */}
                  <div className="text-center">
                    <p className="text-gray-600 text-xs md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  {/* Company Logo */}
                  <div className="flex items-center justify-center mb-4 aspect-video w-full md:px-8">
                    <div className="relative w-full aspect-video">
                      <Image
                        src={item.img_url}
                        alt={`Company logo ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
