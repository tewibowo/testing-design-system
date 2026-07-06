import { createRoot } from "react-dom/client";
// Self-hosted fonts so the installed PWA needs no CDN (offline-first).
import "@app/styles/icons.css";
import "@fontsource/red-hat-mono/400.css";
import "@fontsource/red-hat-mono/500.css";
import "@fontsource/red-hat-mono/700.css";
import "@ds/styles/tokens.css";
import "@ds/styles/global.css";
import "@app/styles/app.css";
import App from "@app/App.jsx";

createRoot(document.getElementById("root")).render(<App />);
