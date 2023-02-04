import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizISearch } from "@/components/icons";

import WizTextInput from "./text.vue";

export default {
  title: "Base/Input/Text",
  component: WizTextInput,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    name: {
      control: {
        type: "text",
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    expand: {
      control: {
        type: "boolean",
      },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextInput },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `<WizTextInput v-bind="$props" v-model="value" />`,
});

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizTextInput v-model="value" name="text-input" />
</template>
      `,
    },
  },
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "入力してください",
};

Placeholder.parameters = {
  docs: {
    description: {
      story: "`placeholder` を指定することができます。",
    },
    source: {
      code: `
<template>
  <WizTextInput placeholder="入力してください" v-model="value" name="text-input" />
</template>
      `,
    },
  },
};

export const Expand = Template.bind({});
Expand.args = {
  expand: true,
};
Expand.parameters = {
  docs: {
    description: {
      story: "コンポーネントを幅いっぱいに広げるように指定することができます。",
    },
    source: {
      code: `
<template>
  <WizTextInput expand v-model="value" name="text-input" />
</template>
      `,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: "入力してください",
};
Disabled.parameters = {
  docs: {
    description: {
      story: "コンポーネントを幅いっぱいに指定することができます。",
    },
    source: {
      code: `
<template>
  <WizTextInput expand v-model="value" name="text-input" />
</template>
      `,
    },
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  placeholder: "入力してください",
  icon: WizISearch,
};

export const Test = Template.bind({});
Test.args = {
  placeholder: "入力してください",
};

Test.play = async ({ canvasElement }) => {
  const DUMMY_INPUT_VALUE = "Hoge";
  const canvas = within(canvasElement);
  const input = canvas.getByPlaceholderText("入力してください");

  await userEvent.click(input);
  await waitFor(() => expect(input).toHaveFocus());
  await userEvent.type(input, DUMMY_INPUT_VALUE);
  await waitFor(() => expect(input).toHaveValue(DUMMY_INPUT_VALUE));
  await userEvent.clear(input);
  await waitFor(() => expect(input).toHaveValue(""));
};

const PlaygroundTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextInput },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `
    <div>
      <p>入力値：{{ value }}</p>
      <WizTextInput placeholder="入力してください" v-model="value" />
    </div>
  `,
});

export const Playground = PlaygroundTemplate.bind({});
