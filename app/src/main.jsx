import { createRoot } from "react-dom/client";
import "@ds/styles/tokens.css";
import "@ds/styles/global.css";
import "@app/styles/app.css";
import App from "@app/App.jsx";

createRoot(document.getElementById("root")).render(<App />);
