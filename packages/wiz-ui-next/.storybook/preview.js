import { withScreenshot } from "storycap";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
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
