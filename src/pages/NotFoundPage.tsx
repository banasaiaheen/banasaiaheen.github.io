import PageLayout from "../components/navigation/PageLayout";
import NotFoundSection from "../components/sections/NotFoundSection";

/** The 404 page, for every route that doesn't exist. */
export default function NotFoundPage() {
  return (
    <PageLayout>
      <NotFoundSection />
    </PageLayout>
  );
}
