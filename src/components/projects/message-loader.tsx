"use client";

import { BrandLogo } from "@/components/brand/logo";
import { useEffect, useState } from "react";

const loadingMessages = [
  "Thinking...",
  "Loading...",
  "Generating...",
  "Processing...",
  "Analyzing your prompt...",
  "Generating response...",
  "Adding final touches...",
  "Almost there...",
];

function ShimmerMessages() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(
        (prevIndex) => (prevIndex + 1) % loadingMessages.length,
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="animate-pulse text-base text-muted-foreground">
      {loadingMessages[currentMessageIndex]}
    </span>
  );
}

export default function MessageLoading() {
  return (
    <div className="group flex flex-col px-2 pb-4 transition-transform duration-300">
      <div className="mb-2 flex items-center gap-2 pl-2">
        <BrandLogo className="h-7 w-auto shrink-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex flex-col gap-y-4 pl-8.5">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-2 shadow-sm backdrop-blur-sm">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <ShimmerMessages />
        </div>
      </div>
    </div>
  );
}
