import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import type { Language } from "./types/language";
import HomePage from "./HomePage";
import ResourceDetailPage from "./pages/ResourceDetailPage";

function App() {
  // Lives here (above the router) rather than inside HomePage so it survives
  // navigation to sub-pages instead of resetting to English every time.
  const [language, setLanguage] = useState<Language>("english");
  const isArabic = language === "arabic";

  // Keeps native browser behavior (spellcheck, form validation bubbles, default
  // fonts/quotes) correctly RTL-aware in addition to our own layout classes.
  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";
  }, [isArabic]);

  return (
    <Routes>
      <Route path="/" element={<HomePage language={language} onLanguageChange={setLanguage} />} />
      <Route
        path="/resources/:slug"
        element={<ResourceDetailPage language={language} onLanguageChange={setLanguage} />}
      />
    </Routes>
  );
}

export default App;
