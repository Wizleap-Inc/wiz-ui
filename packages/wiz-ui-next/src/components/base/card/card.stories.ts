import { StoryFn, Meta } from "@storybook/vue3";
import {
  COLOR_MAP_ACCESSORS,
  SPACING_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizTextButton } from "@/components";

import WizCard from "./card.vue";

export default {
  title: "Base/Card",
  component: WizCard,
  argTypes: {
    p: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    px: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    py: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    backgroundColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    shadow: {
      control: { type: "boolean" },
    },
    border: {
      control: { type: "boolean" },
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    title: {
      control: { type: "text" },
    },
    hint: {
      control: { type: "text" },
    },
  },
} as Meta<typeof WizCard>;

const Template: StoryFn<typeof WizCard> = (args) => ({
  components: { WizCard, WizTextButton },
  setup: () => ({ args }),
  template: `<WizCard v-bind="args">
      <template #mainHeaderArea>mainHeaderAreaスロット</template>
      <template #subHeaderArea>subHeaderAreaスロット</template>
      defaultスロット
      <template #footer><WizTextButton>保存する</WizTextButton></template>
    </WizCard>`,
});

export const Default = Template.bind({});

export const Shadow = Template.bind({});
Shadow.args = {
  shadow: true,
};

export const Border = Template.bind({});
Border.args = {
  border: true,
};

export const Align = Template.bind({});
Align.args = {
  align: "center",
};

export const Title = Template.bind({});
Title.args = {
  title: "タイトル",
};

export const Hint = Template.bind({});
Hint.args = {
  hint: "ヒント",
};
