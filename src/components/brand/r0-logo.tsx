import { cn } from "@/lib/utils";

type R0LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

function R0Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      {/* R stem */}
      <path
        d="M10 8V40"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Top bowl */}
      <path
        d="M10 8H24C30 8 34 12 34 18C34 24 30 28 24 28H10"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Leg */}
      <path
        d="M22 28L36 40"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Zero */}
      <circle cx="37" cy="14" r="5" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}

export function R0Logo({ className }: R0LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-foreground",
        className,
      )}
    >
      <R0Mark className="h-7 w-auto" />
    </span>
  );
}

export { R0Mark };
