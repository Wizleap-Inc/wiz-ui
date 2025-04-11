import { Preview } from "@storybook/react";
import { withScreenshot } from "storycap";

export const decorators = [withScreenshot];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      values: [
        {
          name: "gradient",
          value: "center / cover url(./public/images/gradient.png)",
        },
      ],
    },
    screenshot: {
      viewports: {
        large: {
          width: 1440,
          height: 1024,
        },
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
