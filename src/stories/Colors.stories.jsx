import React from "react";
import "./tokens.css";

export default {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
};

const Swatch = ({ name, cssVar, hex, role, dark = false }) => (
  <div className="tk-swatch">
    <div className="chip" style={{ background: hex, border: dark ? "1px solid #E0E0E0" : undefined }} />
    <div className="name">{name}</div>
    {cssVar && <div className="tk-meta">{cssVar}</div>}
    <div className="hex">{hex}</div>
    {role && <div className="role">{role}</div>}
  </div>
);

/* ─────────────────────────────────────────────
 * 1. SEMANTIC TOKENS
 * ───────────────────────────────────────────── */
export const Semantic = {
  name: "Semantic Tokens",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      <div>
        <div className="tk-section-label">Backgrounds &amp; Surfaces</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="background"        cssVar="--background"        hex="#F6F7F9" dark role="Default page/dashboard background" />
          <Swatch name="surface"           cssVar="--surface"           hex="#FFFFFF" dark role="Cards, sidebar, inputs" />
          <Swatch name="surface-secondary" cssVar="--surface-secondary" hex="#F6F7F9" dark role="Receding areas within a surface container" />
          <Swatch name="surface-disabled"  cssVar="--surface-disabled"  hex="#F2F4F5" dark role="Disabled buttons, inputs, cards" />
        </div>
      </div>

      <div>
        <div className="tk-section-label">Interactive States</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="surface-hovered"     cssVar="--surface-hovered"     hex="#ECECEC" dark role="Hovered surface elements" />
          <Swatch name="surface-pressed"     cssVar="--surface-pressed"     hex="#E3E3E3" dark role="Pressed surface elements" />
          <Swatch name="interactive-active"  cssVar="--interactive-active"  hex="#054948" role="Active/selected/on state: tabs, checkboxes, focus borders" />
          <Swatch name="primary"             cssVar="--primary"             hex="#00D37E" role="Main action: primary buttons" />
        </div>
      </div>

      <div>
        <div className="tk-section-label">Text &amp; Icons</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="text-primary"        cssVar="--text-primary"        hex="#002B2A" role="Default text and icons" />
          <Swatch name="text-secondary"      cssVar="--text-secondary"      hex="#505454" role="Secondary prominence text/icons" />
          <Swatch name="text-inverse"        cssVar="--text-inverse"        hex="#FFFFFF" dark role="Text/icons on dark containers" />
          <Swatch name="disabled-on-surface" cssVar="--disabled-on-surface" hex="#9D9E9F" dark role="Disabled text/icons" />
        </div>
      </div>

      <div>
        <div className="tk-section-label">Utility</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="border"    cssVar="--border"    hex="#D8D8D8" dark role="Default borders and dividers" />
          <Swatch name="text-link" cssVar="--link"      hex="#187D97" role="Interactive text links" />
          <Swatch name="overlay"   cssVar="--overlay"   hex="rgba(5,21,19,0.70)" role="Modal/bottom sheet scrim" />
        </div>
      </div>

      <div>
        <div className="tk-section-label">Status — Foreground</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="positive"    cssVar="--status-positive"    hex="#257C58" role="Success text, icons, borders" />
          <Swatch name="critical"    cssVar="--status-critical"    hex="#DF1312" role="Error/critical text, icons, borders" />
          <Swatch name="warning"     cssVar="--status-warning"     hex="#FC9A07" role="Warning text, icons, borders" />
          <Swatch name="information" cssVar="--status-information" hex="#0C45E1" role="Info text, icons, borders" />
        </div>
      </div>

      <div>
        <div className="tk-section-label">Status — Surface (Backgrounds)</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="surface-positive"    cssVar="--status-surface-positive"    hex="#F0F9F4" dark role="Alert/banner backgrounds: positive" />
          <Swatch name="surface-critical"    cssVar="--status-surface-critical"    hex="#FFF1F1" dark role="Alert/banner backgrounds: critical" />
          <Swatch name="surface-warning"     cssVar="--status-surface-warning"     hex="#FFFAEA" dark role="Alert/banner backgrounds: warning" />
          <Swatch name="surface-information" cssVar="--status-surface-information" hex="#EEF6FF" dark role="Alert/banner, tag/badge backgrounds: info" />
        </div>
      </div>

    </div>
  ),
};

/* ─────────────────────────────────────────────
 * 2. COMPONENT TOKENS
 * ───────────────────────────────────────────── */
