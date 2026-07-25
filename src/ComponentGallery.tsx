import Button, { type ButtonLanguage, type ButtonVariant, type ButtonVisualState } from "./components/Button";
import Input, { type InputLanguage } from "./components/Input";
import IconArrow from "./components/IconArrow";
import IconNewWindow from "./components/IconNewWindow";
import type { IconLanguage } from "./components/IconNewWindow";
import Pages, { type PagesLanguage } from "./components/Pages";
import ToggleMenu, { type ToggleMenuLanguage } from "./components/ToggleMenu";
import Navigation, { type NavigationLanguage } from "./components/Navigation";
import WorkCard, { type WorkCardLanguage } from "./components/WorkCard";
import EducationCard, { type EducationCardLanguage } from "./components/EducationCard";
import ResourcesCard, { type ResourcesCardLanguage } from "./components/ResourcesCard";
import SkillToolCard, { type SkillToolCardLanguage } from "./components/SkillToolCard";

const VARIANTS: { variant: ButtonVariant; label: string }[] = [
  { variant: "primary", label: "Primary" },
  { variant: "link", label: "Link" },
  { variant: "link-xl", label: "Link XL" },
];

const STATES: { state: ButtonVisualState | "disabled"; label: string }[] = [
  { state: "default", label: "Default" },
  { state: "hover", label: "Hover" },
  { state: "disabled", label: "Disabled" },
];

