"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IsLoadedContextType {
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const IsLoadedContext = createContext<IsLoadedContextType | undefined>(
  undefined
);

export const IsLoadedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <IsLoadedContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </IsLoadedContext.Provider>
  );
};

export const useIsLoaded = () => {
  const context = useContext(IsLoadedContext);
  if (!context) {
    throw new Error("useIsLoaded must be used within a IsLoadedProvider");
  }
  return context;
};
