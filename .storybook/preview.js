import "../src/styles/global.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      default: "surface",
      values: [
        { name: "surface", value: "#FFFFFF" },
        { name: "subtle", value: "#F7F7F7" },
        { name: "muted", value: "#F6F7F9" },
        { name: "dashboard", value: "#F1F2F4" },
        { name: "ivy", value: "#002B2A" },
        { name: "teal", value: "#054948" },
      ],
    },

    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Introduction",
          "Foundations",
          ["Colors", "Typography", "Spacing & Elevation"],
          "Atoms",
          "Components",
          "Compositions",
          "Examples",
          "*",
        ],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
};

export default preview;
