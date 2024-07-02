import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { Meta, StoryFn } from "@storybook/vue3";
import { ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import { WizHStack } from "@/components";

import WizDatepicker from "./date-picker.vue";

export default {
  title: "Base/Input/Datepicker",
  component: WizDatepicker,
  argTypes: {
    modelValue: {
      control: {
        type: "date",
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
    onClick: {
      action: "update:modelValue",
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    isDirectionFixed: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizDatepicker>;

const Template: StoryFn<typeof WizDatepicker> = (args) => ({
  components: { WizDatepicker, WizHStack },
  setup() {
    const date = ref<Date | null>(new Date(2020, 0, 1));
    const isOpen = ref(true);
    const setIsOpen = (value: boolean) => (isOpen.value = value);
    return { args, date, isOpen, setIsOpen };
  },
  template: ` 
    <WizDatepicker
      v-bind="args"
      v-model="date"
      :isOpen="isOpen"
      @update:modelValue="args.onClick"
      @update:isOpen="setIsOpen"
    /> 
  `,
});

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      component: `
### Datepicker
Datepickerは、日付を選択するためのコンポーネントで、CalenderにInputを組み合わせることでできたコンポーネントです。
各状態はMockしてあるため実際の動作とは異なります。もし実際の動作を試したい場合、Test Storyをご覧ください。

**valueの型はDate | nullです。**初期値を設定したい場合、Placeholderをみせたい（空にしたい）場合はnullを設定してください。
`,
    },
    source: {
      code: `
<script setup lang="ts">
import { ref } from "vue";
import { WizDatepicker } from "@wizleap-inc/wiz-ui";

const date = ref<Date | null>(null);
</script>
<template>
  <WizDatepicker v-model="date" />
</template>
  `,
    },
  },
};

const PlaceholderTemplate: StoryFn<typeof WizDatepicker> = (args) => ({
  components: { WizDatepicker, WizHStack },
  setup() {
    const date = ref<Date | null>(null);
    const isOpen = ref(false);
    const setIsOpen = (value: boolean) => (isOpen.value = value);
    return { args, date, isOpen, setIsOpen };
  },
  template: ` 
    <WizDatepicker
      v-bind="args"
      v-model="date"
      :isOpen="isOpen"
      @update:modelValue="args.onClick"
      @update:isOpen="setIsOpen"
    /> 
  `,
});

export const Placeholder = PlaceholderTemplate.bind({});
Placeholder.args = {
  placeholder: "(例) 2000/1/1",
};
Placeholder.parameters = {
  docs: {
    description: {
      story: `Placeholderを設定することができます。Defaultでは「日付を選択」が設定されています。`,
    },
    source: {
      code: `
<script setup lang="ts">
import { ref } from "vue";
import { WizDatepicker } from "@wizleap-inc/wiz-ui";

const date = ref<Date | null>(null);
</script>
<template>
  <WizDatepicker v-model="date" placeholder="(例) 2000/1/1" />
</template>
  `,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story: `Disabledを設定することができます。`,
    },
    source: {
      code: `
<script setup lang="ts">
import { ref } from "vue";
import { WizDatepicker } from "@wizleap-inc/wiz-ui";

const date = ref<Date | null>(null);
</script>
<template>
  <WizDatepicker v-model="date" disabled />
</template>
  `,
    },
  },
};

export const Expand = Template.bind({});
Expand.args = {
  width: "100%",
};

export const DisabledDate: StoryFn<typeof WizDatepicker> = (args) => ({
  components: { WizDatepicker, WizHStack },
  setup() {
    const date = ref<Date | null>(new Date(1990, 0, 1));
    const isOpen = ref(true);
    const setIsOpen = (value: boolean) => (isOpen.value = value);
    const disabledDate = (date: Date) =>
      date.getDate() >= 10 && date.getDate() < 17;
    return { args, date, isOpen, setIsOpen, disabledDate };
  },
  template: ` 
    <WizDatepicker
      v-bind="args"
      v-model="date"
      :isOpen="isOpen"
      :disabledDate="disabledDate"
      @update:modelValue="args.onClick"
      @update:isOpen="setIsOpen"
    /> 
  `,
});

export const InitialValue: StoryFn<typeof WizDatepicker> = (args) => ({
  components: { WizDatepicker, WizHStack },
  setup() {
    const date = ref<Date | null>(new Date(2020, 0, 1));
    const isOpen = ref(true);
    const setIsOpen = (value: boolean) => (isOpen.value = value);
    return { args, date, isOpen, setIsOpen };
  },
  template: ` 
    <WizDatepicker
      v-bind="args"
      v-model="date"
      :isOpen="isOpen"
      @update:modelValue="args.onClick"
      @update:isOpen="setIsOpen"
    />
  `,
});

export const YearStyle: StoryFn<typeof WizDatepicker> = (args) => ({
  components: { WizDatepicker, WizHStack },
  setup() {
    const date = ref<Date | null>(new Date(2020, 0, 1));
    const isOpen = ref(true);
    const setIsOpen = (value: boolean) => (isOpen.value = value);
    return { args, date, isOpen, setIsOpen };
  },
  template: `
    <WizDatepicker
      v-bind="args"
      v-model="date"
      :isOpen="isOpen"
      @update:modelValue="args.onClick"
      @update:isOpen="setIsOpen"
    />
  `,
});
YearStyle.args = {
  formatYear: (year: number) => `西暦${year}`,
};

const _formatDateSlash = (date: Date) => {
  const year = (date.getFullYear() % 100).toString().padStart(2, "0");
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
};

const _formatDateJp = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

const _formatDateJpMonth = (date: Date) => {
  const month = date.getMonth() + 1;
  return `${month}月`;
};

export const Test: StoryFn<typeof WizDatepicker> = (args) => ({
  components: { WizDatepicker, WizHStack },
  setup() {
    const date = ref<Date | null>(new Date(2000, 0, 1));
    const isOpen = ref(true);
    const isHover = ref(false);
    const updateIsOpen = (value: boolean) => (isOpen.value = value);
    const updateIsHover = (value: boolean) => (isHover.value = value);
    return { args, date, isOpen, updateIsOpen, isHover, updateIsHover };
  },
  template: `
    <WizDatepicker
      v-bind="args"
      v-model="date"
      :isOpen="isOpen"
      :isHover="isHover"
      @update:modelValue="args.onClick"
      @update:isOpen="updateIsOpen"
      @update:isHover="updateIsHover"
    />
  `,
});
Test.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByLabelText(ARIA_LABELS.DATE_PICKER_INPUT);
  await userEvent.click(button);
  await waitFor(() => expect(button).toHaveFocus());

  const date = new Date(2000, 1, 0);

  // その月の15日を選択
  const body = within(canvasElement.ownerDocument.body);
  const clickDate = new Date(date.getFullYear(), date.getMonth(), 15);
  const pastClickDate = new Date(date.getFullYear(), date.getMonth() - 1, 15);
  const clickDateEl = body.getByLabelText(_formatDateJp(clickDate));
  await userEvent.click(clickDateEl);
  // 選択済みというラベルがついていることを確認
  await waitFor(() =>
    expect(clickDateEl).toHaveAttribute(
      "aria-label",
      `${_formatDateJp(clickDate)}-選択済み`
    )
  );
  // Input内が選択した日付になることを確認
  await waitFor(() =>
    expect(button.textContent).toBe(_formatDateSlash(clickDate))
  );

  // 月セレクターのPrevを1回押して操作月を1ヶ月前にする
  const monthSelectorPrev = body.getByLabelText(
    ARIA_LABELS.MONTH_SELECTOR_PREV
  );
  await userEvent.click(monthSelectorPrev);
  const pastMonthDisplay = await body.findByText(
    _formatDateJpMonth(pastClickDate)
  );
  await waitFor(() => expect(pastMonthDisplay).toBeTruthy());

  // その月の15日を選択
  const pastDay = body.getByLabelText(_formatDateJp(pastClickDate));
  await userEvent.click(pastDay);
  // 選択済みというラベルがついていることを確認
  await waitFor(() =>
    expect(pastDay).toHaveAttribute(
      "aria-label",
      `${_formatDateJp(pastClickDate)}-選択済み`
    )
  );

  // Input内が選択した日付になることを確認
  await waitFor(() =>
    expect(button.textContent).toBe(_formatDateSlash(new Date(pastClickDate)))
  );

  // 月セレクターのNextを1回押して操作月を1ヶ月後にする
  const monthSelectorNext = body.getByLabelText(
    ARIA_LABELS.MONTH_SELECTOR_NEXT
  );
  await userEvent.click(monthSelectorNext);
  const currentMonthDisplay = await body.findByText(
    _formatDateJpMonth(clickDate)
  );
  await waitFor(() => expect(currentMonthDisplay).toBeTruthy());

  await userEvent.click(button);
  await userEvent.tab();
};

export const IsDirectionFixed = Template.bind({});
IsDirectionFixed.args = {
  modelValue: null,
  isDirectionFixed: true,
};
IsDirectionFixed.parameters = {
  docs: {
    description: {
      story: `isDirectionFixedを設定することで、Popup の表示位置を固定することができます。`,
    },
    source: {
      code: `
<script setup lang="ts">
import { ref } from "vue";
import { WizDatepicker } from "@wizleap-inc/wiz-ui";

const date = ref<Date | null>(null);
</script>
<template>
  <WizDatepicker v-model="date" isDirectionFixed />
</template>
  `,
    },
  },
};
