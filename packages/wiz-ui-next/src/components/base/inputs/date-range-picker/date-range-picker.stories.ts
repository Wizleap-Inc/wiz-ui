import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn, Meta } from "@storybook/vue3";
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
    selectBoxOptions: {
      control: {
        type: "array",
      },
    },
    onDateSelected: {
      action: "update:modelValue",
    },
    onSelectBoxValueChange: {
      action: "update:selectBoxValue",
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
      start: null,
      end: null,
    });
    const isOpen = ref(true);
    const updateIsOpen = (value: boolean) => {
      isOpen.value = value;
    };
    return {
      args,
      dateRange,
      isOpen,
      updateIsOpen,
    };
  },
  template: `
    <div>
      <WizDateRangePicker 
        v-bind="args" 
        v-model="dateRange"
        :isOpen="isOpen"
        @update:modelValue="args.onDateSelected"
        @update:selectBoxValue="args.onSelectBoxValueChange"
        @update:isOpen="updateIsOpen"
      />
    </div>
  `,
});

interface Props {
  disabled: boolean;
  expand: boolean;
  selectBoxOptions: boolean;
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
      : "")
  }/>
</template>
`;

export const Default = Template.bind({});
Default.args = {
  modelValue: {
    start: null,
    end: null,
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
  modelValue: {
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

export const SelectBoxOptions = Template.bind({});
SelectBoxOptions.args = {
  modelValue: {
    start: null,
    end: null,
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

const _formatDateJp = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

const selectBoxOptions = [
  { label: "選択肢1選択肢1", value: "1" },
  { label: "選択肢2選択肢2", value: "2" },
  { label: "選択肢3選択肢3", value: "3" },
];

export const InitialValue: StoryFn<typeof WizDateRangePicker> = (args) => ({
  components: { WizDateRangePicker },
  setup() {
    const dateRange1 = ref<DateRange>({
      start: new Date(2000, 0, 15),
      end: new Date(2000, 1, 15),
    });
    const dateRange2 = ref<DateRange>({
      start: null,
      end: new Date(2000, 1, 15),
    });
    const dateRange3 = ref<DateRange>({
      start: new Date(2000, 0, 15),
      end: null,
    });
    const selectBoxValue1 = ref<string>();
    const selectBoxValue2 = ref<string>();
    const selectBoxValue3 = ref<string>();
    const isOpen1 = ref(true);
    const isOpen2 = ref(true);
    const isOpen3 = ref(true);
    const setIsOpen1 = (value: boolean) => (isOpen1.value = value);
    const setIsOpen2 = (value: boolean) => (isOpen2.value = value);
    const setIsOpen3 = (value: boolean) => (isOpen3.value = value);
    return {
      dateRange1,
      dateRange2,
      dateRange3,
      selectBoxValue1,
      selectBoxValue2,
      selectBoxValue3,
      selectBoxOptions,
      isOpen1,
      isOpen2,
      isOpen3,
      setIsOpen1,
      setIsOpen2,
      setIsOpen3,
      args,
    };
  },
  template: `
    <div style="display: flex; gap: 20rem; flex-direction: column; height: 90rem"> 
      <div style="display: flex; gap: 20rem; flex-direction: row; width: 90rem;">
        <WizDateRangePicker 
          v-model="dateRange1"
          v-model:selectBoxValue="selectBoxValue1"
          :selectBoxOptions="selectBoxOptions"
          @update:modelValue="args.onDateSelected"
          @update:selectBoxValue="args.onSelectBoxValueChange"
          :isOpen="isOpen1"
          @update:isOpen="setIsOpen1"
        />
      </div>
      <div style="display: flex; gap: 20rem; flex-direction: row; width: 90rem;">
        <WizDateRangePicker
          v-model="dateRange2"
          v-model:selectBoxValue="selectBoxValue2"
          :selectBoxOptions="selectBoxOptions"
          @update:modelValue="args.onDateSelected"
          @update:selectBoxValue="args.onSelectBoxValueChange"
          :isOpen="isOpen2"
          @update:isOpen="setIsOpen2"
        />
        <WizDateRangePicker
          v-model="dateRange3"
          v-model:selectBoxValue="selectBoxValue3"
          :selectBoxOptions="selectBoxOptions"
          @update:modelValue="args.onDateSelected"
          @update:selectBoxValue="args.onSelectBoxValueChange"
          :isOpen="isOpen3"
          @update:isOpen="setIsOpen3"
        />
      </div>
    </div>
  `,
});
export const Test: StoryFn<typeof WizDateRangePicker> = (args) => ({
  components: { WizDateRangePicker },
  setup() {
    const dateRange = ref<DateRange>({
      start: null,
      end: null,
    });
    const selectBoxValue = ref<string>();

    const isOpen = ref(true);
    const updateIsOpen = (value: boolean) => {
      isOpen.value = value;
    };
    return {
      dateRange,
      selectBoxValue,
      selectBoxOptions,
      isOpen,
      updateIsOpen,
      args,
    };
  },
  template: `
    <div>
      <WizDateRangePicker 
        v-model="dateRange"
        v-model:selectBoxValue="selectBoxValue"
        :selectBoxOptions="selectBoxOptions"
        @update:modelValue="args.onDateSelected"
        @update:selectBoxValue="args.onSelectBoxValueChange"
        :isOpen="isOpen"
        @update:isOpen="updateIsOpen"
      />
    </div>
  `,
});
Test.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByLabelText(ARIA_LABELS.RANGE_DATE_PICKER_INPUT);
  await userEvent.click(button);
  await waitFor(() => expect(button).toHaveFocus());

  const date = new Date();

  //左のCalenderから15日を選択
  const body = within(canvasElement.ownerDocument.body);
  const leftClickDate = new Date(date.getFullYear(), date.getMonth() - 1, 15);
  const leftClickedDateEl = body.getByLabelText(_formatDateJp(leftClickDate));
  await userEvent.click(leftClickedDateEl);
  // 選択済みというラベルがついていることを確認
  await waitFor(() =>
    expect(leftClickedDateEl).toHaveAttribute(
      "aria-label",
      `${_formatDateJp(leftClickDate)}-選択済み`
    )
  );
  // Input内が選択した日付になることを確認
  await waitFor(() =>
    expect(button.textContent).toBe(
      `${leftClickDate.getMonth() + 1}/${leftClickDate.getDate()}-終了日`
    )
  );

  // 右のCalenderから15日を選択
  const rightClickDate = new Date(date.getFullYear(), date.getMonth(), 15);
  const rightClickedDateEl = body.getByLabelText(_formatDateJp(rightClickDate));
  await userEvent.click(rightClickedDateEl);
  // 選択済みというラベルがついていることを確認
  await waitFor(() =>
    expect(rightClickedDateEl).toHaveAttribute(
      "aria-label",
      `${_formatDateJp(rightClickDate)}-選択済み`
    )
  );
  // Input内が選択した日付になることを確認
  await waitFor(() =>
    expect(button.textContent).toBe(
      `${leftClickDate.getMonth() + 1}/${leftClickDate.getDate()}-${
        rightClickDate.getMonth() + 1
      }/${rightClickDate.getDate()}`
    )
  );
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
};
