import { StoryFn, Meta } from "@storybook/vue";
import { ref } from "vue";

import WizRangeDatePicker from "./range-date-picker.vue";
import { DateRange } from "./types";

export default {
  title: "Base/Input/RangeDatePicker",
  component: WizRangeDatePicker,
  argTypes: {
    value: {
      control: {
        type: "date",
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
    onClick: {
      action: "update:value",
    },
  },
} as Meta<typeof WizRangeDatePicker>;

const Template: StoryFn<typeof WizRangeDatePicker> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizRangeDatePicker },
  template: `
    <div>
      <WizRangeDatePicker v-bind="$props" @update:value="onClick"/>
    </div>
  `,
});

interface Props {
  disabled: boolean;
  expand: boolean;
}

const CODE_TEMPLATE = (props: Partial<Props>) => `
<script setup lang="ts">
import { ref } from "vue";
import { WizRangeDatePicker } from "@wizleap-inc/wiz-ui";

const dateRange = ref<DateRange>({
  start: null,
  end: null,
});
</script>
<template>
  <WizRangeDatePicker :value="dateRange"${
    (props.disabled ? ' :disabled="true"' : "") +
    (props.expand ? " expand" : "")
  }/>
</template>
`;

export const Default = Template.bind({});
Default.args = {
  value: {
    start: null,
    end: null,
  },
};
Default.parameters = {
  docs: {
    description: {
      component: `
### WizRangeDatePicker
DatePickerを拡張して、開始日と終了日を選択できるようにしたコンポーネントです。
v-modelにはDateRange型の値を渡します。初期値はstartとendともにnullであることを推奨します。

各状態はMockしてあるため実際の動作とは異なります。もし実際の動作を試したい場合、Test Storyをご覧ください。
      `,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: {
    start: null,
    end: null,
  },
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story: "disabledをtrueにすると、入力ができなくなります。",
    },
    source: {
      code: CODE_TEMPLATE({ disabled: true }),
    },
  },
};

export const Expand = Template.bind({});
Expand.args = {
  value: {
    start: null,
    end: null,
  },
  expand: true,
};
Expand.parameters = {
  docs: {
    description: {
      story: "expandをtrueにすると、入力要素が横幅いっぱいに広がります。",
    },
    source: {
      code: CODE_TEMPLATE({ expand: true }),
    },
  },
};

export const Test: StoryFn<typeof WizRangeDatePicker> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizRangeDatePicker },
  setup() {
    const dateRange = ref<DateRange>({
      start: null,
      end: null,
    });
    return { dateRange };
  },
  template: `
    <div>
      <WizRangeDatePicker v-model="dateRange" @update:value="onClick"/>
    </div>
  `,
});
