# Collaborating with AI

> Practical methods of working with AI to get exacting results.

_Source: interfacecraft.dev/library — collection: collaborating-with-ai_

---

# /interface craft skills

_URL: https://www.interfacecraft.dev/library/interface-craft-skills_  
_(Contains 1 embedded video demonstration)_

[IMAGE]

When you work with Claude Code or other coding agents, you can give them reusable expertise through skills. Think of these like specialized knowledge packs that help them do specific kinds of work better. They're reference guides for your agent to consult.

Interface Craft includes three skills for now: Storyboard Animation for writing readable, sequenced animations; DialKit for tuning values with live controls; and Design Critique for systematic UI review. Install them once and they activate automatically as you work.

### What are skills?

Skills are markdown files that get loaded into your coding agent's context—like Claude Code, Cursor, or Windsurf—when triggered by relevant keywords in your prompt. When you ask Claude to "give me a panel to dial this in" a skill can provide it with specific guidance on how to create that and what options to provide.

You don't need to explicitly invoke them. Just describe what you want naturally, and if a relevant skill exists, your agent will automatically consult it. That said, I do find it useful to sometimes be clear and just use the specific skill I want.

### Available skills

Here's what's included and when each skill is most useful.

#### Storyboard Animation

A pattern for writing animations you can read like a script. Every timing value, scale, position, and spring config gets extracted to named constants at the top of the file. Best for multi-step, coordinated animations. Activates when you mention animation, transitions, storyboard, or entrance.

#### Design Critique

A systematic framework for reviewing UI quality based on a structured methodology: visual design, interface design, interaction consistency, and user context. Works with screenshots, component files, or live URLs. Activates when you mention critique, review, feedback, audit, or polish.

### How to use them

Skills activate automatically based on keywords in your prompt. You don't need to remember command names or special syntax. Just describe what you need and the right skill should load in the background.

For example, if you ask Claude to "animate this list entrance with staggered springs," the Storyboard Animation skill activates automatically. If you say "critique this settings page," Design Critique kicks in.

You can also invoke skills directly with /interface-craft followed by a sub-skill name—like /interface-craft storyboard, /interface-craft dialkit, or /interface-craft critique. But in most cases, the automatic triggering is all you need.

A typical workflow might look like:

- Ask Claude to build an animated component (Storyboard Animation structures the code automatically)
- Add DialKit controls to tune timing and spring values in real time
- Ask for a design critique to catch anything you missed
- Refine based on the feedback, with skills guiding each iteration

### Install

Run this in your terminal to install the Interface Craft skills:

[IMAGE]

That's it. The installer writes a single canonical copy to ~/.agents/skills/ then symlinks from each detected agent—Claude Code, Cursor, Amp Code, Codex, OpenCode, Windsurf, or Gemini CLI. One source of truth, shared across all your tools. Run it again anytime to update.

### Try it out

Here are a few prompts to try that engage different skills together.

Build and tune a component:

[IMAGE]

Get a design critique:

[IMAGE]

Choreograph a complex animation:

[IMAGE]

---

# Using the Storyboard Animation Skill

_URL: https://www.interfacecraft.dev/library/using-storyboard-animation_  
_(Contains 1 embedded video demonstration)_

The Storyboard Animation skill turns multi-step animations into something you can read like a script. This is a pattern I've been using for years now whenever I need to create a multi-step staged animation. Every timing value, scale, position, and spring config gets extracted to named constants at the top of the file. A single stage integer drives the whole sequence so you don't have scattered timeouts or property values all over the place.

This video shows the kind of thing I like to use this for: a real estate search animation where a search pill fades in at the center of the screen, scales up, slides to the top, and then price markers pop in across a map.

[IMAGE]

