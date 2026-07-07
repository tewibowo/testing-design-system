import { createRoot } from "react-dom/client";
import { initViewportFix } from "@app/ui/viewportFix.js";
import { initDebugHud } from "@app/ui/debugHud.js";
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

initViewportFix();
initDebugHud();

createRoot(document.getElementById("root")).render(<V2App />);
