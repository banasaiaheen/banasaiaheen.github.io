import { cn } from "../../utils/cn";

/**
 * Figma: icon/ status-dot — green availability dot with a looping glow, shown
 * beside the job title in navigation to signal "open to work". The animation
 * (2.2s) comes from the Figma motion data via --animate-status-* in
 * src/styles/tokens.css, and is switched off for reduced-motion users.
 */
export default function IconStatusDot({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative block size-[14px] shrink-0", className)}>
      <span className="absolute inset-0 rounded-full bg-alpha-green-28 animate-status-glow motion-reduce:animate-none" />
      <span className="absolute left-[3px] top-[3px] size-2 rounded-full bg-accent-green animate-status-dot motion-reduce:animate-none" />
    </span>
  );
}
