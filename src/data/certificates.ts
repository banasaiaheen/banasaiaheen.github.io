import type { Certificate } from "../components/cards/CertificatesCards";

/**
 * ============================================================================
 *  CERTIFICATES — shown as cards under the degree in the Education section, in
 *  this exact order (newest first), four per page. Add, remove, or reorder
 *  freely: the pager under the cards gets a square for every page
 *  automatically.
 *
 *  Certificate names stay in English in both languages, as in the Figma design.
 * ============================================================================
 */
export const CERTIFICATES: Certificate[] = [
  { year: "2026", name: "AI for Designers", source: "IxDF" },
  { year: "2026", name: "Design Systems 101", source: "Design System University" },
  { year: "2025", name: "UI Design Patterns for Successful Software", source: "IxDF" },
  { year: "2024", name: "How to Use a Design System in Figma", source: "Design System University" },
  { year: "2024", name: "Make Design Systems People Want to Use", source: "Design System University" },
  { year: "2024", name: "Journey Mapping", source: "IxDF" },
  { year: "2024", name: "Perception and Memory in HCI and UX", source: "IxDF" },
  { year: "2024", name: "Design for the 21st Century with Don Norman", source: "IxDF" },
  { year: "2024", name: "UX Design for Virtual Reality", source: "IxDF" },
  { year: "2024", name: "Design for Thought and Emotion", source: "IxDF" },
  { year: "2023", name: "Design Thinking: The Ultimate Guide", source: "IxDF" },
  { year: "2023", name: "User Experience: The Beginner’s Guide", source: "IxDF" },
  { year: "2022", name: "Foundations of User Experience (UX) Design", source: "Google" },
];
