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

export function sendContactEmail(params: ContactEmailParams) {
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
