"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavLink } from "./navLink";
import { LINKS } from "../constants";
import { Assets } from "@/components/core/constants";

export const DesktopNavbar = () => {
  const [isScrolledPastScreenHeight, setIsScrolledPastScreenHeight] =
    useState(false);

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

  return (
    <nav
      className={`sticky h-16 w-full flex items-center px-10 py-3 gap-4 justify-between transition-all duration-1000 z-50 -mb-20 overflow-x-clip left-4 right-0 scale-95 rounded-2xl ${
        isScrolledPastScreenHeight
          ? "top-4 absolute bg-white bg-opacity-0"
          : "mt-4 -top-36 bg-white bg-opacity-0"
      }`}
    >
      <div className="text-neutral-950">Logo</div>
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
        <div>
          <Image
            src={Assets.userIcon}
            alt="User Icon"
            width={24}
            height={24}
            className={`transition-all duration-1000 ${
              isScrolledPastScreenHeight ? "" : "invert"
            }`}
          />
        </div>
      </div>
    </nav>
  );
};
