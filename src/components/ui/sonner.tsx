"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          error: "!bg-[#D7372B]",
          success: "!bg-[#00C814]",
          warning: "!bg-[#FFD569] !text-neutral-950",
          info: "!bg-[#1059BD]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
