# Motion & Craft Brief — StraitsX Mobile PWA Prototype

Distilled from the Interface Craft library export (`reference/intercraft/`, files `_00`–`_07`, exported 2026-07-02)
and reconciled with the StraitsX brand motion rules in `README.md` ("Motion" section).

**Provenance tags used throughout:**
- `[IC: <chapter>]` — stated in the Interface Craft library, quoted values are exact.
- `[Brand]` — from the StraitsX README ("Motion", "States", "Transparency & blur" sections).
- `[Derived]` — our translation of an IC principle into a concrete rule; not attributable to either source verbatim.

**The governing conflict, resolved up front.** The brand says: *"Subtle, never bouncy. Transitions are
120 ms (hover/press) or 200 ms (chips, tooltips); modals open at 320 ms with a `cubic-bezier(0.2, 0.7, 0.2, 1)`
ease. No spring physics, no bounces. Page transitions fade-only."* `[Brand]` Intercraft, by contrast, teaches
spring-heavy choreography (`stiffness: 250–500`, `bounce: 0.15–0.2`). We keep Intercraft's **choreography,
sequencing, interruptibility, and gesture physics lessons**, but render them with **tweens on the brand curve,
or springs configured to be visually non-bouncy (`bounce: 0`)** — springs are permitted *only* to settle
gesture-driven motion (sheet release, rubber-band return), where a tween cannot inherit velocity. `[Derived]`

---

## 1. Motion system

### 1.1 Duration & easing tokens

