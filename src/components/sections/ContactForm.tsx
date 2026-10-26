import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "../../i18n/useLanguage";
import { sendContactEmail } from "../../lib/emailjs";
import Button from "../button/Button";
import Message from "../cards/Message";
import DropdownMenu from "../input/DropdownMenu";
import Input from "../input/Input";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "email" | "inquiry" | "message";
type FieldError = "required" | "invalid";
type SubmitStatus = "idle" | "sending" | "sent" | "error";

interface ContactValues {
  name: string;
  email: string;
  /** Index into the translated inquiry options, so switching language keeps the choice. */
  inquiry: number | null;
  message: string;
}

const EMPTY_VALUES: ContactValues = { name: "", email: "", inquiry: null, message: "" };

/**
 * The "Send a message" form of the Contact section, following the Figma form
 * states: empty fields turn red with a "Required" label on submit, the inquiry
 * field opens a dropdown, and a sent message is replaced by a confirmation with
 * a "Send another message" link. A failed send shows the `message` notice.
 * Sending goes through src/lib/emailjs.ts; copy comes from src/i18n
 * (contact.form.*).
 */
export default function ContactForm() {
  const { contact } = useTranslations();
  const copy = contact.form;
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<Field, FieldError>>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const inquiryRef = useRef<HTMLDivElement>(null);

  // Close the inquiry dropdown on an outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!inquiryRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const setField = <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Editing a field clears its own error.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const validate = (): Partial<Record<Field, FieldError>> => {
    const found: Partial<Record<Field, FieldError>> = {};
    if (!values.name.trim()) found.name = "required";
    if (!values.email.trim()) found.email = "required";
    else if (!EMAIL_PATTERN.test(values.email.trim())) found.email = "invalid";
    if (values.inquiry === null) found.inquiry = "required";
    if (!values.message.trim()) found.message = "required";
    return found;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Guards against duplicate submissions from double-clicks or repeated Enter presses.
    if (status === "sending") return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      await sendContactEmail({
        name: values.name,
        email: values.email,
        inquiry: copy.inquiryOptions[values.inquiry ?? 0],
        message: values.message,
      });
      setStatus("sent");
    } catch (err) {
      console.error("Failed to send contact email:", err);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setValues(EMPTY_VALUES);
    setErrors({});
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div role="status" aria-live="polite" className="flex w-full flex-col items-start gap-4 text-start">
        <h4 className="text-black-32 text-brand-cream">{copy.sent.title}</h4>
        <p className="text-regular-16 text-neutral-48">{copy.sent.text}</p>
        <Button type="link" cta={copy.sent.again} onClick={resetForm} />
      </div>
    );
  }

  const fieldError = (field: Field) => (errors[field] ? "error" : undefined);
  const errorLabel = (field: Field) => (errors[field] === "invalid" ? copy.invalidEmail : copy.required);
  const isSending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-[2px]">
      <div className="flex w-full flex-col gap-[2px] lg:flex-row">
        <Input
          name="name"
          placeholder={copy.placeholders.name}
          value={values.name}
          state={fieldError("name")}
          errorLabel={errorLabel("name")}
          onChange={(value) => setField("name", value)}
          className="lg:flex-1"
        />
        <Input
          name="email"
          type="email"
          placeholder={copy.placeholders.email}
          value={values.email}
          state={fieldError("email")}
          errorLabel={errorLabel("email")}
          onChange={(value) => setField("email", value)}
          className="lg:flex-1"
        />
      </div>

      <div ref={inquiryRef}>
        <Input
          showDropDownIcon
          placeholder={copy.placeholders.inquiry}
          value={values.inquiry === null ? "" : copy.inquiryOptions[values.inquiry]}
          state={menuOpen ? "open" : fieldError("inquiry")}
          errorLabel={errorLabel("inquiry")}
          onClick={() => setMenuOpen((open) => !open)}
          menu={
            <DropdownMenu
              options={copy.inquiryOptions}
              value={values.inquiry === null ? undefined : copy.inquiryOptions[values.inquiry]}
              onSelect={(option) => {
                setField("inquiry", copy.inquiryOptions.indexOf(option));
                setMenuOpen(false);
              }}
            />
          }
        />
      </div>

      <Input
        textarea
        name="message"
        placeholder={copy.placeholders.message}
        value={values.message}
        state={fieldError("message")}
        errorLabel={errorLabel("message")}
        onChange={(value) => setField("message", value)}
      />

      <Button
        type="primary"
        buttonType="submit"
        cta={isSending ? copy.sending : copy.send}
        disabled={isSending}
        className="w-full"
      />

      {status === "error" && <Message title={copy.error.title} message={copy.error.text} className="mt-2" />}
    </form>
  );
}
