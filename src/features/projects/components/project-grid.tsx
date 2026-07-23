"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProjects } from "@/features/projects/hooks/projects";
import { getProjectThumbnailUrl } from "../lib";
import { cn } from "@/lib/utils";

function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-3xl border-border/60 bg-card/70 py-0 shadow-sm backdrop-blur-sm">
      <Skeleton className="aspect-square w-full rounded-none" />
      <CardHeader className="px-4 pb-4">
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
    </Card>
  );
}

function formatProjectName(name: string) {
  return name.replaceAll("-", " ");
}

export function ProjectGrid() {
  const { data: projects, isLoading, isError } = useGetProjects();

  if (isError) {
    return null;
  }

  if (!isLoading && (!projects || projects.length === 0)) {
    return null;
  }

  return (
    <section className="w-full">
      <h2 className="mb-4 text-sm font-medium text-muted-foreground">
        Your projects
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))
          : projects?.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group block transition-transform duration-300 hover:-translate-y-1"
              >
                <Card
                  className={cn(
                    "overflow-hidden rounded-3xl border-border/60 bg-card/70 py-0 shadow-sm backdrop-blur-sm",
                    "transition-all duration-300 hover:border-border hover:bg-card/90 hover:shadow-xl",
                  )}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      fill
                      alt=""
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                      sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      src={getProjectThumbnailUrl(project.id)}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <CardHeader className="px-4 pb-4">
                    <CardTitle className="flex items-center justify-between gap-2 truncate capitalize text-sm">
                      {formatProjectName(project.name)}
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
      </div>
    </section>
  );
}
