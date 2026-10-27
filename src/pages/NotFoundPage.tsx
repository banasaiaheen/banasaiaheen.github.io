import PageLayout from "../components/navigation/PageLayout";
import NotFoundSection from "../components/sections/NotFoundSection";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

/** The 404 page, for every route that doesn't exist. */
export default function NotFoundPage() {
  useDocumentTitle("Page not found — Bana Saiaheen");
  return (
    <PageLayout>
      <NotFoundSection />
    </PageLayout>
  );
}
