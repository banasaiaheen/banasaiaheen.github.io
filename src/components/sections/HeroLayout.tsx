import type { ReactNode } from "react";
import GhostNumber from "./GhostNumber";

/**
 * The split layout shared by the home section and the 404 page: a cream panel
 * (label, title with a red-ruled sub-text, button) beside a red panel (year or
 * code, tagline, ghost lettering). Stacks on responsive.
 *
 *  label / title / subText   the cream panel texts
 *  action                    the button (pass a <Button type="primary" />)
 *  redLabel / tagline        the red panel texts
 *  ghostMain                 the big centered lettering ("UX/UI", "404")
 *  ghostCorner               the numeral clipped at the bottom corner ("00")
 */
export interface HeroLayoutProps {
  id?: string;
  label: string;
  title: string;
  subText: string;
  action: ReactNode;
  redLabel: string;
  tagline: string;
  ghostMain: string;
  ghostCorner?: string;
}

export default function HeroLayout({
  id,
  label,
  title,
  subText,
  action,
  redLabel,
  tagline,
  ghostMain,
  ghostCorner,
}: HeroLayoutProps) {
  return (
    <section id={id} className="flex w-full flex-col bg-brand-cream lg:min-h-[970px] lg:flex-row">
      {/* left: cream panel */}
      <div className="flex min-h-[329px] flex-col items-end justify-between border-neutral-87 px-4 pb-12 pt-4 lg:min-h-0 lg:min-w-[604px] lg:flex-1 lg:self-stretch lg:border-e-[0.8px] lg:ps-[34px] lg:pe-[24.8px] lg:py-12">
        <span className="w-full text-light-12 text-neutral-32">{label}</span>
        <div className="flex w-full flex-col items-start gap-[14px]">
          <h1 className="w-full text-black-56 text-brand-ink">{title}</h1>
          <p className="w-full border-s-2 border-brand-red ps-[18px] text-light-18 text-neutral-32 lg:w-[357px]">
            {subText}
          </p>
        </div>
        <div className="w-full lg:w-[166px]">{action}</div>
      </div>

      {/* right: red panel */}
      <div className="relative flex min-h-[336px] flex-col items-center justify-between overflow-hidden bg-brand-red px-4 py-4 lg:min-h-0 lg:min-w-[580px] lg:flex-1 lg:self-stretch lg:px-10 lg:py-12">
        <span className="w-full text-light-12 text-brand-white">{redLabel}</span>
        <div className="flex w-full flex-1 items-center justify-center">
          <p className="text-bold-32 text-brand-white">{tagline}</p>
        </div>
        <GhostNumber
          value={ghostMain}
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] text-brand-ink lg:text-[224px]"
        />
        {ghostCorner && (
          <GhostNumber
            value={ghostCorner}
            className="bottom-0 end-20 translate-x-full translate-y-1/2 text-[150px] text-brand-cream rtl:-translate-x-full lg:bottom-[112px] lg:end-[184px] lg:text-[224px]"
          />
        )}
      </div>
    </section>
  );
}
