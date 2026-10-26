import { Routes, Route, Navigate, useParams } from "react-router-dom";
import LanguageProvider from "./i18n/LanguageProvider";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import NotFoundPage from "./pages/NotFoundPage";

/** Old /resources/:slug links keep working: they land on the project page. */
function ResourceRedirect() {
  const { slug = "" } = useParams();
  return <Navigate to={`/projects/${slug}`} replace />;
}

/**
 * Routes: the one-page home, a page per project, and the 404 page. The
 * language provider sits above the router so the chosen language survives
 * navigation between pages.
 */
function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/resources/:slug" element={<ResourceRedirect />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
