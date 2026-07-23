"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/logo";
import { ModeToggle } from "../ui/mode-toggle";

export function GlassNavbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="pointer-events-auto flex h-16 w-full max-w-5xl items-center justify-between rounded-full border border-border/60 bg-background/75 px-4 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 supports-backdrop-filter:bg-background/55 hover:-translate-y-0.5">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-full px-1 py-1 transition-opacity hover:opacity-80"
        >
          <BrandLogo className="h-8 w-auto transition-transform duration-300 group-hover:scale-[1.02]" />
        </Link>
        <div className="flex items-center gap-2">
          <UserButton />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