export const Component = {
  name: "Component Tokens",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      <div>
        <div className="tk-section-label">Button — Primary</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="btn-primary-hovered" cssVar="--btn-primary-hovered" hex="#00B86D" role="Primary button hover background" />
          <Swatch name="btn-primary-pressed" cssVar="--btn-primary-pressed" hex="#009E5A" role="Primary button pressed background" />
        </div>
      </div>

      <div>
        <div className="tk-section-label">Button — Secondary &amp; Tertiary</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="btn-secondary-text"    cssVar="--btn-secondary-text"    hex="#054948" role="Text color for secondary and tertiary buttons" />
          <Swatch name="btn-secondary-hovered" cssVar="--btn-secondary-hovered" hex="rgba(5,73,72,0.10)" dark role="Secondary button hover background" />
          <Swatch name="btn-secondary-pressed" cssVar="--btn-secondary-pressed" hex="rgba(5,73,72,0.15)" dark role="Secondary button pressed background" />
          <Swatch name="btn-tertiary-hovered"  cssVar="--btn-tertiary-hovered"  hex="rgba(5,73,72,0.10)" dark role="Tertiary button hover background" />
        </div>
      </div>

      <div>
        <div className="tk-section-label">Input</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="input-placeholder" cssVar="--input-placeholder" hex="#B6B6B6" dark role="Placeholder text in inputs, textareas, and field selectors" />
        </div>
      </div>

      <div>
        <div className="tk-section-label">Sidebar — Default</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="sidebar-default-menuitem-active" cssVar="--sidebar-active"         hex="#D7EFE2" dark role="Active nav item background" />
          <Swatch name="sidebar-default-menuitem-text"   cssVar="--sidebar-menuitem-text"  hex="#257C58"      role="Active nav item text and icons" />
        </div>
      </div>

      <div>
        <div className="tk-section-label">Sidebar — Sandbox</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="sidebar-sandbox-bg"             cssVar="--sidebar-sandbox-bg"      hex="#002B2A"      role="Sandbox sidebar background" />
          <Swatch name="sidebar-sandbox-menuitem-active" cssVar="--sidebar-sandbox-active" hex="#005755"      role="Sandbox active nav item background" />
          <Swatch name="sidebar-sandbox-menuitem-text"  cssVar="--sidebar-sandbox-text"    hex="#FFFFFF" dark role="Sandbox active nav item text and icons" />
        </div>
      </div>

    </div>
  ),
};

/* ─────────────────────────────────────────────
 * 3. PRIMITIVES
 * ───────────────────────────────────────────── */
export const Primitives = {
  name: "Primitives",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      <div>
        <div className="tk-section-label">Brand Colors</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="Vibrant Green"      cssVar="--brand-vibrant-green"     hex="#00D37E" role="Primary brand — signature highlight" />
          <Swatch name="Stable Deep Ivy"    cssVar="--brand-stable-deep-ivy"   hex="#002B2A" role="Dark brand — text, brand black" />
          <Swatch name="Secure Teal"        cssVar="--brand-secure-teal"       hex="#054948" role="Deep teal — grounding, surfaces" />
          <Swatch name="Wealthy Gold"       cssVar="--brand-wealthy-gold"      hex="#B59B58" role="Gold accent" />
          <Swatch name="Credible Blue"      cssVar="--brand-credible-blue"     hex="#187D97" role="Blue — links, info" />
          <Swatch name="Seamless Mint"      cssVar="--brand-seamless-mint"     hex="#79FFCA" dark role="Mint accent" />
          <Swatch name="Innovative Grey"    cssVar="--brand-innovative-grey"   hex="#D8D8D8" dark role="Default borders" />
          <Swatch name="Modern Light Grey"  cssVar="--brand-modern-light-grey" hex="#F0F0F0" dark role="Light backgrounds" />
        </div>
      </div>

      <div>
        <div className="tk-section-label">Stablecoin Marks</div>
        <div className="tk-grid tk-grid--4" style={{ marginTop: 12 }}>
          <Swatch name="XSGD" cssVar="--brand-xsgd" hex="#0E3FC7" role="Singapore Dollar stablecoin" />
          <Swatch name="XIDR" cssVar="--brand-xidr" hex="#DF1312" role="Indonesian Rupiah stablecoin" />
          <Swatch name="XUSD" cssVar="--brand-xusd" hex="#257C58" role="US Dollar stablecoin" />
        </div>
      </div>

    </div>
  ),
};