```
/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 * Read top-to-bottom. Each `at` is ms after scroll-trigger.
 *
 *     0ms    waiting for element to scroll into view
 *   300ms    search pill fades in at center, scale 0.8 → 1.5
 *  1300ms    search pill moves to top, scale 1.5 → 1.0
 *  2000ms    price markers pop in (staggered 150ms apart)
 * ──────────────────────────────────────────────── */

const TIMING = {
  searchAppear:   300,    // pill fades in centered, springs to 1.5×
  searchToTop:    1300,   // pill shrinks to 1× and slides to top
  markersAppear:  1400,   // price tags start popping in
};

const SEARCH = {
  initialScale:    1.5,
  centeredScale:   2,
  finalScale:      1.3,
  centerTop:       "45%",
  finalTop:        "24px",
  spring: { type: "spring" as const, stiffness: 250, damping: 25 },
};

const MARKERS = {
  stagger: 0.05,
  spring:  { type: "spring" as const, stiffness: 500, damping: 25 },
  items: [
    { label: "$1.3M", className: "left-1/2 -translate-x-1/2 top-[78%]" },
    { label: "$1.2M", className: "right-[8%] top-[18%]" },
    { label: "$985K", className: "left-[8%] top-[85%]" },
    { label: "$1.1M", className: "left-[5%] top-[25%]" },
    { label: "$1.4M", className: "right-[5%] top-[70%]" },
  ],
};

{/* Search pill */}
<motion.div
  animate={{
    opacity: stage >= 1 ? 1 : 0,
    scale:   stage >= 2 ? SEARCH.finalScale : SEARCH.centeredScale,
    top:     stage >= 2 ? SEARCH.finalTop : SEARCH.centerTop,
  }}
  transition={SEARCH.spring}
/>

{/* Price markers */}
{MARKERS.items.map((marker, i) => (
  <motion.div
    key={marker.label}
    className={marker.className}
    animate={{
      opacity: stage >= 3 ? 1 : 0,
      scale:   stage >= 3 ? 1 : 0,
    }}
    transition={{ ...MARKERS.spring, delay: i * MARKERS.stagger }}
  />
))}
```

### The storyboard

Every animated component starts with an ASCII storyboard. It's a simple block comment that reads like a shot list. You can scan it top-to-bottom and understand the entire sequence without reading any code. Here's the storyboard for the above animation:

```
/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 * Read top-to-bottom. Each `at` is ms after scroll-trigger.
 *
 *     0ms    waiting for element to scroll into view
 *   300ms    search pill fades in at center, scale 0.8 → 1.5
 *  1300ms    search pill moves to top, scale 1.5 → 1.0
 *  2000ms    price markers pop in (staggered 150ms apart)
 * ──────────────────────────────────────────────── */
```

This is the overall animation. Anyone on the team can read it and know exactly what happens and when. When you need to adjust timing, start here.

### Timing

Below the storyboard, a single TIMING object holds every delay. This is the only place timing values live so you have one place to change.

```
const TIMING = {
  searchAppear:   300,    // pill fades in centered, springs to 1.5×
  searchToTop:    1300,   // pill shrinks to 1× and slides to top
  markersAppear:  1400,   // price tags start popping in
};
```

Notice the comments mirror the storyboard. The search pill appears at 300ms, holds for a beat while the spring settles, then slides to the top at 1300ms. Price markers follow almost immediately at 1400ms, overlapping with the pill's move ever so slightly, which makes the sequence feel fluid rather than step-by-step.

### Element configs

Each animated element gets its own config object for scales, positions, and spring physics all grouped together instead of scattered across your file. The search pill has three distinct scale states and two positions it moves between:

```
/* Search pill scales & positions */
const SEARCH = {
  initialScale:    1.5,    // scale on first frame (invisible)
  centeredScale:   2,      // scale while centered — "zoomed in" feel
  finalScale:      1.3,    // scale after moving to top
  centerTop:       "45%",  // vertical center position
  finalTop:        "24px", // resting position at top of figure
  spring: { type: "spring" as const, stiffness: 250, damping: 25 },
};
```

The price markers are a staggered group: five labels that pop in rapidly, each with its own position on the map. The stagger is tight at 50ms, and the spring is stiffer for a snappy pop-in feel:

