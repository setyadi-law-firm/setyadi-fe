import { Assets } from "@/components/core";
import { cn } from "@/lib";
import Image from "next/image";

export function HomeModule() {
  return (
    <div className="items-center w-full z-0 min-h-screen relative justify-items-center gap-16">
      <div className="absolute w-full h-[100vh] top-0 -z-10">
        <Image
          fill
          priority
          quality={100}
          alt="Hero Background Image"
          src={Assets.homeHeroBg}
          className={cn(
            "object-cover pointer-events-none object-left -z-10 brightness-[40%] grayscale select-none drag-none"
          )}
        />
      </div>
      <div className="min-h-screen w-full text-neutral-50 gap-7 flex items-center justify-center flex-col text-center pt-20 z-10">
        <h1 className="md:text-5xl font-bold">
          Results Matter <br /> Make it Possible
        </h1>
        <p className="w-2/3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          vestibulum at lorem a mattis. Suspendisse eu vulputate orci, ut
          viverra libero. Duis accumsan sapien nunc,
        </p>
        <div className="bg-[#1059BD] cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out text-white font-bold py-4 px-10 rounded-xl mt-10">
          Button
        </div>
      </div>
      <div className="min-h-screen w-full bg-neutral-600" />
      <div className="min-h-screen w-full bg-neutral-600" />
      <div className="min-h-screen w-full bg-neutral-600" />
    </div>
  );
}
