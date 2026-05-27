import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config — used by Storybook (via @storybook/react-vite) and for any
// future direct app builds. The package itself is consumed as source, not bundled.
export default defineConfig({
  plugins: [react()],
});
