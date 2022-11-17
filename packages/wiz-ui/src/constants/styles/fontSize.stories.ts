import { StoryFn } from "@storybook/vue";

import { THEME } from "./index";

export default {
  title: "Variables/FontSize",
};

export const Overview: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {},
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <span style="font-size: ${THEME.fontSize.xs2};">fontSize.xs2</span>
        <span style="font-size: ${THEME.fontSize.xs};">fontSize.xs</span>
        <span style="font-size: ${THEME.fontSize.sm};">fontSize.sm</span>
        <span style="font-size: ${THEME.fontSize.md};">fontSize.md</span>
        <span style="font-size: ${THEME.fontSize.lg};">fontSize.lg</span>
        <span style="font-size: ${THEME.fontSize.xl};">fontSize.xl</span>
        <span style="font-size: ${THEME.fontSize.xl2};">fontSize.xl2</span>
        <span style="font-size: ${THEME.fontSize.xl3};">fontSize.xl3</span>
        <span style="font-size: ${THEME.fontSize.xl4};">fontSize.xl4</span>
      </div>
    </div>
  `,
});
