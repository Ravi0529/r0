"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";
import { R0Logo } from "@/components/brand/r0-logo";

export function GlassNavbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="pointer-events-auto flex h-15 w-full max-w-3xl items-center justify-between rounded-full border border-border/50 bg-background/70 px-4 shadow-sm backdrop-blur-xl supports-backdrop-filter:bg-background/50">
        <Link href="/" className="flex items-center">
          <R0Logo className="gap-2" />
        </Link>
        <UserButton />
        <ModeToggle />
      </nav>
    </header>
  );
}
