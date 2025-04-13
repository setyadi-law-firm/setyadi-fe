import { Assets } from "@/components/core";
import { cn } from "@/lib";
import Image from "next/image";

export function AboutSection() {
  return (
    <div className="max-md:px-12 max-md:py-8 px-16 py-12 bg-slate-900 text-neutral-50 w-full z-0 relative flex flex-col gap-8">
      <h1 className="md:text-4xl text-3xl font-bold">About Us</h1>
      <p>
        Cras et sollicitudin ex, et finibus velit. Class aptent taciti sociosqu
        ad litora torquent per conubia nostra, per inceptos himenaeos. In non
        dignissim diam. Aliquam et lacus nec mauris cursus porttitor. Nullam
        vulputate metus id tempor efficitur. In orci elit, ullamcorper non quam
        nec, vestibulum rhoncus est. Mauris fermentum lacus eu ex facilisis
        aliquam.
      </p>
    </div>
  );
}
