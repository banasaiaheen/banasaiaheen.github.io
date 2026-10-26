import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";

/**
 * Figma: skillVtool-card (68:8304). Numbered skill or tool tile in About.
 *  number      the tile number (always Latin digits)
 *  skillTool   the skill or tool name — pass the translated string
 *  direction   ltr | rtl (defaults to the page direction)
 */
export interface SkillToolCardProps {
  number: string;
  skillTool: string;
  direction?: Direction;
  className?: string;
}

export default function SkillToolCard({ number, skillTool, direction, className }: SkillToolCardProps) {
  const dir = useDirection(direction);
  return (
    <div dir={dir} className={cn("flex flex-col items-start gap-2 py-3 text-start", className)}>
      <span className="w-full text-regular-12 text-brand-red-bright">{number}</span>
      <span className="w-full text-bold-16 text-brand-cream">{skillTool}</span>
    </div>
  );
}
