import { GlassNavbar } from "@/components/home/glass-navbar";
import { HomeBackground } from "@/components/home/home-background";
import { PromptInput } from "@/components/home/prompt-input";
import { ProjectGrid } from "@/features/projects/components/project-grid";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      <HomeBackground />
      <GlassNavbar />
      <main className="flex flex-1 flex-col items-center px-4 pb-16 pt-28">
        <div className="flex w-full max-w-4xl flex-col items-center gap-8 text-center">
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              What do you want to create?
            </h1>
            <p className="mx-auto max-w-2xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base">
              Describe the app, feature, or experiment you want and let r0 turn
              it into a polished build with preview and code side-by-side.
            </p>
          </div>
          <PromptInput />
        </div>

        <div className="mt-16 w-full max-w-6xl">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              Recent projects
            </h2>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              Open a project
              <ArrowRight className="size-3" />
            </span>
          </div>
          <ProjectGrid />
        </div>
      </main>
    </div>
  );
}
