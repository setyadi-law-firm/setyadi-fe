"use client";

import { useIsMdOrLarger } from "@/components";
import { DesktopNavbar, MobileNavbar } from "./elements";

export const Navbar = () => {
  const isMdOrLarger = useIsMdOrLarger();

  return <>{isMdOrLarger ? <DesktopNavbar /> : <MobileNavbar />}</>;
};
