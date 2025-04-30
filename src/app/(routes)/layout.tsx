"use client";

import { Assets, Navbar, useIsLoaded } from "@/components";
import { cn } from "@/lib";
import Image from "next/image";

const LoadingComponent = () => {
  return (
    <div
      className={cn(
        "w-full h-screen flex justify-center items-center z-[110] transition-all duration-1000 ease-in-out"
      )}
    >
      <Image
        src={Assets.logo}
        alt="Logo"
        width={200}
        height={200}
        className=""
      />
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded } = useIsLoaded();

  return (
    <div
      className={`relative transition-all ease-in-out duration-1000 ${
        !isLoaded ? "overflow-clip" : ""
      } `}
    >
      <div
        className={`transition-all duration-1000 fixed inset-0 z-[100] bg-white w-screen h-screen ${
          !isLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <LoadingComponent />
      </div>
      <Navbar />
      <main className="w-full">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
