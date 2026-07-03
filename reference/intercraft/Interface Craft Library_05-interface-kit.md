# Interface Kit

> A visual design tool for making real-time edits to apps in the browser.

_Source: interfacecraft.dev/library — collection: interface-kit_

---

# Interface Kit Overview

_URL: https://www.interfacecraft.dev/library/interface-kit-overview_  
_(Contains 1 embedded video demonstration)_

Interface Kit is a visual design tool for making real-time updates to any element on the page. Click to select an element, tweak its design properties visually, and copy prompts to give to your coding agent.

Interface Kit gives you a floating editor overlay with three tabs for direct manipulation of any element on your page:

Style — background color, border, border radius, shadow, backdrop blur, and opacity.

Typography — font family, size, weight, line height, letter spacing, style, alignment, and color.

Layout — width, height, padding, margin, flex direction, alignment, and gap.

Editable text — double-click to edit any text on your page.

There's also a Tailwind mode toggle that snaps all values to Tailwind utility classes. When you're happy with your changes, hit Copy as prompt to export everything as a diff that an AI coding agent can apply directly.

Install Interface Kit via npm:

```
npm install interface-kit
```

Or just tell your agent to set it up:

If installing manually, add <InterfaceKit /> to your layout:

```
import { InterfaceKit } from "interface-kit/react";

export default function Layout({ children }) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === "development" && <InterfaceKit />}
    </>
  );
}
```

That's it. Interface Kit is development-only by default — it injects its own stylesheet at runtime, so no additional CSS setup is needed.

Send me your feedback and let me know what you'd like to see added.

---

# Interface Kit Critique

_URL: https://www.interfacecraft.dev/library/interface-kit-critique_  
_(Contains 1 embedded video demonstration)_

Walking through the current Interface Kit alpha and critiquing what needs to improve.

---

# Interface Kit Refinements

_URL: https://www.interfacecraft.dev/library/interface-kit-refinements_  
_(Contains 1 embedded video demonstration)_

Going back and refining the things I called out in the critique.

---

# Interface Kit Details

_URL: https://www.interfacecraft.dev/library/interface-kit-details_  
_(Contains 1 embedded video demonstration)_

Some of the details behind choices in Interface Kit, like making it work with both Tailwind and raw CSS, and a look at what's ahead.

---

