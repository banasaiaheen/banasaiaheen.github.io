import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const app = (
  <StrictMode>
    {/* BASE_URL is "/" locally and "/<repository>/" on GitHub Pages (see vite.config.ts). */}
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

const root = document.getElementById('root')!

// The built pages already contain their content (scripts/prerender.mjs), so the browser attaches to
// that markup. The dev server and the 404 page start empty and render from scratch.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
