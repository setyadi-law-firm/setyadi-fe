import { Assets } from "@/components/core";
import { cn } from "@/lib";
import Image from "next/image";

export function ContactSection() {
  return (
    <div className="items-center w-full z-0 min-h-screen relative justify-items-center gap-16">
      <div className="absolute w-full h-[100vh] top-0 -z-10">
        <Image
          fill
          priority
          quality={100}
          alt="Hero Contact Image"
          src={Assets.homeContactBg}
          className={cn(
            "object-cover pointer-events-none object-center -z-10 brightness-[40%] grayscale select-none drag-none"
          )}
        />
      </div>
      <div className="min-h-screen w-full text-neutral-50 gap-7 flex items-center justify-center flex-col text-center pt-20 z-10">
        <h1 className="md:text-5xl text-3xl font-bold">Contact Us</h1>
        <div
          onClick={() => {
            window.open(`mailto:setyadiandpartner@gmail.com`, "_blank");
          }}
          className="border-2 border-neutral-50 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out text-white font-bold py-3 px-8 rounded-xl"
        >
          Reach Us
        </div>
      </div>
    </div>
  );
}
