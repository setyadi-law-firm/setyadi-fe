"use client";

import { Assets } from "@/components/core/constants";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#11305A] text-white flex flex-col items-center justify-center md:px-12 md:py-10 p-6 gap-8">
      <div className="flex md:gap-16 gap-4 justify-between w-full">
        <div className="flex flex-col max-md:justify-between">
          <Image
            src={Assets.logoWhite}
            alt="Logo"
            width={100}
            height={100}
            className=""
          />
          <p className="text-sm max-md:text-xs text-white mt-2">
            A consulting firm driven to empower energy sector businesses with
            clarity and strategic insight.
          </p>
        </div>
        <div className="flex max-md:flex-col gap-y-8 gap-x-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <MapPin size={20} className="text-white" />
              <p className="text-sm max-md:text-xs text-white">
                Bumi Pusaka Cinere, Gandul, Cinere, Depok 16514, Jawa Barat,
                Indonesia
              </p>
            </div>
            <div className="flex gap-3">
              <Phone size={20} className="text-white" />
              <p className="text-sm max-md:text-xs text-white">
                +62 21 7532 420
              </p>
            </div>
            <div className="flex gap-3">
              <Mail size={20} className="text-white" />
              <p className="text-sm max-md:text-xs text-white">
                setyadiandpartner@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0.5 bg-[#1059BD] w-full" />
      <p className="text-sm text-white text-center">
        © 2025 D. S. Setyadi & Partners All rights reserved.
      </p>
    </footer>
  );
};