```
/* Price markers */
const MARKERS = {
  stagger: 0.05,   // seconds between each marker pop-in
  spring:  { type: "spring" as const, stiffness: 500, damping: 25 },
  items: [
    { label: "$1.3M", className: "left-1/2 -translate-x-1/2 top-[78%]" },
    { label: "$1.2M", className: "right-[8%] top-[18%]" },
    { label: "$985K", className: "left-[8%] top-[85%]" },
    { label: "$1.1M", className: "left-[5%] top-[25%]" },
    { label: "$1.4M", className: "right-[5%] top-[70%]" },
  ],
};
```

All the data that defines what the animation looks like lives right here. Want to change the stagger? One number. Want to reposition a marker? One className string. Want a bouncier entrance? Adjust the spring's stiffness and damping.

### The stage pattern

The component itself uses a single stage integer that advances through the sequence. This means you don't need boolean flags or nested conditionals, just stage >= N checks in the animate props. The search pill reads from SEARCH for its scales and positions, and the markers map over their items array:

```
{/* Search pill */}
<motion.div
  animate={{
    opacity: stage >= 1 ? 1 : 0,
    scale:   stage >= 2 ? SEARCH.finalScale : SEARCH.centeredScale,
    top:     stage >= 2 ? SEARCH.finalTop : SEARCH.centerTop,
  }}
  transition={SEARCH.spring}
/>

{/* Price markers */}
{MARKERS.items.map((marker, i) => (
  <motion.div
    key={marker.label}
    className={marker.className}
    animate={{
      opacity: stage >= 3 ? 1 : 0,
      scale:   stage >= 3 ? 1 : 0,
    }}
    transition={{ ...MARKERS.spring, delay: i * MARKERS.stagger }}
  />
))}
```

- Stage 1: the pill fades in at center
- Stage 2: it shrinks and slides to the top
- Stage 3: price markers pop in with a tight stagger

The timeouts that advance the stage integer live in a single useEffect, driven by the TIMING constants — so the storyboard, the timing object, and the rendering code all tell the same story.

### Try it out

Describe an animation in plain English and Claude writes it in this pattern. Try combining it with DialKit for live tuning:

[IMAGE]

---

# Using the DialKit Skill

_URL: https://www.interfacecraft.dev/library/using-dial-kit_  
_(Contains 1 embedded video demonstration)_

Using the DialKit skill, we refine Interface Craft's card navigation by live-tuning spring physics, timing, and layout values until everything feels right.

To try it yourself, install the  and start tuning.

---

# Using the Design Critique Skill

_URL: https://www.interfacecraft.dev/library/using-design-critique_  
_(Contains 1 embedded video demonstration)_

The Design Critique skill gives Claude a structured methodology for reviewing interfaces. Instead of vague feedback, you get specific, tangible observations organized into separate areas of concern: visual design, interface design, interaction consistency, and user context.

It works with screenshots (best), component files, or live URLs. Try it with a prompt like:

[IMAGE]

The critique follows a consistent structure: context, first impressions, then each lens in sequence. Issues are framed with a specific observation, its impact, and what it could be instead:

```
## Visual Design

**Muddy shadows** — The card shadows use a large blur
radius with low opacity, creating a hazy look rather
than crisp depth. Tighter, more directional shadows
would give the layout a cleaner sense of elevation.

## Interface Design

**No focusing mechanism** — All four content areas
compete equally for attention. A stronger size or
weight differential on the primary content area
would give the layout a clear narrative.

## Top Opportunities
1. Add a visual entry point to the dashboard
2. Tighten card shadows for crisper depth
3. Reduce the four background colors to two
```

You can paste a screenshot, point it at a file path, or give it a URL, the skill adapts its approach based on what it can see. Take it with a grain of salt, but it's a useful starting point to developing your own critique muscle.

---

# DialKit

_URL: https://www.interfacecraft.dev/library/dial-kit_

[IMAGE]

