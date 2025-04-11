import { fn } from "@storybook/test";
import { withScreenshot } from "storycap";

export const parameters = {
  // https://storybook.js.org/docs/essentials/actions#via-storybooktest-fn-spy-function
  args: {
    onClick: fn(),
    onToggle: fn(),
    onDateSelected: fn(),
    onSelectBoxValueChange: fn(),
    onTurn: fn(),
  },
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
      desktop: {
        width: 1440,
        height: 1024,
      },
    },
  },
};

export const decorators = [withScreenshot];
