import { cn } from "../../utils/cn";
// `?inline` embeds the 10 KB image in the JavaScript bundle as a data URL, so the flag
// never needs a request of its own: it can't fail to load, and it shows instantly when
// the responsive menu opens or the page changes.
import jordanFlag from "../../assets/jordan-flag.png?inline";

/** Figma: icon/ flag-jordan — shown beside the location in navigation. Swap the asset in src/assets to change the flag. */
export default function IconFlagJordan({ className }: { className?: string }) {
  return (
    <img
      src={jordanFlag}
      alt=""
      width={18}
      height={17}
      decoding="sync"
      className={cn("h-[17px] w-[18px] shrink-0 object-cover", className)}
    />
  );
}
