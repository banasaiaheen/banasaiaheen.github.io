import { cn } from "../../utils/cn";

/** The circled "i" shown before the title of a `message` notice. Uses currentColor. */
export default function IconInfo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={cn("size-6 shrink-0", className)}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="7.75" r="0.6" fill="currentColor" />
    </svg>
  );
}
