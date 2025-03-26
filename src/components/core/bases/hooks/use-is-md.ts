"use client";

import { useEffect, useState } from "react";

export const useIsMdOrLarger = () => {
  const [isMdOrLarger, setIsMdOrLarger] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsMdOrLarger(mediaQuery.matches);

    const handler = (e: any) => setIsMdOrLarger(e.matches);
    mediaQuery.addListener(handler);

    return () => mediaQuery.removeListener(handler);
  }, []);

  return isMdOrLarger;
};

export const useIsSmOrLarger = () => {
  const [isSmOrLarger, setIsSmOrLarger] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    setIsSmOrLarger(mediaQuery.matches);

    const handler = (e: any) => setIsSmOrLarger(e.matches);
    mediaQuery.addListener(handler);

    return () => mediaQuery.removeListener(handler);
  }, []);

  return isSmOrLarger;
};
