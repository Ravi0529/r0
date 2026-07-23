"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUpIcon } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreateMessage } from "@/features/messages/hooks/messages";
import { cn } from "@/lib/utils";

const MAX_LENGTH = 5000;

export default function MessageForm({
  projectId,
}: Readonly<{
  projectId: string;
}>) {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { mutateAsync, isPending } = useCreateMessage(projectId);

  async function onSubmit() {
    const trimmed = content.trim();

    if (!trimmed) {
      toast.error("Message description is required");
      return;
    }

    if (trimmed.length > MAX_LENGTH) {
      toast.error("Description is too long");
      return;
    }

    try {
      await mutateAsync(trimmed);
      setContent("");
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message",
      );
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit();
      }}
      className={cn(
        "relative rounded-3xl border border-border/60 bg-card/85 p-4 pt-1 shadow-sm backdrop-blur-sm transition-all duration-300 dark:bg-sidebar/85",
        isFocused &&
          "border-primary/30 shadow-xl shadow-primary/10 ring-2 ring-primary/15",
      )}
    >
      <TextareaAutosize
        value={content}
        onChange={(event) => setContent(event.target.value)}
        disabled={isPending}
        placeholder="Describe what you want to create..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        minRows={3}
        maxRows={8}
        className={cn(
          "w-full resize-none border-none bg-transparent pt-4 text-sm leading-6 outline-none placeholder:text-muted-foreground/70",
          isPending && "opacity-50",
        )}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            void onSubmit();
          }
        }}
      />

      <div className="flex items-end justify-between gap-x-2 pt-2">
        <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-md border border-border/60 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
            <span>&#8984;</span>Enter
          </kbd>
          <span>to submit</span>
        </div>
        <Badge
          variant="outline"
          className="hidden border-border/60 bg-background/80 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline-flex"
        >
          Ctrl / Cmd
        </Badge>
        <Button
          className={cn(
            "size-9 rounded-full shadow-sm transition-all duration-300 hover:-translate-y-0.5",
            isPending && "border bg-muted-foreground",
          )}
          disabled={isPending || !content.trim()}
          type="submit"
        >
          {isPending ? <Spinner className="size-4" /> : <ArrowUpIcon className="size-4" />}
        </Button>
      </div>
    </form>
  );
}
