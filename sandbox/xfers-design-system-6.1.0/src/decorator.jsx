import React from "react";
import {
  ThemeProvider,
  AntdConfigProvider,
  straitsXTheme,
} from "@xfers/design-system";

/**
 * Wraps a story in the providers the published @xfers/design-system@6.1.0
 * components expect at runtime: the emotion ThemeProvider (so themed
 * components can read the StraitsX theme) and the AntdConfigProvider (so the
 * antd-based components pick up the design system's antd token overrides).
 */
export const withDesignSystem = (Story) => (
  <ThemeProvider theme={straitsXTheme}>
    <AntdConfigProvider>
      <Story />
    </AntdConfigProvider>
  </ThemeProvider>
);
