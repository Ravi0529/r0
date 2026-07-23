"use client";

import { Response } from "@/components/ai-elements/response";
import { BrandLogo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  parseFragmentFiles,
  type ProjectFragment,
} from "@/features/projects/fragment-types";
import { cn } from "@/lib/utils";
import type { Fragment } from "@/generated/prisma/client";
import { MessageRole, MessageType } from "@/generated/prisma/enums";
import { format } from "date-fns";
import { ArrowUpRight, Code2Icon } from "lucide-react";

function FragmentCard({
  fragment,
  isActiveFragment,
  onFragmentClick,
}: Readonly<{
  fragment: Fragment;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: ProjectFragment) => void;
}>) {
  return (
    <button
      type="button"
      className={cn(
        "group flex w-fit items-start gap-2 rounded-2xl border border-border/60 bg-card/80 p-3 text-start shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md",
        isActiveFragment &&
          "border-primary/60 bg-primary text-primary-foreground hover:bg-primary",
      )}
      onClick={() =>
        onFragmentClick({
          ...fragment,
          files: parseFragmentFiles(fragment.files),
        })
      }
    >
      <div className="mt-0.5 rounded-xl bg-primary/10 p-2 text-primary transition-transform duration-300 group-hover:scale-105">
        <Code2Icon className="size-4" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <span className="line-clamp-1 text-sm font-medium">
          {fragment.title}
        </span>
        <Badge
          variant="outline"
          className="w-fit border-border/60 bg-background/70 text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          Preview
        </Badge>
      </div>
      <ArrowUpRight className="mt-0.5 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}

/**
 * A message bubble for content authored by the user (right-aligned).
 *
 * @param content - The user's message text.
 */
function UserMessage({ content }: Readonly<{ content: string }>) {
  return (
    <div className="flex justify-end pb-4 pl-10 pr-2">
      <Card className="max-w-[80%] break-word rounded-3xl border border-primary/10 bg-primary/5 p-4 text-sm leading-6 shadow-sm transition-transform duration-300 animate-in fade-in slide-in-from-bottom-2 dark:bg-primary/10">
        {content}
      </Card>
    </div>
  );
}

function AssistantMessage({
  content,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
  type,
}: Readonly<{
  content: string;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: ProjectFragment) => void;
  type: MessageType;
}>) {
  return (
    <div
      className={cn(
        "group flex flex-col px-2 pb-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2",
        type === MessageType.ERROR && "text-red-700 dark:text-red-400",
      )}
    >
      <div className="mb-2 flex items-center gap-2 pl-2">
        <BrandLogo className="h-7 w-auto shrink-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="text-xs text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {format(new Date(createdAt), "HH:mm 'on' MMM dd, yyyy")}
        </span>
      </div>

      <div className="flex flex-col gap-y-4 pl-8.5">
        <Response>{content}</Response>
        {fragment && type === MessageType.RESULT && (
          <FragmentCard
            fragment={fragment}
            isActiveFragment={isActiveFragment}
            onFragmentClick={onFragmentClick}
          />
        )}
      </div>
    </div>
  );
}

export default function MessageCard({
  content,
  role,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
  type,
}: Readonly<{
  content: string;
  role: MessageRole;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: ProjectFragment) => void;
  type: MessageType;
}>) {
  if (role === MessageRole.ASSISTANT) {
    return (
      <AssistantMessage
        content={content}
        fragment={fragment}
        createdAt={createdAt}
        isActiveFragment={isActiveFragment}
        onFragmentClick={onFragmentClick}
        type={type}
      />
    );
  }

  return (
    <div className="mt-5">
      <UserMessage content={content} />
    </div>
  );
}
