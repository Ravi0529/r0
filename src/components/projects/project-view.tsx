"use client";

import { useState } from "react";
import Link from "next/link";
import { Code, CrownIcon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fragment } from "@/generated/prisma/client";
import ProjectHeader from "./project-header";
import MessageContainer from "./message-container";
import FragmentWeb from "./fragment-web";
import { FileExplorer } from "./file-explorer";

export type ProjectFragment = Fragment & {
  files: Record<string, string>;
};

export function ProjectView({
  projectId,
}: Readonly<{
  projectId: string;
}>) {
  const [activeFragment, setActiveFragment] = useState<ProjectFragment | null>(
    null,
  );
  const [tabState, setTabState] = useState<"preview" | "code">("preview");

  return (
    <div className="h-screen bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary)_4%,var(--background))_0%,var(--background)_38%,var(--background)_100%)] dark:bg-background">
      <ResizablePanelGroup className="h-full" orientation="horizontal">
        <ResizablePanel
          defaultSize={28}
          minSize={20}
          className="flex min-h-0 flex-col border-r border-border/60 bg-sidebar/40 backdrop-blur-sm"
        >
          <ProjectHeader projectId={projectId} />
          <MessageContainer
            projectId={projectId}
            activeFragment={activeFragment}
            setActiveFragment={setActiveFragment}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={72}
          minSize={45}
          className="min-w-0 bg-background/60 backdrop-blur-sm"
        >
          <Tabs
            className="flex h-full flex-col"
            defaultValue="preview"
            value={tabState}
            onValueChange={(value) => setTabState(value as "preview" | "code")}
          >
            <div className="flex w-full items-center gap-x-2 border-b border-border/60 bg-background/70 px-3 py-2 backdrop-blur-sm">
              <TabsList className="h-9 rounded-full border border-border/60 bg-muted/70 p-1 shadow-sm">
                <TabsTrigger
                  value="preview"
                  className="flex items-center gap-x-2 rounded-full px-3"
                >
                  <EyeIcon className="size-4" />
                  <span>Demo</span>
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="flex items-center gap-x-2 rounded-full px-3"
                >
                  <Code className="size-4" />
                  <span>Code</span>
                </TabsTrigger>
              </TabsList>

              <div className="ml-auto flex items-center gap-x-2">
                <Button
                  nativeButton={false}
                  render={
                    <Link href="/" className="flex items-center gap-2">
                      <CrownIcon className="size-4" />
                      Upgrade
                    </Link>
                  }
                  size="sm"
                  variant="outline"
                  className="rounded-full border-border/60 bg-background/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                />
              </div>
            </div>

            <TabsContent
              value="preview"
              className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden"
            >
              {activeFragment ? (
                <FragmentWeb data={activeFragment} />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Select a fragment to preview
                </div>
              )}
            </TabsContent>

            <TabsContent
              value="code"
              className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=inactive]:hidden"
            >
              {activeFragment?.files &&
              Object.keys(activeFragment.files).length > 0 ? (
                <FileExplorer files={activeFragment.files} />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Select a fragment to view code
                </div>
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
