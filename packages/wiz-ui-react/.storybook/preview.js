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
};

export const decorators = [withScreenshot];
