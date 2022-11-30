import { StoryFn } from "@storybook/vue";
import { provide } from "vue";

import { useGlobalProvider, globalKey } from "@/providers";

import { WizHeader } from ".";

export default {
  title: "Custom/Header",
  component: WizHeader,
  decorators: [
    (story: StoryFn) => ({
      components: { story },
      setup() {
        provide(globalKey, useGlobalProvider());
      },
      template: `<story />`,
    }),
  ],
};

export const Default: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizHeader },
  template: `
    <wiz-header
      title="Wiz UI"
      avatarSrc="./public/images/avatar-1.png"
    />
  `,
});
