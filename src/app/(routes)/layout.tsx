"use client";

import { Navbar } from "@/components";
import { useIsLoaded } from "@/components";
import { cn } from "@/lib";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded } = useIsLoaded();
  const LoadingComponent = () => {
    return (
      <div
        className={cn(
          "w-full h-screen flex justify-center items-center z-[110] transition-all duration-1000 ease-in-out"
        )}
      >
        {/* <Image
          src={Assets.logoBlack}
          alt="Logo"
          width={100}
          height={100}
          className=""
        /> */}
        <div className="aspect-square w-32 h-32 bg-red-500">Ini logo Ges</div>
      </div>
    );
  };

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
