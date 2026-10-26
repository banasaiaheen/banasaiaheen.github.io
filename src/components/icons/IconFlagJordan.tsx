import { cn } from "../../utils/cn";
import jordanFlag from "../../assets/jordan-flag.png";

/** Figma: icon/ flag-jordan — shown beside the location in navigation. Swap the asset in src/assets to change the flag. */
export default function IconFlagJordan({ className }: { className?: string }) {
  return <img src={jordanFlag} alt="" className={cn("h-[17px] w-[18px] shrink-0 object-cover", className)} />;
}