function ButtonGroup({ language }: { language: ButtonLanguage }) {
  return (
    <div className="flex flex-wrap gap-12">
      {VARIANTS.map(({ variant, label }) => (
        <div key={variant} className="flex flex-col gap-4">
          <h3 className="font-barlow text-sm uppercase tracking-wide text-[#878787]">{label}</h3>
          <div className="flex flex-col gap-4">
            {STATES.map(({ state, label: stateLabel }) => (
              <Button
                key={stateLabel}
                variant={variant}
                language={language}
                state={state === "disabled" ? "default" : state}
                disabled={state === "disabled"}
                trailingIcon
                cta="CTA"
                className={variant === "primary" ? "w-[166px]" : undefined}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function InputGroup({ language }: { language: InputLanguage }) {
  const filledValue = language === "arabic" ? "تمت التعبئة" : "Filled value";
  return (
    <div className="flex flex-wrap gap-12">
      <div className="flex flex-col gap-4">
        <h3 className="font-barlow text-sm uppercase tracking-wide text-[#878787]">
          Single line (click to focus)
        </h3>
        <div className="flex w-[273.5px] flex-col gap-4">
          <Input language={language} trailingIcon />
          <Input language={language} trailingIcon defaultValue={filledValue} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-barlow text-sm uppercase tracking-wide text-[#878787]">
          Free input field (click to focus)
        </h3>
        <div className="flex w-[274px] flex-col gap-4">
          <Input language={language} freeInputField trailingIcon />
          <Input language={language} freeInputField trailingIcon defaultValue={filledValue} />
        </div>
      </div>
    </div>
  );
}

function IconGroup({ language }: { language: IconLanguage }) {
  return (
    <div className="flex flex-wrap gap-12">
      <div className="flex flex-col gap-4">
        <h3 className="font-barlow text-sm uppercase tracking-wide text-[#878787]">Arrow</h3>
        <div className="flex items-center justify-center bg-[#1c1c1c] p-4 text-[#f7f4f0]">
          <IconArrow language={language} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-barlow text-sm uppercase tracking-wide text-[#878787]">New Window</h3>
        <div className="flex items-center justify-center bg-[#1c1c1c] p-4 text-[#f7f4f0]">
          <IconNewWindow language={language} />
        </div>
      </div>
    </div>
  );
}

const NAV_ITEMS: { number: string; navEnglish: string; navArabic: string; selected?: boolean }[] = [
  { number: "00", navEnglish: "Home", navArabic: "الرئيسية" },
  { number: "01", navEnglish: "About", navArabic: "معلومات" },
  { number: "02", navEnglish: "Work", navArabic: "أعمالنا", selected: true },
];

function PagesGroup({ language }: { language: PagesLanguage }) {
  return (
    <div className={`flex flex-col ${language === "arabic" ? "items-end" : "items-start"}`}>
      {NAV_ITEMS.map((item) => (
        <Pages
          key={item.number}
          href="#"
          language={language}
          number={item.number}
          nav={language === "arabic" ? item.navArabic : item.navEnglish}
          selected={item.selected}
        />
      ))}
    </div>
  );
}

function ToggleMenuGroup({ language }: { language: ToggleMenuLanguage }) {
  return (
    <div className={`flex ${language === "arabic" ? "justify-end" : "justify-start"}`}>
      <ToggleMenu language={language} />
    </div>
  );
}

const DEMO_PAGES = [
  { number: "00", nav: "HOME" },
  { number: "01", nav: "ABOUT" },
  { number: "02", nav: "CAREER", selected: true },
  { number: "03", nav: "EDUCATION" },
  { number: "04", nav: "RESOURCES" },
  { number: "05", nav: "CONTACT" },
];

function NavigationGroup({ language }: { language: NavigationLanguage }) {
  return (
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="font-barlow text-sm uppercase tracking-wide text-[#878787]">Desktop</h3>
        <div className="h-[640px] overflow-hidden">
          <Navigation language={language} version="desktop" pages={DEMO_PAGES} className="flex" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-barlow text-sm uppercase tracking-wide text-[#878787]">
          Responsive (click hamburger)
        </h3>
        <div className="w-[390px] max-w-full bg-[#0d0d0d]">
          <Navigation language={language} version="responsive" className="flex" />
        </div>
      </div>
    </div>
  );
}

function WorkCardGroup({ language }: { language: WorkCardLanguage }) {
  return (
    <div className="flex flex-wrap items-start gap-10 bg-[#f7f4f0] p-8">
      <div className="flex flex-col gap-4">
        <h3 className="font-barlow text-sm uppercase tracking-wide text-[#6f6f6f]">Desktop</h3>
        <WorkCard
          language={language}
          version="desktop"
          subText="Designed end-to-end product experiences across web and mobile."
        />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-barlow text-sm uppercase tracking-wide text-[#6f6f6f]">Responsive</h3>
        <div className="w-[287px]">
          <WorkCard
            language={language}
            version="responsive"
            subText="Designed end-to-end product experiences across web and mobile."
          />
        </div>
      </div>
    </div>
  );
}

function EducationCardGroup({ language }: { language: EducationCardLanguage }) {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="font-barlow text-sm uppercase tracking-wide text-[#878787]">Desktop</h3>
        <div className="flex flex-col">
          <EducationCard language={language} version="desktop" type="main" />
          <EducationCard language={language} version="desktop" type="sub" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-barlow text-sm uppercase tracking-wide text-[#878787]">Responsive</h3>
        <div className="flex w-[358px] flex-col">
          <EducationCard language={language} version="responsive" type="main" />
          <EducationCard language={language} version="responsive" type="sub" />
        </div>
      </div>
    </div>
  );
}

function ResourcesCardGroup({ language }: { language: ResourcesCardLanguage }) {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="font-barlow text-sm uppercase tracking-wide text-[#878787]">
          Desktop (default / hover / disabled)
        </h3>
        <div className="flex w-[560px] flex-col">
          <ResourcesCard language={language} version="desktop" />
          <ResourcesCard language={language} version="desktop" />
          <ResourcesCard language={language} version="desktop" disabled />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-barlow text-sm uppercase tracking-wide text-[#878787]">Responsive</h3>
        <div className="flex w-[358px] flex-col">
          <ResourcesCard language={language} version="responsive" />
          <ResourcesCard language={language} version="responsive" disabled />
        </div>
      </div>
    </div>
  );
}

function SkillToolCardGroup({ language }: { language: SkillToolCardLanguage }) {
  return (
    <div className={`flex ${language === "arabic" ? "justify-end" : "justify-start"} bg-[#1c1c1c] p-4`}>
      <SkillToolCard language={language} />
    </div>
  );
}

export default function ComponentGallery() {
  return (
    <div className="min-h-screen bg-[#141215] px-10 py-14">
      <h1 className="font-barlow text-3xl font-bold text-[#f7f4f0]">Button</h1>
      <p className="mt-1 text-sm text-[#878787]">
        Primary / Link / Link XL &mdash; Default / Hover / Disabled &mdash; English / Arabic
      </p>

      <section className="mt-10">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">English</h2>
        <div className="mt-4">
          <ButtonGroup language="english" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">Arabic</h2>
        <div className="mt-4">
          <ButtonGroup language="arabic" />
        </div>
      </section>

      <h1 className="mt-20 font-barlow text-3xl font-bold text-[#f7f4f0]">Input</h1>
      <p className="mt-1 text-sm text-[#878787]">
        Default / Focused / Filled &mdash; Single line / Free input field &mdash; English / Arabic
      </p>

      <section className="mt-10">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">English</h2>
        <div className="mt-4">
          <InputGroup language="english" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">Arabic</h2>
        <div className="mt-4">
          <InputGroup language="arabic" />
        </div>
      </section>

      <h1 className="mt-20 font-barlow text-3xl font-bold text-[#f7f4f0]">Icons</h1>
      <p className="mt-1 text-sm text-[#878787]">Arrow / New Window &mdash; English / Arabic</p>

      <section className="mt-10">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">English</h2>
        <div className="mt-4">
          <IconGroup language="english" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">Arabic</h2>
        <div className="mt-4">
          <IconGroup language="arabic" />
        </div>
      </section>

      <h1 className="mt-20 font-barlow text-3xl font-bold text-[#f7f4f0]">Pages</h1>
      <p className="mt-1 text-sm text-[#878787]">
        Default / Hover (real) / Selected &mdash; English / Arabic
      </p>

      <section className="mt-10">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">English</h2>
        <div className="mt-4">
          <PagesGroup language="english" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">Arabic</h2>
        <div className="mt-4">
          <PagesGroup language="arabic" />
        </div>
      </section>

      <h1 className="mt-20 font-barlow text-3xl font-bold text-[#f7f4f0]">Toggle Menu</h1>
      <p className="mt-1 text-sm text-[#878787]">Click to toggle &mdash; English / Arabic</p>

      <section className="mt-10">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">English</h2>
        <div className="mt-4">
          <ToggleMenuGroup language="english" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">Arabic</h2>
        <div className="mt-4">
          <ToggleMenuGroup language="arabic" />
        </div>
      </section>

      <h1 className="mt-20 font-barlow text-3xl font-bold text-[#f7f4f0]">Navigation</h1>
      <p className="mt-1 text-sm text-[#878787]">Desktop / Responsive &mdash; English / Arabic</p>

      <section className="mt-10">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">English</h2>
        <div className="mt-4">
          <NavigationGroup language="english" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">Arabic</h2>
        <div className="mt-4">
          <NavigationGroup language="arabic" />
        </div>
      </section>

      <h1 className="mt-20 font-barlow text-3xl font-bold text-[#f7f4f0]">Work Card</h1>
      <p className="mt-1 text-sm text-[#878787]">Desktop / Responsive &mdash; English / Arabic</p>

      <section className="mt-10">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">English</h2>
        <div className="mt-4">
          <WorkCardGroup language="english" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">Arabic</h2>
        <div className="mt-4">
          <WorkCardGroup language="arabic" />
        </div>
      </section>

      <h1 className="mt-20 font-barlow text-3xl font-bold text-[#f7f4f0]">Education Card</h1>
      <p className="mt-1 text-sm text-[#878787]">Main / Sub &mdash; Desktop / Responsive &mdash; English / Arabic</p>

      <section className="mt-10">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">English</h2>
        <div className="mt-4">
          <EducationCardGroup language="english" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">Arabic</h2>
        <div className="mt-4">
          <EducationCardGroup language="arabic" />
        </div>
      </section>

      <h1 className="mt-20 font-barlow text-3xl font-bold text-[#f7f4f0]">Resources Card</h1>
      <p className="mt-1 text-sm text-[#878787]">
        Default / Hover (real) / Disabled &mdash; Desktop / Responsive &mdash; English / Arabic
      </p>

      <section className="mt-10">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">English</h2>
        <div className="mt-4">
          <ResourcesCardGroup language="english" />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">Arabic</h2>
        <div className="mt-4">
          <ResourcesCardGroup language="arabic" />
        </div>
      </section>

      <h1 className="mt-20 font-barlow text-3xl font-bold text-[#f7f4f0]">Skill / Tool Card</h1>
      <p className="mt-1 text-sm text-[#878787]">English / Arabic</p>

      <section className="mt-10">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">English</h2>
        <div className="mt-4">
          <SkillToolCardGroup language="english" />
        </div>
      </section>

      <section className="mt-14 pb-14">
        <h2 className="font-barlow text-lg font-bold text-[#f7f4f0]">Arabic</h2>
        <div className="mt-4">
          <SkillToolCardGroup language="arabic" />
        </div>
      </section>
    </div>
  );
}
