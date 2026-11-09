import { expect, userEvent, waitFor, within } from "@storybook/test";
import { Meta, StoryFn } from "@storybook/vue3";
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import WizTimePicker from "./time-picker.vue";

export default {
  title: "Base/Input/TimePicker",
  component: WizTimePicker,
  argTypes: {
    value: {
      control: {
        type: "date",
      },
    },
    input: {
      action: "input",
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    isDirectionFixed: {
      control: { type: "boolean" },
    },
    minuteInterval: {
      control: { type: "number" },
    },
  },
} as Meta<typeof WizTimePicker>;

const Template: StoryFn<typeof WizTimePicker> = (args) => ({
  components: { WizTimePicker },
  setup() {
    const value = ref("");
    return { value, args };
  },
  template: `<WizTimePicker v-bind="args"  v-model="value" @update:modelValue="args.input"/>`,
});

// デフォルト
export const Default = Template.bind({});

// 入力禁止
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Expand = Template.bind({});
Expand.args = {
  width: "100%",
};

export const IsDirectionFixed = Template.bind({});
IsDirectionFixed.args = {
  isDirectionFixed: true,
};

// 1分間隔
export const MinuteInterval = Template.bind({});
MinuteInterval.args = {
  minuteInterval: 1,
};

const AllowInputTemplate: StoryFn<typeof WizTimePicker> = (args) => ({
  components: { WizTimePicker },
  setup() {
    const value = ref("9:05");
    return { value, args };
  },
  template: `<WizTimePicker v-bind="args" v-model="value" allowInput @update:modelValue="args.input"/>`,
});

export const AllowInput = AllowInputTemplate.bind({});
AllowInput.parameters = {
  docs: {
    description: {
      story: `
\`allowInput\` を指定すると、入力欄に時刻を直接入力できます。

- 受け付ける形式: \`H:mm\`・\`H時m分\`・区切りなし（\`930\`・\`0930\`）。全角数字も可
- Enter またはフォーカスが外れたときに確定します
- 解釈できない・存在しない・\`minuteInterval\` の刻みに合わない時刻は、元の値に戻ります
- 空にして確定すると未入力になります
`,
    },
  },
};

export const TestAllowInput = AllowInputTemplate.bind({});
TestAllowInput.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByLabelText(
    ARIA_LABELS.TIME_PICKER_INPUT
  ) as HTMLInputElement;

  // フォーカスしても表示と同じ形式のまま編集できる
  await userEvent.click(input);
  await waitFor(() => expect(input.value).toBe("9:05"));

  // 時刻を入力して Enter で確定
  await userEvent.clear(input);
  await userEvent.type(input, "10:30{enter}");
  await userEvent.tab();
  await waitFor(() => expect(input.value).toBe("10:30"));

  // 区切りなし
  await userEvent.click(input);
  await userEvent.clear(input);
  await userEvent.type(input, "1145");
  await userEvent.tab();
  await waitFor(() => expect(input.value).toBe("11:45"));

  // 日本語表記
  await userEvent.click(input);
  await userEvent.clear(input);
  await userEvent.type(input, "12時15分");
  await userEvent.tab();
  await waitFor(() => expect(input.value).toBe("12:15"));

  // 存在しない時刻は元の値に戻る
  await userEvent.click(input);
  await userEvent.clear(input);
  await userEvent.type(input, "25:00");
  await userEvent.tab();
  await waitFor(() => expect(input.value).toBe("12:15"));

  // minuteInterval の刻みに合わない時刻は元の値に戻る
  await userEvent.click(input);
  await userEvent.clear(input);
  await userEvent.type(input, "10:07");
  await userEvent.tab();
  await waitFor(() => expect(input.value).toBe("12:15"));

  // 空にして確定すると未入力になる
  await userEvent.click(input);
  await userEvent.clear(input);
  await userEvent.tab();
  await waitFor(() => expect(input.value).toBe(""));
};
