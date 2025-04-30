"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavLink } from "./navLink";
import { LINKS } from "../constants";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Assets, LoginModal } from "@/components";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const DesktopNavbar = () => {
  const [isScrolledPastScreenHeight, setIsScrolledPastScreenHeight] =
    useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledPastScreenHeight = window.scrollY >= window.innerHeight;
      setIsScrolledPastScreenHeight(isScrolledPastScreenHeight);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  return (
    <nav
      className={`sticky h-16 w-full flex items-center px-10 py-3 gap-4 justify-between transition-all duration-1000 z-50 -mb-20 overflow-x-clip left-4 right-0 scale-95 rounded-2xl ${
        isScrolledPastScreenHeight
          ? "top-4 fixed bg-white bg-opacity-0"
          : "mt-4 -top-36 bg-white bg-opacity-0"
      }`}
    >
      <Image
        src={Assets.logo}
        alt="Logo"
        width={100}
        height={100}
        className=""
      />
      <div className="flex w-fit items-center relative gap-10">
        {Object.values(LINKS).map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            isActive={pathname === link.href}
            disabled={false}
          >
            <span
              className={`font-semibold -neutral-950-lg transition-all duration-1000`}
            >
              {link.name}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
