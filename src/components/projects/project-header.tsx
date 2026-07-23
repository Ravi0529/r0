"use client";

import Link from "next/link";
import { ChevronDownIcon, ChevronLeftIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useGetProjectById } from "@/features/projects/hooks/projects";

function formatProjectName(name: string) {
  return name.replaceAll("-", " ");
}

export default function ProjectHeader({
  projectId,
}: Readonly<{
  projectId: string;
}>) {
  const { data: project, isPending } = useGetProjectById(projectId);
  const { setTheme, theme } = useTheme();

  return (
    <header className="flex items-center justify-between border-b border-border/60 bg-background/70 px-3 py-2 backdrop-blur-sm">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              size="sm"
              variant="ghost"
              className="min-w-0 justify-start gap-3 rounded-full px-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/60 focus-visible:ring-0"
            >
              <BrandLogo className="h-7 w-auto shrink-0" />
              <span className="min-w-0 truncate text-sm font-semibold capitalize tracking-tight">
                {isPending ? (
                  <Spinner />
                ) : (
                  formatProjectName(project?.name || "Untitled Project")
                )}
              </span>
              <ChevronDownIcon className="ml-2 size-4" />
            </Button>
          }
        />

        <DropdownMenuContent
          side="bottom"
          align="start"
          className="w-72 rounded-3xl border border-border/60 bg-popover/95 p-2 shadow-xl backdrop-blur-xl"
        >
          <DropdownMenuItem
            render={
              <Link
                href="/"
                className="flex items-center gap-2.5 rounded-2xl px-3 py-2"
              >
                <ChevronLeftIcon className="size-4" />
                <span>Go to Dashboard</span>
              </Link>
            }
          />
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2 rounded-2xl">
              <SunMoonIcon className="size-4 text-muted-foreground" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                sideOffset={5}
                className="rounded-3xl border border-border/60 bg-popover/95 p-2 shadow-xl backdrop-blur-xl"
              >
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem className="rounded-2xl" value="light">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="rounded-2xl" value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem className="rounded-2xl" value="system">
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
