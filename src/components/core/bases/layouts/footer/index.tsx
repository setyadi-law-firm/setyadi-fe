"use client";

import { Assets } from "@/components/core/constants";
import { LocateIcon, Mail, MapPin, Phone, PhoneCall } from "lucide-react";
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            vestibulum at lorem a mattis.
          </p>
        </div>
        <div className="flex max-md:flex-col gap-y-8 gap-x-6">
          <div className="flex gap-3">
            <Mail size={20} className="text-white" />
            <p className="text-sm max-md:text-xs text-white">setyadi@gmail.com</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <MapPin size={20} className="text-white" />
              <p className="text-sm max-md:text-xs text-white">Jl. Alamat Kantor</p>
            </div>
            <div className="flex gap-3">
              <Phone size={20} className="text-white" />
              <p className="text-sm max-md:text-xs text-white">022-23294834</p>
            </div>
            <div className="flex gap-3">
              <Mail size={20} className="text-white" />
              <p className="text-sm max-md:text-xs text-white">setyadi@gmail.com</p>
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
