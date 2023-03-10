import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn, Meta } from "@storybook/vue3";
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import WizRangeDatePicker from "./range-date-picker.vue";
import { DateRange } from "./types";

export default {
  title: "Base/Input/RangeDatePicker",
  component: WizRangeDatePicker,
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
    onClick: {
      action: "update:modelValue",
    },
  },
} as Meta<typeof WizRangeDatePicker>;

const Template: StoryFn<typeof WizRangeDatePicker> = (args) => ({
  components: { WizRangeDatePicker },
  setup: () => ({ args }),
  template: `
    <div>
      <WizRangeDatePicker v-bind="args" @update:modelValue="args.onClick"/>
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
  <WizRangeDatePicker :modelValue="dateRange"${
    (props.disabled ? ' :disabled="true"' : "") +
    (props.expand ? " expand" : "")
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

const _formatDateJp = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

export const Test: StoryFn<typeof WizRangeDatePicker> = (args) => ({
  components: { WizRangeDatePicker },
  setup() {
    const dateRange = ref<DateRange>({
      start: null,
      end: null,
    });
    return { dateRange, args };
  },
  template: `
    <div>
      <WizRangeDatePicker v-model="dateRange" @update:modelValue="args.onClick"/>
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
