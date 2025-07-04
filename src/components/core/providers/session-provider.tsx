"use client";
import { SessionProvider } from "next-auth/react";

export function SessionProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
}
