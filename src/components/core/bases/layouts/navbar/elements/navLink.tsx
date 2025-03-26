"use client";
import { usePathname, useRouter } from "next/navigation";
import { useIsLoaded } from "../../../hooks";

export const NavLink = ({
  children,
  isActive = false,
  href,
  className,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  href: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => any;
}) => {
  const { setIsLoaded } = useIsLoaded();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      onClick={() => {
        if (pathname === href) return;
        setIsLoaded(false);
        if (!disabled) {
          setTimeout(() => {
            router.push(href);
          }, 1000);
        }
      }}
      aria-disabled={disabled}
      className={`flex items-center hover:cursor-pointer gap-2 font-medium ${
        isActive ? "text-[#1059BD]" : "text-[#777675]"
      } ${disabled ? "opacity-20" : "opacity-100"} ${className}`}
    >
      {children}
    </div>
  );
};
