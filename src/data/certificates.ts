import type { Certificate } from "../components/cards/CertificatesCards";

/**
 * ============================================================================
 *  CERTIFICATES — shown as cards under the degree in the Education section, in
 *  this exact order, four per page. Add, remove, or reorder freely: the pager
 *  under the cards gets a square for every page automatically.
 *
 *  Certificate names stay in English in both languages, as in the Figma design.
 * ============================================================================
 */
export const CERTIFICATES: Certificate[] = [
  { year: "2024", name: "Perception and Memory in HCI and UX", source: "IxDF" },
  { year: "2024", name: "Design for the 21st Century with Don Norman", source: "IxDF" },
  { year: "2024", name: "Design for Thought and Emotion", source: "IxDF" },
  { year: "2023", name: "Design Thinking: The Ultimate Guide", source: "IxDF" },
];
