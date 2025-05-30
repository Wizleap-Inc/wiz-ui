import { expect, userEvent, waitFor, within } from "@storybook/test";
import { Meta, StoryFn } from "@storybook/vue3";
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import WizDateRangePicker from "./date-range-picker.vue";
import { DateRange } from "./types";

export default {
  title: "Base/Input/DateRangePicker",
  component: WizDateRangePicker,
  argTypes: {
    modelValue: {
      control: {
        type: "object",
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
    selectBoxOptions: {
      control: {
        type: "object",
      },
    },
    onDateSelected: {
      action: "update:modelValue",
    },
    onSelectBoxValueChange: {
      action: "update:selectBoxValue",
    },
    isDirectionFixed: {
      control: { type: "boolean" },
    },
    variant: {
      control: { type: "select" },
      options: ["regular", "mini"],
    },
  },
  parameters: {
    screenshot: {
      viewports: {
        large: {
          width: 1024,
          height: 768,
        },
      },
    },
  },
} as Meta<typeof WizDateRangePicker>;

const Template: StoryFn<typeof WizDateRangePicker> = (args) => ({
  components: { WizDateRangePicker },
  setup: () => {
    const dateRange = ref<DateRange>({
      start: new Date(2020, 0, 15),
      end: new Date(2020, 1, 15),
    });
    const isOpen = ref(true);
    const updateIsOpen = (value: boolean) => {
      isOpen.value = value;
    };
    const selectBoxValue = ref("");
    const updateSelectBoxValue = (value: string) => {
      args["onUpdate:selectBoxValue"]?.(value);
      selectBoxValue.value = value;
      args["onUpdate:selectBoxValue"]?.(value);
    };
    return {
      args,
      dateRange,
      isOpen,
      updateIsOpen,
      selectBoxValue,
      updateSelectBoxValue,
    };
  },
  template: `
    <div>
      <WizDateRangePicker
        v-bind="args"
        v-model="dateRange"
        :isOpen="isOpen"
        :selectBoxValue="selectBoxValue"
        @update:modelValue="args.onDateSelected"
        @update:selectBoxValue="updateSelectBoxValue"
        @update:isOpen="updateIsOpen"
      />
    </div>
  `,
});

interface Props {
  isOpen: boolean;
  disabled: boolean;
  expand: boolean;
  selectBoxOptions: boolean;
  isDirectionFixed: boolean;
  disabledDate: (date: Date) => boolean;
}

const CODE_TEMPLATE = (props: Partial<Props>) => `
<script setup lang="ts">
import { ref } from "vue";
import { WizDateRangePicker } from "@wizleap-inc/wiz-ui-next";
import { DateRange, DateRangePickerSelectBoxOption } from "@wizleap-inc/wiz-ui-next/dist/components/base/inputs/range-datepicker/types";

const dateRange = ref<DateRange>({
  start: null,
  end: null,
});
${
  props.selectBoxOptions
    ? `const selectBoxOptions = ref<DateRangePickerSelectBoxOption[]>([
  { label: '選択肢1', value: '1' },
  { label: '選択肢2', value: '2' },
  { label: '選択肢3', value: '3' },
]);

const selectBoxValue = ref('');
`
    : ""
}
</script>
<template>
  <WizDateRangePicker v-model="dateRange"${
    (props.disabled ? " disabled" : "") +
    (props.expand ? " expand" : "") +
    (props.selectBoxOptions
      ? ' :selectBoxOptions="selectBoxOptions" v-model:selectBoxValue="selectBoxValue"'
      : "") +
    (props.isDirectionFixed ? ' :isDirectionFixed="true"' : "")
  }/>
</template>
`;

export const Default = Template.bind({});
Default.args = {
  modelValue: {
    start: new Date(2020, 0, 15),
    end: new Date(2020, 1, 15),
  },
};
Default.parameters = {
  docs: {
    description: {
      component: `
### WizDateRangePicker
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
  modelValue: {
    start: new Date(2020, 0, 15),
    end: new Date(2020, 1, 15),
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

export const DisabledWithValue: StoryFn<typeof WizDateRangePicker> = (
  args
) => ({
  components: { WizDateRangePicker },
  setup() {
    return {
      args,
    };
  },
  template: `
    <div style="display: flex; gap: 20rem; flex-direction: column; height: 90rem">
      <WizDateRangePicker v-bind="args" />
    </div>
  `,
});

DisabledWithValue.args = {
  modelValue: {
    start: new Date(2000, 0, 15),
    end: new Date(2000, 1, 15),
  },
  disabled: true,
};

export const DisabledDate = Template.bind({});
DisabledDate.args = {
  modelValue: {
    start: new Date(2020, 0, 15),
    end: new Date(2020, 1, 15),
  },
  disabledDate: (date: Date) => date.getDate() >= 2 && date.getDate() < 7,
};
DisabledDate.parameters = {
  docs: {
    description: {
      story: "disabledをtrueにすると、入力ができなくなります。",
    },
    source: {
      code: CODE_TEMPLATE({
        isOpen: true,
        disabledDate: (date: Date) => date.getDate() >= 2 && date.getDate() < 7,
      }),
    },
  },
};

export const Expand = Template.bind({});
Expand.args = {
  modelValue: {
    start: new Date(2020, 0, 15),
    end: new Date(2020, 1, 15),
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

export const SelectBoxOptions = Template.bind({});
SelectBoxOptions.args = {
  modelValue: {
    start: new Date(2020, 0, 15),
    end: new Date(2020, 1, 15),
  },
  selectBoxOptions: [
    { label: "選択肢1", value: "1" },
    { label: "選択肢2", value: "2" },
    { label: "選択肢3", value: "3" },
  ],
};
SelectBoxOptions.parameters = {
  docs: {
    description: {
      story:
        "selectBoxOptionsを渡すと、セレクトボックスを使った入力日の種類の切り替えができます。",
    },
    source: {
      code: CODE_TEMPLATE({ selectBoxOptions: true }),
    },
  },
};

export const IsDirectionFixed = Template.bind({});
IsDirectionFixed.args = {
  modelValue: {
    start: new Date(2020, 0, 15),
    end: new Date(2020, 1, 15),
  },
  isDirectionFixed: true,
};
IsDirectionFixed.parameters = {
  docs: {
    description: {
      story: `isDirectionFixedを設定することで、Popup の表示位置を固定することができます。`,
    },
    source: {
      code: CODE_TEMPLATE({ isDirectionFixed: true }),
    },
  },
};

export const Mini = Template.bind({});
Mini.args = {
  modelValue: {
    start: new Date(2020, 0, 15),
    end: new Date(2020, 1, 15),
  },
  isDirectionFixed: true,
  variant: "mini",
};

const _formatDateJp = (date: Date) =>
  `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

const selectBoxOptions = [
  { label: "選択肢1選択肢1", value: "1" },
  { label: "選択肢2選択肢2", value: "2" },
  { label: "選択肢3選択肢3", value: "3" },
];

export const InitialValueRange: StoryFn<typeof WizDateRangePicker> = (
  args
) => ({
  components: { WizDateRangePicker },
  setup() {
    const dateRange1 = ref<DateRange>({
      start: new Date(2000, 0, 15),
      end: new Date(2000, 1, 15),
    });
    const selectBoxValue1 = ref<string>();
    const isOpen1 = ref(true);
    const setIsOpen1 = (value: boolean) => (isOpen1.value = value);
    return {
      dateRange1,
      selectBoxValue1,
      selectBoxOptions,
      isOpen1,
      setIsOpen1,
      args,
    };
  },
  template: `
    <div style="display: flex; gap: 20rem; flex-direction: column; height: 90rem">
      <WizDateRangePicker
        v-bind="args"
        v-model="dateRange1"
        v-model:selectBoxValue="selectBoxValue1"
        :selectBoxOptions="selectBoxOptions"
        @update:modelValue="args.onDateSelected"
        @update:selectBoxValue="args.onSelectBoxValueChange"
        :isOpen="isOpen1"
        @update:isOpen="setIsOpen1"
      />
    </div>
  `,
});

export const InitialValueRange2: StoryFn<typeof WizDateRangePicker> = (
  args
) => ({
  components: { WizDateRangePicker },
  setup() {
    const dateRange1 = ref<DateRange>({
      start: new Date(2000, 0, 15),
      end: new Date(2000, 0, 15),
    });
    const selectBoxValue1 = ref<string>();
    const isOpen1 = ref(true);
    const setIsOpen1 = (value: boolean) => (isOpen1.value = value);
    return {
      dateRange1,
      selectBoxValue1,
      selectBoxOptions,
      isOpen1,
      setIsOpen1,
      args,
    };
  },
  template: `
    <div style="display: flex; gap: 20rem; flex-direction: column; height: 90rem">
      <WizDateRangePicker
        v-bind="args"
        v-model="dateRange1"
        v-model:selectBoxValue="selectBoxValue1"
        :selectBoxOptions="selectBoxOptions"
        @update:modelValue="args.onDateSelected"
        @update:selectBoxValue="args.onSelectBoxValueChange"
        :isOpen="isOpen1"
        @update:isOpen="setIsOpen1"
      />
    </div>
  `,
});

export const InitialValueStart: StoryFn<typeof WizDateRangePicker> = (
  args
) => ({
  components: { WizDateRangePicker },
  setup() {
    const dateRange3 = ref<DateRange>({
      start: new Date(2000, 0, 15),
      end: null,
    });
    const selectBoxValue3 = ref<string>();
    const isOpen3 = ref(true);
    const setIsOpen3 = (value: boolean) => (isOpen3.value = value);
    return {
      dateRange3,
      selectBoxValue3,
      selectBoxOptions,
      isOpen3,
      setIsOpen3,
      args,
    };
  },
  template: `
    <div style="display: flex; gap: 20rem; flex-direction: column; height: 90rem">
      <WizDateRangePicker
        v-bind="args"
        v-model="dateRange3"
        v-model:selectBoxValue="selectBoxValue3"
        :selectBoxOptions="selectBoxOptions"
        @update:modelValue="args.onDateSelected"
        @update:selectBoxValue="args.onSelectBoxValueChange"
        :isOpen="isOpen3"
        @update:isOpen="setIsOpen3"
      />
    </div>
  `,
});

export const Hover: StoryFn<typeof WizDateRangePicker> = (args) => ({
  components: { WizDateRangePicker },
  setup() {
    const dateRange = ref<DateRange>({
      start: new Date(2020, 0, 15),
      end: new Date(2020, 1, 15),
    });
    const selectBoxValue = ref<string>();

    const isOpen = ref(true);
    const isHover = ref(true);
    const updateIsOpen = (value: boolean) => {
      isOpen.value = value;
    };
    const updateIsHover = (value: boolean) => {
      isHover.value = value;
    };
    return {
      dateRange,
      selectBoxValue,
      selectBoxOptions,
      isOpen,
      isHover,
      updateIsOpen,
      updateIsHover,
      args,
    };
  },
  template: `
    <div>
      <WizDateRangePicker

        v-bind="args"
        v-model="dateRange"
        v-model:selectBoxValue="selectBoxValue"
        :selectBoxOptions="selectBoxOptions"
        :isOpen="isOpen"
        :isHover="isHover"
        @update:modelValue="args.onDateSelected"
        @update:isOpen="updateIsOpen"
        @update:isHover="updateIsHover"
        @update:selectBoxValue="args.onSelectBoxValueChange"
      />
    </div>
  `,
});

export const Test: StoryFn<typeof WizDateRangePicker> = (args) => ({
  components: { WizDateRangePicker },
  setup() {
    const dateRange = ref<DateRange>({
      start: new Date(2000, 1, 0),
      end: new Date(2000, 2, 0),
    });
    const selectBoxValue = ref<string>();

    const isOpen = ref(true);
    const isHover = ref(false);
    const updateIsOpen = (value: boolean) => {
      isOpen.value = value;
    };
    const updateIsHover = (value: boolean) => {
      isHover.value = value;
    };
    return {
      dateRange,
      selectBoxValue,
      selectBoxOptions,
      isOpen,
      isHover,
      updateIsOpen,
      updateIsHover,
      args,
    };
  },
  template: `
    <div>
      <WizDateRangePicker
        v-bind="args"
        v-model="dateRange"
        v-model:selectBoxValue="selectBoxValue"
        :selectBoxOptions="selectBoxOptions"
        :isOpen="isOpen"
        :isHover="isHover"
        @update:modelValue="args.onDateSelected"
        @update:isOpen="updateIsOpen"
        @update:isHover="updateIsHover"
        @update:selectBoxValue="args.onSelectBoxValueChange"
      />
    </div>
  `,
});
Test.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT);
  await userEvent.click(button);
  await waitFor(() => expect(button).toHaveFocus());

  const intermediateDate = new Date(2000, 1, 1);

  //左のCalenderから15日を選択
  const body = within(canvasElement.ownerDocument.body);
  const initialLeftDate = new Date(
    intermediateDate.getFullYear(),
    intermediateDate.getMonth(),
    0
  );
  const initialRightDate = new Date(
    intermediateDate.getFullYear(),
    intermediateDate.getMonth() + 1,
    0
  );
  const leftClickDate = new Date(
    intermediateDate.getFullYear(),
    intermediateDate.getMonth() - 1,
    15
  );
  const leftClickedDateEl = body.getByLabelText(_formatDateJp(leftClickDate));
  await userEvent.click(leftClickedDateEl);
  // 選択済みというラベルがついていることを確認
  await waitFor(() =>
    expect(leftClickedDateEl).toHaveAttribute(
      "aria-label",
      `${_formatDateJp(leftClickDate)}-選択済み`
    )
  );

  // クリックした段階ではまだInputに反映されていないこと
  await waitFor(() =>
    expect(button.textContent).toBe(
      `${_formatDateJp(initialLeftDate)}-${_formatDateJp(initialRightDate)}`
    )
  );

  // 適用ボタンをクリック
  const applyButton = body.getByText(ARIA_LABELS.APPLY);
  await userEvent.click(applyButton);

  // Input内が選択した日付になることを確認
  await waitFor(() =>
    expect(button.textContent).toBe(_formatDateJp(leftClickDate) + "-終了日")
  );

  // カレンダー再オープン
  await userEvent.click(button);

  // 右のCalenderから15日を選択
  const rightClickDate = new Date(
    intermediateDate.getFullYear(),
    intermediateDate.getMonth(),
    15
  );
  const rightClickedDateEl = body.getByLabelText(_formatDateJp(rightClickDate));
  await userEvent.click(rightClickedDateEl);
  // 選択済みというラベルがついていることを確認
  await waitFor(() =>
    expect(rightClickedDateEl).toHaveAttribute(
      "aria-label",
      `${_formatDateJp(rightClickDate)}-選択済み`
    )
  );
  // クリックした段階ではまだInputに反映されていないこと
  await waitFor(() =>
    expect(button.textContent).toBe(_formatDateJp(leftClickDate) + "-終了日")
  );

  // 適用ボタンをクリック
  await userEvent.click(applyButton);

  // Input内が選択した日付になることを確認
  await waitFor(() =>
    expect(button.textContent?.replace(/\s+/g, "")).toBe(
      `${_formatDateJp(leftClickDate)}-${_formatDateJp(rightClickDate)}`
    )
  );

  // カレンダー再オープン
  await userEvent.click(button);

  // data-is-selectedなボタンがrightClickedDate ~ leftClickedDateの間の数だけあることを確認
  const diff = Math.floor(
    (rightClickDate.getTime() - leftClickDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const selectedDates = body.getAllByLabelText((label) =>
    label.includes("選択済み")
  );
  expect(selectedDates.length).toBe(diff + 1);

  // 二ヶ月前のカレンダーに移動すると、選択済みのボタンがなくなることを確認
  const leftMonthButton = body.getByLabelText("前の月へ");
  // wait for double click
  await waitFor(async () => {
    await userEvent.click(leftMonthButton);
    await userEvent.click(leftMonthButton);
  });
  const selectedDatesAfterLeftClick = body.queryAllByLabelText((label) =>
    label.includes("選択済み")
  );
  await waitFor(() => expect(selectedDatesAfterLeftClick.length).toBe(0));

  // 二ヶ月後のカレンダーに移動すると、選択済みのボタンがあることを確認
  const rightMonthButton = body.getByLabelText("次の月へ");
  // wait for double click
  await waitFor(async () => {
    await userEvent.click(rightMonthButton);
    await userEvent.click(rightMonthButton);
  });
  const selectedDatesAfterRightClick = body.queryAllByLabelText((label) =>
    label.includes("選択済み")
  );
  await waitFor(() =>
    expect(selectedDatesAfterRightClick.length).toBe(diff + 1)
  );

  await userEvent.click(button);
  await userEvent.tab();
  await userEvent.tab();
};

export const Today: StoryFn<typeof WizDateRangePicker> = (args) => ({
  components: { WizDateRangePicker },
  setup() {
    const dateRange1 = ref<DateRange>({
      start: new Date(2000, 0, 15),
      end: new Date(2000, 1, 15),
    });
    const selectBoxValue1 = ref<string>();
    const isOpen1 = ref(true);
    const setIsOpen1 = (value: boolean) => (isOpen1.value = value);
    const today = new Date(2000, 0, 28);
    return {
      dateRange1,
      selectBoxValue1,
      selectBoxOptions,
      isOpen1,
      setIsOpen1,
      today,
      args,
    };
  },
  template: `
    <div style="display: flex; gap: 20rem; flex-direction: column; height: 90rem">
      <WizDateRangePicker
        v-model="dateRange1"
        v-model:selectBoxValue="selectBoxValue1"
        :selectBoxOptions="selectBoxOptions"
        @update:modelValue="args.onDateSelected"
        @update:selectBoxValue="args.onSelectBoxValueChange"
        :isOpen="isOpen1"
        @update:isOpen="setIsOpen1"
        :_today="today"
      />
    </div>
  `,
});

export const DisabledToday: StoryFn<typeof WizDateRangePicker> = (args) => ({
  components: { WizDateRangePicker },
  setup() {
    const dateRange1 = ref<DateRange>({
      start: new Date(2000, 0, 15),
      end: new Date(2000, 1, 15),
    });
    const selectBoxValue1 = ref<string>();
    const isOpen1 = ref(true);
    const setIsOpen1 = (value: boolean) => (isOpen1.value = value);
    const today = new Date(2000, 0, 28);
    const disabledDate = (date: Date) =>
      date.getDate() >= 20 && date.getDate() < 31;
    return {
      dateRange1,
      selectBoxValue1,
      selectBoxOptions,
      isOpen1,
      setIsOpen1,
      today,
      disabledDate,
      args,
    };
  },
  template: `
    <div style="display: flex; gap: 20rem; flex-direction: column; height: 90rem">
      <WizDateRangePicker
        v-model="dateRange1"
        v-model:selectBoxValue="selectBoxValue1"
        :selectBoxOptions="selectBoxOptions"
        @update:modelValue="args.onDateSelected"
        @update:selectBoxValue="args.onSelectBoxValueChange"
        :isOpen="isOpen1"
        @update:isOpen="setIsOpen1"
        :_today="today"
        :disabledDate="disabledDate"
      />
    </div>
  `,
});