If you've read , you already know the core idea: expose the parameters of what you're building so you can adjust them in real time and feel the difference instantly. DialKit is a small React library that makes this dead simple.

[IMAGE]

### What is DialKit

DialKit gives you a floating control panel — sliders, toggles, spring configs, action buttons — wired directly to the values driving your UI. It's designed for motion and interface work: tuning animation springs, adjusting spacing, dialing in colors, or finding the right blur radius. Anywhere you'd normally hard-code a number, DialKit lets you turn it into a live control.

### Installation

Install DialKit and its animation dependency via npm:

```
npm install dialkit motion
```

Or just tell your agent to set it up:

[IMAGE]

If installing manually, add <DialRoot /> to your layout, and import the styles:

```
import { DialRoot } from "dialkit";
import "dialkit/styles.css";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <DialRoot />
    </>
  );
}
```

That's it. Now you can use the useDialKit hook in any component.

### How it works

The core of DialKit is the useDialKit hook. You give it a name and an object describing the parameters you want to control. It returns the current values, which update in real time as you adjust the panel.

```
const values = useDialKit("Card Animation", {
  // Sliders: [default, min, max]
  blur: [4, 0, 20],
  scale: [0.95, 0.5, 1.5],
  opacity: [0.8, 0, 1],

  // Toggles
  showShadow: true,

  // Spring configs (generates visualDuration + bounce sliders)
  spring: {
    type: "spring",
    visualDuration: 0.4,
    bounce: 0.2,
  },

  // Actions (trigger buttons)
  reset: () => handleReset(),
});
```

Sliders are defined with a tuple: [default, min, max]. This gives you a draggable slider that outputs a number. Use these for anything continuous—blur, opacity, spacing, font sizes.

Toggles are just booleans. Pass true or false as the default and you get a switch.

Spring configs are the most powerful feature. Pass an object with type: "spring", visualDuration, and bounce and DialKit auto-generates sliders for both properties. The returned value is a full spring transition object you can pass directly to Motion's transition prop.

Actions are functions. Pass a callback and DialKit renders a button that calls it when clicked. Great for triggering replays, resets, or other events while tuning.

You can also organize parameters into folders by nesting them inside an object—useful when you have many controls and want to keep the panel manageable.

```
const values = useDialKit("Modal", {
  // Top-level controls
  overlay: [0.5, 0, 1],
  spring: { type: "spring", visualDuration: 0.35, bounce: 0.15 },

  // Folder: groups related controls together
  content: {
    padding: [24, 8, 48],
    borderRadius: [16, 0, 32],
    maxWidth: [480, 200, 800],
  },
});
```

### Prompts to get started

The easiest way to start using DialKit is to describe what you want and let Claude wire it up. Here are a few prompts to try.

Add DialKit to an existing animation:

[IMAGE]

Build something new with DialKit from scratch:

[IMAGE]

Tune layout and spacing:

[IMAGE]

Explore visual variations:

[IMAGE]

Thank you to William Bout for the beautiful DialKit app iconography and demo example.

---

# Showing Things to Claude Code

_URL: https://www.interfacecraft.dev/library/showit_  
_(Contains 1 embedded video demonstration)_

In this session we refine a v0 gift card interaction by sharing screenshots back and forth with Claude Code — showing it what we're seeing, pointing out what's off, and iterating until the result feels right.

---

# Refining a Generative Graphic

_URL: https://www.interfacecraft.dev/library/refining-generative-graphic_  
_(Contains 1 embedded video demonstration)_

A working session to refine part of the generative card pattern used on the library cards in Interface Craft. Noticing details, working with an agent to refine, and dialing everything in.

---

# Refining DialKit’s Interface

_URL: https://www.interfacecraft.dev/library/refining-dial-kit_  
_(Contains 1 embedded video demonstration)_

In this session, we use Agentation to iteratively refine the DialKit control panel interface in realtime — adjusting layout, spacing, and visual hierarchy until the design feels right.

[VIDEO: embedded demonstration]

---

