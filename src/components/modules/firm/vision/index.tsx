import { Button } from "@/components/ui/button";

export function VisionSection() {
  return (
    <div className="items-center w-full z-0 relative flex max-md:flex-col max-md:px-12 max-md:py-12 px-16 py-18 justify-items-center gap-16">
      <div className="md:w-2/3 flex flex-col">
        <h3 className="text-2xl text-[#1059BD] font-semibold mb-8">
          Trusted Lawyers with a Vision for Excellence
        </h3>
        <h4 className="text-lg text-neutral-950 font-semibold mb-4">
          Our Mission
        </h4>
        <p className="text-[#777675]">
          To provide trusted, effective, and timely legal solutions that help
          our clients achieve their goals — whether navigating regulatory
          frameworks, resolving disputes, or managing risk in an evolving
          market.
        </p>
      </div>
      <div className="md:w-1/3 flex flex-col items-center">
        <p className="text-[#777675] font-semibold mb-4">
          Our legal and business experts bring deep knowledge and ready to
          support clients through every stage of growth.
        </p>
        <Button
          variant={"default"}
          className="bg-[#1059BD] text-white hover:bg-[#0e4da8] w-full mt-4"
          onClick={() =>
            window.open("https://www.linkedin.com/company/legally-legal/")
          }
        >
          Explore Our Team
        </Button>
      </div>
    </div>
  );
}
