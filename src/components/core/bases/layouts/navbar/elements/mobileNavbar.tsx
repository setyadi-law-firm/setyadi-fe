"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { NavLink } from "./navLink";
import { LINKS } from "../constants";
import { RxHamburgerMenu } from "react-icons/rx";

export const MobileNavbar = () => {
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

  const [isOpen, setIsOpen] = useState(false);

  const FE_URL: string = process.env.NEXT_PUBLIC_FE_URL as string;
  const WA_URL: string = process.env.NEXT_PUBLIC_WHATSAPP_URL as string;

  return (
    <>
      <nav
        className={`sticky border-slate-400 h-16 w-full border-0 flex items-center px-5 gap-4 justify-between transition-all duration-1000 z-50 -mb-16 overflow-x-clip ${
          isOpen || isScrolledPastScreenHeight
            ? "absolute top-0 backdrop-blur bg-white bg-opacity-none"
            : "-top-36 bg-white border-opacity-10 bg-opacity-0"
        } ${isOpen ? "-translate-y-28" : ""}`}
      >
        <div className="flex flex-row-reverse justify-between w-full items-center relative">
          <div
            className={`bg-gradient-to-b from-[#ffffffff] via-[#ffffff] to-[#ffffff00] transition-all duration-1000 absolute top-[calc(-100%-12px)] -left-1/2 -right-1/2 w-[200%] h-[600%] z-40 ${
              isScrolledPastScreenHeight ? "opacity-100" : "opacity-0"
            }`}
          />

          <NavLink href="/" className="z-50">
            {/* <Image
              src={Assets.logoBlack}
              alt="Kapaloku Logo"
              width={64}
              height={64}
              className={`transition-all duration-1000 ${
                isScrolledPastScreenHeight ? "" : "invert"
              }`}
            /> */}
            Logo
          </NavLink>
          <button onClick={() => setIsOpen(true)} className="md:hidden z-50">
            <RxHamburgerMenu
              className={`${"text-neutral-50"} text-3xl transition-all duration-1000 ${
                isScrolledPastScreenHeight ? "invert" : ""
              }`}
            />
          </button>
        </div>
      </nav>
      <div
        onClick={() => setIsOpen(false)}
        className={`z-20 fixed bottom-0 ${
          isOpen ? "top-0" : "-top-[150vh]"
        } z-20 md:static transition-all duration-1000 py-14 px-10 bg-neutral-50 w-full font-normal md:w-max h-screen md:h-full flex flex-col md:flex-row text-xl md:text-base gap-4 flex-1`}
      >
        {/* <Link
          href="/"
          className="flex items-center gap-3 justify-center md:hidden"
        >
          <Image
            src={Assets.logoBlack}
            alt="Kapaloku Logo"
            width={64}
            height={64}
          />
          <span className="font-satoshi text-3xl font-bold text-neutral-950">
            Kapaloku
          </span>
        </Link> */}
        {/* <button onClick={() => setIsOpen(false)} className="md:hidden">
          <HiX className="text-white-1 text-3xl" />
        </button> */}
      </div>
    </>
  );
};
