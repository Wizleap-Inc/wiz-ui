import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

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
    update: {
      action: "update:modelValue",
    },
  },
} as Meta<typeof WizTextInput>;

const Template: StoryFn<typeof WizTextInput> = (args) => ({
  components: { WizTextInput },
  setup() {
    const value = ref("");
    return { value, args };
  },
  template: `<WizTextInput v-bind="args" v-model="value" name="text-input" />`,
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

const PlaygroundTemplate: StoryFn<typeof WizTextInput> = (args) => ({
  components: { WizTextInput },
  setup() {
    const value = ref("");
    return { value, args };
  },
  template: `
    <div>
      <p>入力値：{{ value }}</p>
      <WizTextInput v-bind="args" placeholder="入力してください" v-model="value" name="text-input" @update:modelValue="args.update" />
    </div>
  `,
});

export const Playground = PlaygroundTemplate.bind({});