| Token | Value | Use | Source |
|---|---|---|---|
| `duration.press` | `120ms` | hover, press, tap feedback | `[Brand]` |
| `duration.small` | `200ms` | chips, tooltips, toggles, small element enter/exit | `[Brand]` |
| `duration.medium` | `240ms` | list rows, cards, toasts, tab-content crossfade | `[Derived]` (midpoint between brand's 200 and 320 tokens) |
| `duration.large` | `320ms` | modals, bottom sheets, page-level fades | `[Brand]` |
| `ease.brand` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | the only ease for enters/moves | `[Brand]` |
| `ease.exit` | `cubic-bezier(0.4, 0, 1, 1)` (ease-in) | exits, at ~2/3 the enter duration | `[Derived]` |
| `spring.settle` | `{ type: "spring", visualDuration: 0.35, bounce: 0 }` | gesture release only (sheet, drag return) | `[Derived]` — IC's modal example is `visualDuration: 0.35, bounce: 0.15` [IC: DialKit]; we zero the bounce per brand |

```ts
// motion/tokens.ts — single source of truth (see 1.2 Storyboard pattern)
export const EASE = [0.2, 0.7, 0.2, 1] as const;            // [Brand]
export const DUR = { press: 0.12, small: 0.2, medium: 0.24, large: 0.32 };
export const SETTLE = { type: "spring", visualDuration: 0.35, bounce: 0 } as const;
```

Intercraft's exact spring values, for reference (do **not** use as-is — too bouncy for this brand):
- Element move: `spring: { type: "spring" as const, stiffness: 250, damping: 25 }` [IC: Storyboard Animation]
- Snappy pop-in: `spring: { type: "spring" as const, stiffness: 500, damping: 25 }` [IC: Storyboard Animation]
- DialKit card example: `{ type: "spring", visualDuration: 0.4, bounce: 0.2 }`; modal example `visualDuration: 0.35, bounce: 0.15` [IC: DialKit]

### 1.2 The Storyboard pattern (mandatory code structure)

Every multi-step animation follows IC's Storyboard Animation skill exactly [IC: Storyboard Animation, quoted]:

1. **ASCII storyboard block comment** at the top of the file — "a shot list" readable top-to-bottom:
   ```
   /* ────────────────────────────────────────────────
    * ANIMATION STORYBOARD
    *     0ms    waiting for element to scroll into view
    *   300ms    search pill fades in at center, scale 0.8 → 1.5
    *  1300ms    search pill moves to top, scale 1.5 → 1.0
    *  2000ms    price markers pop in (staggered 150ms apart)
    * ──────────────────────────────────────────────── */
   ```
2. **A single `TIMING` object** holding every delay — "the only place timing values live."
3. **One config object per animated element** (scales, positions, transition grouped together).
4. **A single `stage` integer** drives the sequence via `stage >= N` checks in `animate` props —
   "you don't need boolean flags or nested conditionals." Timeouts advancing `stage` live in a single
   `useEffect`, driven by the `TIMING` constants.

### 1.3 Choreography & stagger

- **Chain, don't group.** "When you're animating multiple versions of the same element… chain them together
  with a slight offset or stagger. This ends up feeling more natural and resolved rather than animating
  everything together as one group." [IC: Animations] → framer-motion: `transition={{ delay: i * STAGGER }}`
  or a parent variant with `staggerChildren`.
- **Stagger value:** IC's worked example uses `stagger: 0.05` (50 ms) in code for a "snappy pop-in" group
  (the storyboard comment says "staggered 150ms apart" — the code value 0.05 is canonical). [IC: Storyboard Animation]
  → Use **40–60 ms** stagger for list rows; cap the total (e.g. stagger only the first 8 rows). `[Derived]`
- **Overlap steps.** In IC's timing, markers start at 1400 ms while the pill's move starts at 1300 ms —
  "overlapping with the pill's move ever so slightly, which makes the sequence feel fluid rather than
  step-by-step." [IC: Storyboard Animation] → Never wait for one element to finish before the next begins;
  start the follower at ~60–80% of the leader's duration. `[Derived]`
- **Wave-driven loops.** "Whenever motion is looping, I prefer to use a wave function rather than keyframes…
  at the turnaround point, keyframes often have visible peaks or seams. A wave function by comparison is smooth
  at every point." Stagger multiple elements with a **phase offset** rather than a time delay — "results in a
  more natural, organic feeling, similar to breathing." [IC: Wave Functions] → Use for the skeleton shimmer and
  any pulsing/breathing loop (drive with `useTime` + `sin`); never `keyframes: [0, 1, 0]`.

### 1.4 Enter / exit & element replacement

- **Fast replacement.** "When you're replacing an element with another, make sure the transition is fast.
  You generally want to animate them at the same time, rather than waiting for one to finish." Use
  `AnimatePresence` with **`mode="popLayout"`** — it "immediately pops the existing element out of the page
  layout so the reflow is immediate," vs the default `sync` where you see both. [IC: Animations]
- **Exit faster than enter.** Exits at ~2/3 of enter duration, ease-in, fade + small translate only. `[Derived]`
- **Group before fading.** "Whenever you have multiple elements that you want to fade out, you almost always
  want to group them together… If you just fade out siblings on their own, you can see through them where
  they overlap." [IC: Compositing] → Fade one wrapper, never N siblings.
- **Cross-fades:** two images at 50% opacity sum to 75%, so the background bleeds through mid-transition.
  Fix: wrap both layers and `mix-blend-mode: plus-lighter` so the pair always reads at 100%. [IC: Compositing]
- **Shape reveals:** prefer `clip-path` wipes/iris or gradient `mask-image` over plain fades when revealing
  content inside a fixed container (e.g. balance reveal after auth). [IC: Masks] Keep it subtle per brand.

### 1.5 Shared-element / container transform

IC demonstrates the pattern (not the API): in the divorce-app redesign, entering a phase makes "the card
widen, the phase badge and title grow larger and reposition" — one container morphing into its expanded
state rather than a screen swap [IC: Redesigning a Mobile Web App, Part 2]. Completed phases "collapse out
of view while hinting at their presence with a subtle card stack effect." → Implement with framer-motion
`layout` / `layoutId` on the card, title, and badge; transition `{ duration: DUR.large, ease: EASE }`.
`[Derived]` implementation, `[IC]` pattern. Use for: transaction row → transaction detail header, and the
asset card → asset detail screen.

### 1.6 List item transitions

- Rows enter with fade + 8–12 px upward translate, `duration.medium`, 40–60 ms stagger. `[Derived]` from
  IC chain-animation + stagger rules.
- Auto-focus the interface on the user's position: "automatically expand and scroll to the user's current
  phase based on their progress, and minimize the ones they have complete." [IC: Redesign Part 2] → After a
  completed action, scroll/expand to the next actionable item rather than resetting to top.
- Removal: `AnimatePresence mode="popLayout"` so remaining rows reflow immediately. [IC: Animations]

### 1.7 Sheet / modal physics

- Sheets keep the user "anchored in their phase context"; on completing the action inside, "the sheet
  dismisses and they immediately see the result for a tighter feedback loop." [IC: Redesign Parts 2–3]
- **Rubber banding on drag** (IC gives the full recipe): "creating an asymptote as the value you pass into a
  mapped range. The value here is arbitrary, but the bigger it is, the stiffer it'll feel. We then map that
  into a simple 0 to 1 value, and pass that into map range. With the max offset at 64, no matter how much or
  little we drag the sheet, it will never touch or go beyond that range." [IC: Interpolation & Map Range]
  → sheet over-drag upward resists with a 64 px max offset; release settles with `SETTLE` spring.
- **Dead zone before rubber banding** engages, so ordinary obtuse drags to the extremes don't trigger the
  stretch. [IC: Creating a Slider Component]
- Scrim: fade `rgba(0, 43, 42, 0.4)` in over `duration.large`; dialog fully opaque, no backdrop blur. `[Brand]`

### 1.8 Gesture-driven motion

- **Everything interruptible.** "A user should be able to cancel or 'interrupt' a transition or their gesture,
  and have the interface immediately respond… the best implementation is one where a user can immediately tap
  it again to close, even if the options haven't fully opened." [IC: Animations] → Drive state through
  `animate` props (motion retargets mid-flight with velocity); never gate input on `onAnimationComplete`,
  never `await` an animation before accepting the next tap.
- **Map range is the engine** for all scroll/drag-linked motion [IC: Interpolation & Map Range, exact code]:
  ```ts
  const mapRange = (value, fromLow, fromHigh, toLow, toHigh) =>
    toLow + ((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow);
  ```
  Clamp outputs by default; ease the *input* before mapping when linear feels mechanical.
- **Dynamic headers:** "By mapping the size of a header to the scroll position, you can present it larger by
  default, and then gracefully transition to a smaller state when the user scrolls. This is just a simple
  linear interpolation that maps scrollY to fontSize." [IC: Interpolation & Map Range] → Use
  `useScroll` + `useTransform` for the iOS-style large-title header on Home/Wallet.
- **Multi-stop mapping** for value→color status (e.g. utilization green→amber→red: "From 0 to 50%, go from
  green to amber. And then from above 50%, go from amber to red."). [IC: Interpolation & Map Range]
- **Arc paths** for any element that travels between two points: "when most objects travel they do so in an
  arc, rather than a straight line"; optionally scale up at the peak with a growing shadow. Motion ships an
  `arc()` helper. [IC: Animations] Use sparingly here (e.g. a coin/avatar moving into a payment summary);
  keep the arc shallow per brand restraint. `[Derived]`
- **Pointer/tilt reactivity** exists in IC (map cursor x/y to rotation, midpoint 0) [IC: Interpolation] —
  skip for this brand except perhaps a ≤2° tilt on the virtual card. `[Derived]`

### 1.9 Semantic motion & numbers

- "As much as possible, use real world metaphors and intentional motion to convey meaning. Try to avoid
  animation for its own sake." Example given: "ticking the numbers up as they move… referencing an odometer.
  This both feels a bit more refined, but also conveys meaning." [IC: Animations]
  → Balance changes animate with a count-up/odometer tick (`animate(motionValue, target)` + tabular figures),
  duration ≤ `duration.large`.
- Numbers that change must never cause layout shift: "whenever that number might change or animate, you want
  to use tabular figures." [IC: Typography Details] Brand: numerals in Red Hat Mono. `[Brand]`

### 1.10 Reduced motion

The Intercraft export contains **no reduced-motion guidance** — the following is a project rule. `[Derived]`
- Use `useReducedMotion()` from `motion`. When true: replace all translate/scale/layout animations with
  opacity-only fades at `duration.press` (120 ms); disable staggers, count-ups (set final value instantly),
  shimmer loops, and rubber-band stretch; sheets/modals fade in place.
- Gate at the token layer (one `motionSafe(transition)` helper), not per-component.

---

## 2. Screen transition patterns for a mobile app

What IC teaches about screens: **start from platform defaults, then improve** ("start with how iOS would
design it. And then improve") [IC: Industry Standards]; **preserve spatial context** — prefer sheets and
in-place container expansion over full pushes so "the interface feel[s] more anchored and fluid"
[IC: Redesign Part 2]; **hierarchy of movement** — one element leads, followers overlap slightly, peers don't
travel [IC: Storyboard Animation, Animations]. Brand constraint: page transitions are **fade-only**. `[Brand]`

| Transition | Recommendation | Duration / ease | Notes & source |
|---|---|---|---|
| **Stack push** | Incoming screen fades in with 12–16 px upward/rightward drift; outgoing fades to ~0.9 opacity, no travel. No parallax slide (brand: fade-only). | 320 ms, `ease.brand`; exit 200 ms ease-in | `[Brand]` fade-only + `[IC]` "one element leads" `[Derived]` values |
| **Stack pop** | Reverse: outgoing fades + drifts down/right 12 px; restore scroll position instantly (optimistic reads — show cached state, no refetch flash). | 240 ms | [IC: Perceived Performance] |
| **Detail via container transform** | Where the detail is "about" a visible card/row, prefer `layoutId` morph over a push (transaction row → detail, asset card → asset screen). | 320 ms, `ease.brand` | [IC: Redesign Part 2] pattern, `[Derived]` API |
| **Tab switch** | Peers, no spatial travel: instant swap or ≤150 ms crossfade with `AnimatePresence mode="popLayout"`. Never slide horizontally. Active tab icon/label color change at 120 ms. | 0–150 ms | [IC: Animations] "faster transitions"; `[Derived]` |
| **Bottom sheet open** | Slide up from bottom edge + scrim fade to `rgba(0,43,42,.4)`. Content inside does not stagger (sheet is one unit). Drag-to-dismiss with rubber band (64 px max over-drag, dead zone first); release settles with `SETTLE`. | 320 ms, `ease.brand` | `[Brand]` 320 ms; [IC: Interpolation, Slider] physics |
| **Bottom sheet close** | Faster than open; on action-completion, dismiss immediately so the user "immediately see[s] the result for a tighter feedback loop" — animate the result (row check, balance tick) as the sheet leaves. | ~240 ms ease-in | [IC: Redesign Part 3] |
| **Modal / dialog** | Fade + scale 0.97→1 (no bounce), scrim as above. Center dialogs only for confirmations; prefer sheets on mobile. | 320 ms open / 200 ms close, `ease.brand` | `[Brand]`; [IC: Redesign Part 2] sheet preference |
| **Toast** | Enter: fade + 8 px rise from bottom (above tab bar), 200 ms. Auto-dismiss 4 s; exit 150 ms fade. Used for background failure of optimistic writes ("gracefully handle any failures… by just reverting state, or showing a toast" — with retry, "without losing their new place in the flow"). | 200 ms / 150 ms | [IC: Perceived Performance]; `[Derived]` values |
| **Success state** | No confetti, no bounce. Sequence (storyboard pattern): ① icon/check draws or fades in (200 ms) → ② amount ticks to final value (odometer, ≤320 ms, overlapping) → ③ supporting rows stagger in at 50 ms. Single primary action button. | total ≤ 700 ms | [IC: Animations] semantic motion; [IC: Storyboard] overlap; [IC: Redesign Part 3] single action |
| **Skeleton → content** | First choice: don't show it — cache last state ("display what a user saw the last time they were on a page… avoids jittery state changes") and write optimistically. When unavoidable: skeleton with wave-phase shimmer, then one grouped crossfade (`popLayout`, 240 ms) — never row-by-row popcorn, never a spinner for <1 s waits. | 240 ms swap | [IC: Perceived Performance]; [IC: Wave Functions]; [IC: Compositing] group fades |

**Hierarchy of movement rule:** per screen transition, exactly **one** hero element moves meaningfully
(sheet, morphing card, header); everything else fades or holds. If two things travel, demote one. `[Derived]`
from IC's lead/follow choreography.

---

## 3. Interface craft principles

The ten Working Knowledge chapters (Noticing, Conceptual Range, Conceptual Depth, Live Tuning, Uncommon Care,
Separation of Concerns, Facets of Quality, Less but Better, Recreate Everything, Industry Standards), plus the
Means & Methods craft chapters, as build rules for fintech mobile UI:

**Working method**
- Notice specifics, not vibes: hesitation moments, expectation gaps, "does this look cheap, or crafted?" Write down *why*. [IC: Noticing]
- Explore structurally different options before refining one; don't polish the first idea. Best solution to a screen may be "no screen" (automate it). [IC: Conceptual Range]
- Most work ships at level 1–3 of 10. Pick the flagship flow (send/receive) and push it to 8+; zoom in on one element and ask "what if this was world class?" [IC: Conceptual Depth]
- Expose parameters and tune live; never guess-and-refresh spring/spacing/blur values. [IC: Live Tuning]
- Care shows in edge cases, error states, "the conditions only a few customers might ever see." [IC: Uncommon Care]
- Resolve one concern at a time at the right fidelity — "a breakable toy" to test a direction before detailing it. [IC: Separation of Concerns]
- Define facets of quality for the prototype (suggest: Trustworthy, Calm, Precise, Fluid) and score 1–5 each iteration; critique against facets, not taste. [IC: Facets of Quality]
- Cut scope, raise execution: "two typefaces, three sizes, two neutral colors, and one button" executed to an incredibly high bar beats more features. [IC: Less, but Better]
- The industry standard (iOS, Linear, Family) is the *floor* users judge against. "Start with how iOS would design it. And then improve." Family is "the platonic ideal of what a fintech app on iOS should be." [IC: Industry Standards]
- See something great, rebuild it immediately while curious. [IC: Recreate Everything]

**Hierarchy & density**
- Give every screen a focusing mechanism — "this is what you should do next"; never let all items demand equal attention. [IC: Redesign Part 1]
- Diminish completed/past items; emphasize current work. Progress "10/47 tasks" is demoralizing — chunk into phases. [IC: Redesign Part 1–2]
- Progressively disclose: summary views show key info only; details live one tap deeper. Don't stuff tables "with every data point under the sun." [IC: Refining Presscut]
- Every step exposes a single primary action; manual/escape actions are visually secondary. [IC: Redesign Part 3]

**Alignment**
- Minimize the number of invisible alignment rules per screen; prefer optical balance over mathematical consistency; minimize alignment methods per screen. [IC: Layout & Alignment]
- Lists: text on a left edge, icons on a vertical spine; row accessories (status, chevron) on the row's horizontal spine, not the label baseline. [IC: Layout & Alignment]
- Trim container top padding so titles sit optically balanced; optically center icons in buttons. [IC: Layout & Alignment]

**Color**
- Pick one neutral temperature and use it everywhere; mismatched warm/cool tones read "slightly off." Use the primary neutral at ~10% opacity instead of inventing new greys. [IC: Color Details]
- Normalize perceived brightness across accent colors with OKLCH; don't let one token accidentally shout. [IC: Color Details]
- Ease gradient stops (smoothstep `t * t * (3 - 2 * t)`) on dark overlays to kill the visible horizon line; interpolate `in oklch`. [IC: Color Details]

**Style consistency**
- Borders as transparent outlines/box-shadows so they stay crisp on any background; one hairline edge per cell (transparency doubles where borders overlap). [IC: Style Details, Compositing]
- One icon style: single stroke width, fill style, corner language — mixing "immediately jumps out… as careless." [IC: Style Details]
- One corner-radius language; dividers all-or-none within a list; shadows layered (tight contact + ambient falloff), never single muddy blurs. [IC: Style Details, Compositing]

**Typography**
- Measure 45–75 chars (`max-width: 66ch`); body line-height 1.4–1.6, headlines ≈1; ≤5 type sizes; 4/8 px vertical rhythm grid. [IC: Typography Details] (Brand grid is 4 px. `[Brand]`)
- Tabular figures for any mutable number; right-align number columns; `text-wrap: balance` on headlines; curly quotes, en/em dashes, real ellipsis. [IC: Typography Details]
- Slashed zero / disambiguation sets (`ss02` in Inter-alikes) wherever codes, IDs, or amounts appear. [IC: Typography Details]

**Feedback & states**
- Map the full state machine per component: idle / submitting / success / error at minimum; build a states playground, not one happy-path screen. IC's own example is "a fintech app with a payment card" (paid / upcoming / overdue / autopay / locked). [IC: State Machines]
- Optimistic writes: assume success, update instantly, revert + toast on failure. Optimistic reads: render cached state, reconcile silently. [IC: Perceived Performance]
- Mask unavoidable waits with content worth the user's attention; "the best loading state is one that you never see." [IC: Perceived Performance]
- Warm the language: "Create your summons document," not "Generate Summons (JD-FM-3)." Set expectations (time estimates, "what you'll need") before multi-step tasks. [IC: Redesign Parts 2–3]

---

## 4. Component build lessons

**Buttons**
- Four-state machine (idle → submitting → success/error) built as a playground first. [IC: State Machines]
- Brand: press feedback is color-only — "buttons do *not* shrink." Primary `#00D37E` → hover `#02855A` → press `#04482C`; 120 ms. `[Brand]` (This overrides any scale-on-tap habit.)
- One primary action per screen/step; secondary stays filled-but-quiet rather than switching to an outline style mid-form. [IC: Redesign Part 3, Style Details]
- Icons inside buttons: optically aligned, matching the app's single stroke width. [IC: Layout & Alignment]

**Lists & rows**
- Icons on a vertical spine, text on a left edge; accessories on the row's horizontal spine. [IC: Layout & Alignment]
- Kill chevrons/dividers that add noise without meaning; if dividers stay, they're consistent everywhere. [IC: Redesign Part 2, Refining Today]
- For "relative performance" per row, tint the row background instead of cramped inline progress bars. [IC: Refining Presscut]
- Auto-expand + scroll to the user's current item; collapse completed groups with a subtle card-stack hint. [IC: Redesign Part 2]
- Enter: fade + rise, 40–60 ms stagger (§1.6); removal via `popLayout`.

**Cards**
- Merge sibling metric cards into one scoreboard — "separating these four creates unnecessary visual noise. They're effectively all siblings." [IC: Refining Presscut]
- Value inline with its label (two lines max), not label/metric/value stacked three-high. [IC: Refining Presscut]
- Hairline transparent borders, layered shadows, trimmed top padding. [IC: Style Details, Compositing, Layout & Alignment] Brand: 8 px radius, `shadow-1`, 24 px padding. `[Brand]`
- Current/active card can widen and grow its title in place (container transform) when it becomes the workspace. [IC: Redesign Part 2]

**Sheets**
- Task/detail actions live in a bottom sheet, not a pushed screen — keeps users "anchored," and simple tasks complete without navigation. Include description, "what you'll need," and a time estimate for anything multi-step (KYC, first top-up). [IC: Redesign Parts 2–3]
- Dismiss-on-complete with the result visibly updating behind (§2 table). Rubber-band over-drag with dead zone (§1.7).

**Number displays**
- Mutable values in mono/tabular figures so "digits don't jump around as they change" — IC even styles the mutable value in monospace to visually distinguish it from label text. [IC: Creating a Slider Component] Brand: Red Hat Mono for numerals. `[Brand]`
- Animate value changes semantically (odometer tick), snap instantly during direct manipulation, spring/ease only for programmatic jumps — IC's slider: click-to-decile animates with a spring, "dragging is still instant." [IC: Slider]
- Column numbers: right-aligned, tabular. [IC: Typography Details]

**Tab bars / toolbars**
- Question the tab bar: only true peer destinations earn a slot; supporting features (profile, chat/help) move to the header or a contextual input. [IC: Redesign Part 2]
- No bounding container "for no functional gain"; primary action right-most and emphasized (iOS convention); icon set unified. [IC: Refining Today]

**Slider-derived micro-interaction lessons (apply to any control):**
- The control acknowledges presence: subtle brightness lift on hover/drag. [IC: Slider]
- Affordances appear on demand (handle/ticks on hover), scale in on one axis rather than opacity-popping. [IC: Slider]
- Elements dodge each other instead of colliding (value label vs handle), then spring back. [IC: Slider]
- Generous snap targets for taps ("if I'm a couple pixels off, I might land on 51%"), full precision for drags; 800 ms delay before an inline value turns into an editable input. [IC: Slider]

---

## 5. AI-collaboration & skills

Three installable Interface Craft skills (installer writes to `~/.agents/skills/`, symlinked into Claude Code
et al.) [IC: Skills]:

1. **Storyboard Animation** — the §1.2 pattern: ASCII storyboard, `TIMING` object, per-element configs, single
   `stage` integer. Activates on "animation, transitions, storyboard, or entrance." **Adopt as our house style
   for every choreographed sequence in this prototype**, whether or not the skill is installed.
2. **DialKit** — `npm install dialkit motion`; `<DialRoot />` in the layout; `useDialKit("Name", {...})` with
   slider tuples `[default, min, max]`, boolean toggles, spring objects (`type/visualDuration/bounce` → returns
   a transition you pass straight to Motion), action callbacks, nested folders. Use it to tune sheet physics,
   stagger, and durations live before freezing them into `motion/tokens.ts`. Activates on tuning/panel language.
3. **Design Critique** — structured review: context → first impressions → visual design / interface design /
   interaction consistency / user context, each issue as *observation → impact → alternative*, ending with
   "Top Opportunities." Works best on screenshots. Activates on "critique, review, feedback, audit, polish."

Workflow guidance worth applying [IC: Collaborating with AI, Separation of Concerns, Showing Things to Claude Code]:
- Loop per feature: build with storyboard structure → tune with live controls → critique → refine.
- Share screenshots with the agent iteratively — "showing it what we're seeing, pointing out what's off."
- Prompt for one concern at a time (interaction confidence first with a rough "breakable toy," visual polish
  after the direction is proven); don't ask for the fully-polished screen in one prompt.
- When recreating an effect, describe the observed behavior plainly and iterate in small steps ("now let's
  have it shrink a bit… it doesn't feel organic… let's try and fix"). [IC: Recreate Everything]

---

## 6. Priority cheat-sheet

1. DO use only `cubic-bezier(0.2, 0.7, 0.2, 1)` for enters/moves; 120/200/240/320 ms tokens.
2. DO write every sequence in the Storyboard pattern: ASCII shot list, one `TIMING` object, one `stage` int.
3. DO overlap choreography steps (~60–80% through the leader) — never run steps back-to-back.
4. DO stagger list rows 40–60 ms, fade + small rise, first ~8 rows only.
5. DO use `AnimatePresence mode="popLayout"` for every element replacement; exits ~2/3 enter duration.
6. DO keep every animation interruptible — state drives `animate` props; input is never gated on completion.
7. DO give sheets rubber-band over-drag (dead zone, 64 px max) and a `bounce: 0` settle spring on release.
8. DO animate money with odometer ticks in tabular/mono figures; snap instantly during direct manipulation.
9. DO write optimistically and read from cache; failure = revert + toast with retry, never a blocking spinner.
10. DO honor `useReducedMotion`: opacity-only, no stagger, no count-up, no shimmer.
11. DO move exactly one hero element per transition; everything else fades or holds.
12. DO start from iOS defaults, then improve; Family is the fintech bar.
13. NEVER use visible bounce — no overshoot springs (`bounce > 0`, IC's `stiffness: 250–500` presets) in UI chrome.
14. NEVER slide pages horizontally or parallax-push — brand page transitions are fade-only.
15. NEVER scale buttons on press — color change only (`#00D37E → #02855A → #04482C`).
16. NEVER animate siblings' opacity separately when they overlap — group, then fade the group.
17. NEVER use keyframe ping-pong for loops — drive loops with a sine wave, stagger by phase offset.
18. NEVER show a skeleton/spinner for sub-second waits, and never let cached pages flash a default state.
19. NEVER mix icon stroke widths, border treatments, or corner languages on one screen.
20. NEVER animate for its own sake — if the motion doesn't convey hierarchy, causality, or state, cut it.
