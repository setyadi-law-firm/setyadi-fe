import type { Metadata } from "next";
import "./globals.css";
import {
  IsLoadedProvider,
  QueryProvider,
  SessionProviders,
} from "@/components";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib";
import { Toaster } from "@/components/ui/sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "D.S. Setyadi & Partners",
  description:
    "D.S. Setyadi & Partners is a law firm based in Indonesia, we provide tailored legal solutions to help businesses navigate the complexities of the energy sector, from policy advice to dispute resolution and sustainable energy development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          plusJakartaSans.variable
        )}
      >
        <IsLoadedProvider>
          <QueryProvider>
            <SessionProviders>
              {children}
              <Toaster />
            </SessionProviders>
          </QueryProvider>
        </IsLoadedProvider>
      </body>
    </html>
  );
}
