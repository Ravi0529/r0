"use client";

import Link from "next/link";
import { ChevronDownIcon, ChevronLeftIcon, SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { R0Mark } from "@/components/brand/r0-logo";
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
    <header className="flex items-center justify-between border-b p-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={(props) => (
            <Button
              {...props}
              variant="ghost"
              size="sm"
              className="pl-2 transition-opacity hover:bg-transparent hover:opacity-75 focus-visible:ring-0"
            >
              <R0Mark className="h-7 w-auto shrink-0" />
              <span className="text-sm font-medium capitalize">
                {isPending ? (
                  <Spinner />
                ) : (
                  formatProjectName(project?.name || "Untitled Project")
                )}
              </span>
              <ChevronDownIcon className="ml-2 size-4" />
            </Button>
          )}
        />

        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuItem
            render={(props) => (
              <Link href="/" {...props}>
                <ChevronLeftIcon className="size-4" />
                <span>Go to Dashboard</span>
              </Link>
            )}
          >
            <ChevronLeftIcon className="size-4" />
            <span>Go to Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <SunMoonIcon className="size-4 text-muted-foreground" />
              <span>Appearance</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent sideOffset={5}>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
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
