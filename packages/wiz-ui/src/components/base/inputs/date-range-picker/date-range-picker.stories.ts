import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn, Meta } from "@storybook/vue";
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import WizDateRangePicker from "./date-range-picker.vue";
import { DateRange } from "./types";

export default {
  title: "Base/Input/DateRangePicker",
  component: WizDateRangePicker,
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
    selectBoxOptions: {
      control: {
        type: "array",
      },
    },
    onDateSelected: {
      action: "update:value",
    },
    onSelectBoxValueChange: {
      action: "updateSelectBoxValue",
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

const Template: StoryFn<typeof WizDateRangePicker> = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizDateRangePicker },
  setup() {
    const dateRange = ref<DateRange>({
      start: null,
      end: null,
    });
    const selectBoxValue = ref<string>();
    const handleSelectBoxValueChange = (value: string) => {
      selectBoxValue.value = value;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      args.onSelectBoxValueChange(value);
    };
    const isOpen = ref(true);
    const updateIsOpen = (value: boolean) => {
      isOpen.value = value;
    };

    return {
      dateRange,
      selectBoxValue,
      handleSelectBoxValueChange,
      isOpen,
      updateIsOpen,
    };
  },
  template: `
    <div>
      <WizDateRangePicker
        v-bind="$props" 
        v-model="dateRange"
        @input="onDateSelected" 
        @updateSelectBoxValue="onSelectBoxValueChange"
        :isOpen="isOpen"
        @updateIsOpen="updateIsOpen"  
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
import { WizDateRangePicker } from "@wizleap-inc/wiz-ui";
import { DateRange, DateRangePickerSelectBoxOption } from "@wizleap-inc/wiz-ui/dist/components/base/inputs/range-datepicker/types";

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
      ? ' :selectBoxOptions="selectBoxOptions" :selectBoxValue="selectBoxValue" @updateSelectBoxValue="selectBoxValue = $event"'
      : "")
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

export const SelectBoxOptions = Template.bind({});
SelectBoxOptions.args = {
  value: {
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

export const InitialValue: StoryFn<typeof WizDateRangePicker> = (
  args,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
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
    const isOpen1 = ref<boolean>(true);
    const isOpen2 = ref<boolean>(true);
    const isOpen3 = ref<boolean>(true);
    const setIsOpen1 = (value: boolean) => (isOpen1.value = value);
    const setIsOpen2 = (value: boolean) => (isOpen2.value = value);
    const setIsOpen3 = (value: boolean) => (isOpen3.value = value);

    const selectBoxValue = ref<string>();
    const handleSelectBoxValueChange = (value: string) => {
      selectBoxValue.value = value;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      args.onSelectBoxValueChange(value);
    };
    return {
      dateRange1,
      dateRange2,
      dateRange3,
      selectBoxValue,
      handleSelectBoxValueChange,
      isOpen1,
      isOpen2,
      isOpen3,
      setIsOpen1,
      setIsOpen2,
      setIsOpen3,
    };
  },
  template: ` 
    <div style="display: flex; gap: 15rem; flex-direction: column">
      <WizDateRangePicker 
        v-model="dateRange1" 
        :selectBoxValue="selectBoxValue" 
        :selectBoxOptions="selectBoxOptions" 
        @input="onDateSelected" 
        @updateSelectBoxValue="handleSelectBoxValueChange"
        :isOpen="isOpen1"
        @updateIsOpen="setIsOpen1"
      />
      <WizDateRangePicker
        v-model="dateRange2"
        :selectBoxValue="selectBoxValue"
        :selectBoxOptions="selectBoxOptions"
        @input="onDateSelected"
        @updateSelectBoxValue="handleSelectBoxValueChange"
        :isOpen="isOpen2"
        @updateIsOpen="setIsOpen2"
      />
      <WizDateRangePicker
        v-model="dateRange3"
        :selectBoxValue="selectBoxValue"  
        :selectBoxOptions="selectBoxOptions"
        @input="onDateSelected"
        @updateSelectBoxValue="handleSelectBoxValueChange"
        :isOpen="isOpen3"
        @updateIsOpen="setIsOpen3"
      />
    </div>
  `,
});
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

export const Test: StoryFn<typeof WizDateRangePicker> = (
  args,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
  components: { WizDateRangePicker },
  setup() {
    const dateRange = ref<DateRange>({
      start: null,
      end: null,
    });
    const selectBoxValue = ref<string>();
    const handleSelectBoxValueChange = (value: string) => {
      selectBoxValue.value = value;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      args.onSelectBoxValueChange(value);
    };
    const isOpen = ref(false);
    const updateIsOpen = (value: boolean) => {
      isOpen.value = value;
    };
    return {
      dateRange,
      selectBoxValue,
      selectBoxOptions,
      handleSelectBoxValueChange,
      isOpen,
      updateIsOpen,
    };
  },
  template: `
    <div>
      <WizDateRangePicker 
        v-model="dateRange" 
        :selectBoxValue="selectBoxValue" 
        :selectBoxOptions="selectBoxOptions" 
        @input="onDateSelected" 
        @updateSelectBoxValue="handleSelectBoxValueChange" 
        :isOpen="isOpen"
        @updateIsOpen="updateIsOpen"  
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
  // 選択済みなボタンがrightClickedDate ~ leftClickedDateの間の数だけあることを確認
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
