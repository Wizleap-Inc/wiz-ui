import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn } from "@storybook/vue";
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import WizTextArea from "./text-area.vue";

export default {
  title: "Base/TextArea",
  component: WizTextArea,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    id: {
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
  components: { WizTextArea },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `<WizTextArea v-bind="$props" v-model="value" name="text-area" />`,
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    source: {
      code: `
<template>
  <WizTextArea v-model="value" name="text-area" />
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
      story:
        "要素内の `white-space` を指定することができます。選択肢は `WhiteSpacingKey` から指定することができます。 default は `normal` です。",
    },
    source: {
      code: `
<template>
  <WizTextArea placeholder="入力してください。" v-model="value" name="text-area" />
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
      story: "`expand` を指定することで、幅いっぱいに表示することができます。 ",
    },
    source: {
      code: `
<template>
  <WizTextArea expand placeholder="入力してください。" v-model="value" name="text-area" />
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
    source: {
      code: `
<template>
  <WizTextArea disabled placeholder="入力してください。" v-model="value" name="text-area" />
</template>
      `,
    },
  },
};

export const Row = Template.bind({});
Row.args = {
  rows: 5,
  placeholder: "入力してください",
};
Row.parameters = {
  docs: {
    description: {
      story:
        "`rows` を指定することで、デフォルトで表示される行数を指定することができます。",
    },
    source: {
      code: `
<template>
  <WizTextArea :rows="5"  v-model="value" name="text-area" />
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
  const canvas = within(canvasElement);
  const textarea = canvas.getByPlaceholderText("入力してください");
  await userEvent.click(textarea);
  await waitFor(() => expect(textarea).toHaveFocus());
  await waitFor(() =>
    expect(textarea).toHaveStyle(`border: 1px solid ${THEME.color.green[800]};`)
  );
  await userEvent.type(textarea, "Hoge");
  await waitFor(() => expect(textarea).toHaveValue("Hoge"));
  await userEvent.clear(textarea);
  await waitFor(() => expect(textarea).toHaveValue(""));
};

const PlaygroundTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTextArea },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `
    <div>
      <p>入力値：{{ value }}</p>
      <WizTextArea Placeholder="入力してください" v-model="value" name="text-area" />
    </div>
  `,
});

export const Playground = PlaygroundTemplate.bind({});
Playground.parameters = {
  docs: {
    source: {
      code: `
<script setup lang="ts">
  const value = ref("");
</script>
<template>
  <div>
    <p>入力値：{{ value }}</p>
    <WizTextArea Placeholder="入力してください" v-model="value" name="text-area" @update:modelValue="args.update" />
  </div>
</template>
      `,
    },
  },
};
