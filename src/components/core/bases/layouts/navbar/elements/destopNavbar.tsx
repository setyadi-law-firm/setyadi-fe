"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavLink } from "./navLink";
import { LINKS } from "../constants";
import { Assets } from "@/components";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      className={`sticky h-20 w-full flex items-center px-10 py-3 gap-4 justify-between transition-all duration-1000 z-50 -mb-20 overflow-x-clip left-4 right-0 scale-95 rounded-2xl ${
        isScrolledPastScreenHeight
          ? "top-4 fixed bg-white bg-opacity-0"
          : "-top-36 bg-white bg-opacity-0 translate-y-4"
      }`}
    >
      <Image
        src={Assets.logo}
        alt="Logo"
        width={140}
        height={140}
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
        ))}{" "}
        {session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">
                <Image
                  src={Assets.userIcon}
                  alt="User Icon"
                  width={24}
                  height={24}
                  className={`transition-all duration-1000`}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex flex-col items-start transition-all">
                  <span className="font-medium">
                    {session.user.name ?? "User"}
                  </span>
                  <span className="text-xs text-muted-foreground w-fit">
                    {session.user.email}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 cursor-pointer transition-all"
                onClick={handleSignOut}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};
