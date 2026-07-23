"use client";

import { useState } from "react";
import { ExternalLink, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import type { ProjectFragment } from "@/features/projects/fragment-types";

export default function FragmentWeb({
  data,
}: Readonly<{
  data: ProjectFragment;
}>) {
  const [fragmentKey, setFragmentKey] = useState(0);
  const [copied, setCopied] = useState(false);

  function onRefresh() {
    setFragmentKey((prev) => prev + 1);
  }

  function onCopy() {
    navigator.clipboard.writeText(data.sandboxUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-none">
      <div className="flex items-center gap-x-2 border-b border-border/60 bg-sidebar/70 p-2 backdrop-blur-sm">
        <Hint text="Refresh" side="bottom" align="start">
          <Button
            size="icon-sm"
            variant="outline"
            onClick={onRefresh}
            className="rounded-full border-border/60 bg-background/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            <RefreshCcw className="size-4" />
          </Button>
        </Hint>
        <Hint
          text={copied ? "Copied" : "Click to copy"}
          side="bottom"
          align="start"
        >
          <Button
            size="sm"
            variant="outline"
            onClick={onCopy}
            disabled={!data.sandboxUrl || copied}
            className="flex-1 justify-start rounded-full border-border/60 bg-background/80 text-start font-normal shadow-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="truncate">{data.sandboxUrl}</span>
          </Button>
        </Hint>

        <Hint text="Open in new tab" side="bottom" align="start">
          <Button
            size="icon-sm"
            variant="outline"
            onClick={() => {
              if (!data.sandboxUrl) return;
              window.open(data.sandboxUrl, "_blank");
            }}
            className="rounded-full border-border/60 bg-background/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            <ExternalLink className="size-4" />
          </Button>
        </Hint>
      </div>
      <iframe
        key={fragmentKey}
        className="h-full w-full bg-background"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        src={data.sandboxUrl}
        title={data.title}
      />
    </div>
  );
}
