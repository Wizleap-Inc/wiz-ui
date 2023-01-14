import { StoryFn } from "@storybook/vue";
import {
  COLOR_MAP_ACCESSORS,
  SPACING_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import {
  WizTextButton,
  WizTooltip,
  WizIcon,
  WizHStack,
  WizIHelp,
} from "@/components";

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
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
  },
};

const Template: StoryFn<typeof WizCard> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCard, WizTextButton },
  template: `<WizCard v-bind="$props">
      defaultスロット
    </WizCard>`,
});

export const Default = Template.bind({});

export const Shadow = Template.bind({});
Shadow.args = {
  shadow: true,
  gap: "md",
};

export const Border = Template.bind({});
Border.args = {
  border: true,
};

export const Align = Template.bind({});
Align.args = {
  align: "center",
};

export const Gap = Template.bind({});
Gap.args = {
  gap: "xl",
};

export const MainHeaderArea: StoryFn<typeof WizCard> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCard },
  template: `<WizCard v-bind="$props">
      <template #mainHeaderArea>mainHeaderAreaスロット</template>
      defaultスロット
    </WizCard>`,
});

export const MainHeaderAreaWithHint: StoryFn<typeof WizCard> = (
  _,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
  components: { WizCard, WizTooltip, WizIcon, WizHStack },
  setup: () => ({ WizIHelp }),
  template: `<WizCard v-bind="$props">
      <template #mainHeaderArea>
        <WizHStack align="center">
          mainHeaderAreaスロット
          <WizTooltip content="これはヒントです">
            <WizIcon :icon="WizIHelp" color="gray.600" size="lg" />
          </WizTooltip>
        </WizHStack>
      </template>
      defaultスロット
    </WizCard>`,
});

export const SubHeaderArea: StoryFn<typeof WizCard> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCard },
  template: `<WizCard v-bind="$props">
      <template #subHeaderArea>subHeaderAreaスロット</template>
      defaultスロット
    </WizCard>`,
});

export const Footer: StoryFn<typeof WizCard> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCard, WizTextButton },
  template: `<WizCard v-bind="$props">
      defaultスロット
      <template #footer><WizTextButton>保存する</WizTextButton></template>
    </WizCard>`,
});
