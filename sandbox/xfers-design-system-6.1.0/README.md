# @xfers/design-system@6.1.0 — Isolated Sandbox

A **self-contained** Storybook for exploring the published
[`@xfers/design-system@6.1.0`](https://www.npmjs.com/package/@xfers/design-system/v/6.1.0)
package. It is intentionally **decoupled** from the parent
`testing-design-system` project:

- Its own `package.json` and `node_modules` (separate install).
- Its own React (18) + antd (5.21) + Storybook (8) stack, so the parent
  project's dependencies, stories, and Chromatic baselines stay clean.
- Runs on its own port (6007) so it can run alongside the parent Storybook.

## Why is `antd` a dependency here?

The published package ships compiled output that **externalizes `antd`** but
only declares `react`/`react-dom` as peer dependencies. Without `antd`
installed, the antd-backed components (Input, Button, Table, …) fail to
resolve at runtime. Emotion, moment, and chart.js are bundled into the
package, so `antd` is the only extra runtime dependency needed.

## Usage

```bash
cd sandbox/xfers-design-system-6.1.0
npm install
npm run storybook        # http://localhost:6007
```

To produce a static build:

```bash
npm run build-storybook  # -> storybook-static/
```

## What's covered

Stories live under the **"@xfers Design System 6.1.0"** group:

- **Button** — primary / secondary / tertiary, disabled, all types
- **Tag** — all types + outlined / filled / removable variants
- **Alert** — success / info / warning / error
- **Input** — default / error / disabled, plus Password & Search
- **Typography** — H1–H4, P1, P1Bold, SmallP

Each story is wrapped in a shared decorator (`src/decorator.jsx`) that
provides the library's `ThemeProvider` (with `straitsXTheme`) and
`AntdConfigProvider`, which the components require at runtime.
