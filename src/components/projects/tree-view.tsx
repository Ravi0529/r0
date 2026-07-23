"use client";

import type { TreeItem } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  ChevronRightIcon,
  FileCodeIcon,
  FileIcon,
  FileJsonIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react";
import { useState } from "react";

function getFileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
      return <FileCodeIcon className="size-4 shrink-0 text-sky-500" />;
    case "json":
      return <FileJsonIcon className="size-4 shrink-0 text-amber-500" />;
    case "css":
    case "scss":
      return <FileCodeIcon className="size-4 shrink-0 text-pink-500" />;
    case "md":
    case "txt":
      return <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />;
    default:
      return <FileIcon className="size-4 shrink-0 text-muted-foreground" />;
  }
}

function getItemName(item: TreeItem) {
  return String(Array.isArray(item) ? item[0] : item);
}

export function TreeView({
  data,
  value,
  onSelect,
}: Readonly<{
  data: readonly TreeItem[];
  value: string | null;
  onSelect?: (filePath: string) => void;
}>) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-10 shrink-0 items-center border-b border-border/60 px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        Files
      </div>
      <div className="min-h-0 flex-1 overflow-auto py-2">
        {data.map((item) => (
          <TreeNode
            key={getItemName(item)}
            item={item}
            selectedValue={value}
            onSelect={onSelect}
            nodeKey={getItemName(item)}
            parentPath=""
            depth={0}
          />
        ))}
      </div>
    </div>
  );
}

function TreeNode({
  item,
  selectedValue,
  onSelect,
  parentPath,
  depth,
  nodeKey,
}: Readonly<{
  item: TreeItem;
  selectedValue: string | null;
  onSelect?: (filePath: string) => void;
  parentPath: string;
  depth: number;
  nodeKey: string;
}>) {
  const [open, setOpen] = useState(true);

  const [name, ...children] = Array.isArray(item) ? item : [item];
  const currentPath = parentPath ? `${parentPath}/${name}` : String(name);
  const isFolder = children.length > 0;

  const indent = 8 + depth * 12;

  if (!isFolder) {
    const isSelected = selectedValue === currentPath;

    return (
      <button
        type="button"
        onClick={() => onSelect?.(currentPath)}
        style={{ paddingLeft: indent + 18 }}
        className={cn(
          "flex w-full items-center gap-2 rounded-r-2xl py-1.5 pr-3 text-sm transition-all duration-300 hover:-translate-y-px hover:bg-accent/70",
          isSelected
            ? "bg-primary/10 font-medium text-foreground shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary)_20%,transparent)]"
            : "text-foreground/80",
        )}
        title={name}
      >
        <span
          className={cn(
            "transition-transform duration-300",
            isSelected && "text-primary",
          )}
        >
          {getFileIcon(String(name))}
        </span>
        <span className="truncate">{name}</span>
      </button>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{ paddingLeft: indent }}
        className="flex w-full items-center gap-1.5 rounded-r-2xl py-1.5 pr-3 text-sm text-foreground/90 transition-all duration-300 hover:-translate-y-px hover:bg-accent/70"
        title={name}
      >
        <ChevronRightIcon
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-90",
          )}
        />
        {open ? (
          <FolderOpenIcon className="size-4 shrink-0 text-primary" />
        ) : (
          <FolderIcon className="size-4 shrink-0 text-primary" />
        )}
        <span className="truncate font-medium">{name}</span>
      </button>

      {open && (
        <div className="animate-in slide-in-from-top-1 duration-200">
          {children.map((child) => (
            <TreeNode
              key={`${nodeKey}/${getItemName(child)}`}
              item={child}
              selectedValue={selectedValue}
              onSelect={onSelect}
              nodeKey={`${nodeKey}/${getItemName(child)}`}
              parentPath={currentPath}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
