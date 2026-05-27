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
        order: [
          "Introduction",
          "Tokens",
          ["Colors", "Typography", "Spacing & Elevation"],
          "Components",
          ["Button", "Tag", "Input", "Card", "EmptyState"],
          "Composition",
          "Brand",
          "Examples",
        ],
      },
    },
  },
};

export default preview;
