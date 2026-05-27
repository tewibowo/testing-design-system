import React from "react";
import "./tokens.css";

export default {
  title: "Tokens/Colors",
  parameters: { layout: "padded" },
};

const Swatch = ({ name, hex, role, dark = false }) => (
  <div className="tk-swatch">
    <div className="chip" style={{ background: hex, border: dark ? "1px solid #E0E0E0" : undefined }} />
    <div className="name">{name}</div>
    <div className="hex">{hex}</div>
    {role && <div className="role">{role}</div>}
  </div>
);

export const Primary = {
  render: () => (
    <div className="tk-row">
      <Swatch name="Vibrant Green" hex="#00D37E" role="Signature · highlight" />
      <Swatch name="Secure Teal" hex="#054948" role="Grounding · surface" />
      <Swatch name="Stable Deep Ivy" hex="#002B2A" role="Text · brand black" />
    </div>
  ),
};

export const Secondary = {
  render: () => (
    <div className="tk-row">
      <Swatch name="Seamless Mint" hex="#79FFCA" />
      <Swatch name="Credible Blue" hex="#187D97" />
      <Swatch name="Wealthy Gold" hex="#B59B58" />
      <Swatch name="Innovative Grey" hex="#D8D8D8" />
      <Swatch name="Modern L. Grey" hex="#F0F0F0" dark />
    </div>
  ),
};

export const Stablecoin = {
  render: () => (
    <div className="tk-row">
      <Swatch name="XSGD" hex="#DF1312" role="Singapore red" />
      <Swatch name="XIDR" hex="#0E3FC7" role="Indonesia blue" />
      <Swatch name="XUSD" hex="#257C58" role="USD green" />
    </div>
  ),
};

export const Semantic = {
  render: () => (
    <div>
      <div className="tk-grid tk-grid--5">
        <Swatch name="Positive" hex="#007D00" />
        <Swatch name="Critical" hex="#DF1312" />
        <Swatch name="Warning" hex="#F79410" />
        <Swatch name="Information" hex="#0D69D4" />
        <Swatch name="Neutral" hex="#1B2736" />
      </div>
      <div className="tk-divider tk-grid tk-grid--5">
        <Swatch name="Positive soft" hex="#F0F9F4" dark />
        <Swatch name="Critical soft" hex="#FDECEC" dark />
        <Swatch name="Warning soft" hex="#FFF5E6" dark />
        <Swatch name="Information soft" hex="#EAF2FD" dark />
        <Swatch name="Neutral soft" hex="#F2F4F5" dark />
      </div>
    </div>
  ),
};

export const Surface = {
  render: () => (
    <div>
      <div className="tk-grid tk-grid--4">
        <Swatch name="Surface" hex="#FFFFFF" dark />
        <Swatch name="Subtle" hex="#F7F7F7" dark />
        <Swatch name="Muted" hex="#F6F7F9" dark />
        <Swatch name="Line soft" hex="#EBEBEB" dark />
      </div>
      <div className="tk-divider tk-grid tk-grid--4">
        <Swatch name="fg / body" hex="#121212" />
        <Swatch name="fg-2" hex="#505454" />
        <Swatch name="fg-3 helper" hex="#6B6B6B" />
        <Swatch name="fg-4 disabled" hex="#9D9E9F" />
      </div>
    </div>
  ),
};
