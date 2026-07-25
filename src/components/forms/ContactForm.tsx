import { useEffect, useState, type FormEvent } from "react";
import type { Language } from "../../types/language";
import { getTranslations } from "../../i18n/translations";
import { INQUIRY_OPTIONS } from "../../data/inquiryOptions";
import { sendContactEmail } from "../../lib/emailjs";
import Input from "../ui/Input";
import InquirySelect from "./InquirySelect";
import FieldError from "./FieldError";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactFormProps {
  language?: Language;
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

interface ContactFormValues {
  name: string;
  email: string;
  inquiry: string;
  message: string;
}

/** The "Send a message" form in the Contact section. Copy comes from src/i18n, options from src/data/inquiryOptions.ts. */
export default function ContactForm({ language = "english" }: ContactFormProps) {
  const copy = getTranslations(language).form;
  const inquiryOptions = INQUIRY_OPTIONS[language];
  const [values, setValues] = useState<ContactFormValues>({ name: "", email: "", inquiry: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // Re-validate against the current language's option list if the user switches
  // language mid-selection, so a stale value from the other language can't slip through.
  useEffect(() => {
    setValues((prev) => (INQUIRY_OPTIONS[language].includes(prev.inquiry) ? prev : { ...prev, inquiry: "" }));
  }, [language]);

  // Re-translate any already-shown field errors when the language changes,
  // instead of leaving stale English/Arabic messages until the next submit.
  useEffect(() => {
    setFieldErrors((prev) => (Object.keys(prev).length === 0 ? prev : validate()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const setField = <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): Partial<Record<keyof ContactFormValues, string>> => {
    const errors: Partial<Record<keyof ContactFormValues, string>> = {};
    if (values.name.trim().length < 2) errors.name = copy.errors.name;
    if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = copy.errors.email;
    if (!inquiryOptions.includes(values.inquiry)) errors.inquiry = copy.errors.inquiry;
    if (values.message.trim().length < 10) errors.message = copy.errors.message;
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Guards against duplicate submissions from double-clicks or repeated Enter presses.
    if (status === "sending") return;

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      await sendContactEmail(values);
      setStatus("success");
      setValues({ name: "", email: "", inquiry: "", message: "" });
      setFieldErrors({});
    } catch (err) {
      console.error("Failed to send contact email:", err);
      setStatus("error");
    }
  };

  const isSending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate dir={language === "arabic" ? "rtl" : "ltr"} className="flex w-full flex-col gap-[2px]">
      <div className="flex w-full flex-col gap-[2px] lg:flex-row">
        <div className="min-w-0 flex-1">
          <Input
            placeholder={copy.namePlaceholder}
            language={language}
            value={values.name}
            onChange={(value) => setField("name", value)}
          />
          {fieldErrors.name && <FieldError language={language}>{fieldErrors.name}</FieldError>}
        </div>
        <div className="min-w-0 flex-1">
          <Input
            placeholder={copy.emailPlaceholder}
            language={language}
            value={values.email}
            onChange={(value) => setField("email", value)}
          />
          {fieldErrors.email && <FieldError language={language}>{fieldErrors.email}</FieldError>}
        </div>
      </div>

      <InquirySelect
        value={values.inquiry}
        onChange={(value) => setField("inquiry", value)}
        options={inquiryOptions}
        language={language}
        placeholder={copy.inquiryPlaceholder}
        invalid={Boolean(fieldErrors.inquiry)}
      />
      {fieldErrors.inquiry && <FieldError language={language}>{fieldErrors.inquiry}</FieldError>}

      <Input
        placeholder={copy.messagePlaceholder}
        freeInputField
        language={language}
        value={values.message}
        onChange={(value) => setField("message", value)}
      />
      {fieldErrors.message && <FieldError language={language}>{fieldErrors.message}</FieldError>}

      <button
        type="submit"
        disabled={isSending}
        aria-busy={isSending}
        className="w-full bg-[#d42b2b] py-3 font-barlow text-[18px] text-[#f7f4f0] transition-colors duration-150 hover:bg-[#a22222] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#d42b2b]"
      >
        {isSending ? copy.sending : copy.send}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className={`pt-1 font-barlow text-[13px] text-[#f7f4f0] ${language === "arabic" ? "text-right" : "text-left"}`}>
            {copy.success}
          </p>
        )}
        {status === "error" && (
          <p className={`pt-1 font-barlow text-[13px] text-[#e53737] ${language === "arabic" ? "text-right" : "text-left"}`}>
            {copy.error}
          </p>
        )}
      </div>
    </form>
  );
}
