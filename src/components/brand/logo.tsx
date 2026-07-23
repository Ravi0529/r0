"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = Readonly<{
  className?: string;
}>;

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        alt="r0 logo"
        aria-hidden={false}
        className="h-full w-auto dark:hidden"
        height={40}
        priority
        src="/logo-light-mode.svg"
        width={62}
      />
      <Image
        alt=""
        aria-hidden
        className="hidden h-full w-auto dark:block"
        height={40}
        priority
        src="/logo-dark-mode.svg"
        width={62}
      />
    </span>
  );
}
