import emailjs from "@emailjs/browser";

export interface ContactEmailParams {
  name: string;
  email: string;
  inquiry: string;
  message: string;
}

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * TEMPORARY, dev server only: open the site with `?mock-send` to fake a
 * successful send (or `?mock-send=error` for a failed one) without EmailJS, to
 * try the form's sending / sent / error states. Nothing is sent. It is compiled
 * out of production builds, and can be deleted once the real flow is tested.
 */
function getMockSendMode(): "success" | "error" | null {
  if (!import.meta.env.DEV) return null;
  const mode = new URLSearchParams(window.location.search).get("mock-send");
  if (mode === null) return null;
  return mode === "error" ? "error" : "success";
}

export function sendContactEmail(params: ContactEmailParams) {
  const mock = getMockSendMode();
  if (mock) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => (mock === "error" ? reject(new Error("Mock send failure")) : resolve()), 1200);
    });
  }

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return Promise.reject(
      new Error(
        "EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.",
      ),
    );
  }

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: params.name,
      from_email: params.email,
      inquiry_type: params.inquiry,
      message: params.message,
    },
    { publicKey: PUBLIC_KEY },
  );
}
