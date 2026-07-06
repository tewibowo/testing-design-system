import { createRoot } from "react-dom/client";
import { initAppHeight } from "@app/ui/appHeight.js";
// Self-hosted fonts, brand tokens, shared shell — same foundation as v1.
import "@app/styles/icons.css";
import "@fontsource/red-hat-mono/400.css";
import "@fontsource/red-hat-mono/500.css";
import "@fontsource/red-hat-mono/700.css";
import "@ds/styles/tokens.css";
import "@ds/styles/global.css";
import "@app/styles/app.css";
import "@app/v2/styles/v2-theme.css";
import V2App from "@app/v2/V2App.jsx";

initAppHeight();

createRoot(document.getElementById("root")).render(<V2App />);
