import type { Translations } from "./types";

/**
 * ============================================================================
 *  ENGLISH SITE TEXT — edit anything below to change what's shown on the
 *  English version of the site. Groups match the Figma content variables.
 *  Every key here has a matching key in ar.ts; if you add one, add it there
 *  too (TypeScript will warn you if you don't).
 * ============================================================================
 */
const en: Translations = {
  nav: {
    name: "Bana Saiaheen",
    position: "UX/UI DESIGNER",
    location: "Amman, Jordan",
    copyRight: "© 2026 — BANA SAIAHEEN · ALL RIGHTS RESERVED",
    switchTo: "العربية",
    email: "EMAIL",
    linkedin: "LINKEDIN",
    figma: "FIGMA",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    tabs: {
      home: "HOME",
      about: "ABOUT",
      experience: "EXPERIENCE",
      education: "EDUCATION",
      projects: "PROJECTS",
      contact: "CONTACT",
    },
  },
  home: {
    portfolio: "PORTFOLIO",
    year: "2026",
    subText: "Crafting digital experiences that bridge human intuition and purposeful design, one pixel at a time.",
    tagline: "Design with Purpose.",
    contactMe: "Contact Me",
  },
  about: {
    title: "ABOUT ME.",
    paragraphs: [
      "I'm a self-taught UX/UI designer with a background in 3D art and digital fashion design. My interest in UX began during a university course that challenged the way I approached learning. Instead of searching for the right answer, I learned to question, explore, and embrace different ways of solving problems. Today, I see design as more than aesthetics; it's about understanding people, simplifying complexity, and creating experiences that make a difference. I'm naturally curious, detail-oriented, and always eager to learn and put new knowledge into practice.",
      "Throughout my career, I've learned to value accountability, genuine teamwork, and mutual respect. I appreciate experiences that have challenged my expectations because they've helped me understand the kind of professional I want to be. I believe titles matter less than the ability to contribute, solve problems, and take responsibility. For me, good work means learning continuously, delivering on commitments, and working with people who respect one another. I want to grow in an environment where integrity matters and where success never comes at the expense of dignity or personal values.",
    ],
  },
  experience: {
    title: ["WORK", "EXPERIENCE."],
  },
  education: {
    title: "EDUCATION.",
    degree: {
      year: "2016 — 2022",
      degree: "BACHELOR'S IN COMPUTER GRAPHICS & ANIMATION",
      uni: "Princess Sumaya University for Technology",
    },
    certificatesLabel: "Certificates",
    pageLabel: "Page",
  },
  projects: {
    title: "PROJECTS.",
    subText: "A collection of projects that showcase how I think, solve problems, and grow through design.",
    badge: "Coming Soon!",
  },
  contact: {
    title: ["LET'S MAKE", "SOMETHING", "GREAT."],
    subText: "Have a project in mind? I'd love to hear about it. Drop me a message or reach out directly.",
    label: "DIRECT EMAIL",
    form: {
      title: "SEND A MESSAGE",
      subText: "I'll get back to you shortly",
      placeholders: {
        name: "Your name",
        email: "Your email",
        inquiry: "Type of inquiry...",
        message: "Tell me more about it...",
      },
      inquiryOptions: ["Job Opportunity", "Freelance Project", "Design System Project", "Other"],
      send: "SEND MESSAGE",
      sending: "SENDING...",
      required: "Required",
      invalidEmail: "Invalid email",
      sent: {
        title: "MESSAGE SENT.",
        text: "Thanks for reaching out. I’ll get back to you within a couple of days.",
        again: "SEND ANOTHER MESSAGE",
      },
      error: {
        title: "Message not sent",
        text: "Something went wrong sending your message. Please try again.",
      },
    },
  },
  notFound: {
    label: "ERROR",
    title: "PAGE NOT FOUND.",
    subText: "The page you're looking for doesn't exist or has moved. Let's get you back on track.",
    tagline: "Let's find our way back.",
    backHome: "BACK TO HOME",
  },
  childPage: {
    figmaLink: "FIGMA Link",
  },
};

export default en;
