import { Meta, StoryObj } from "@storybook/react";

import { WizCalendar } from "../components";

const meta: Meta<typeof WizCalendar> = {
  title: "Base/Calendar",
  component: WizCalendar,
  parameters: {
    docs: {
      description: {
        component: `
### カレンダー
カレンダーを表示します。 \`activeDates\` には \`date\` と \`state\` を持つオブジェクトの配列を渡します。 \`state\` には \`primary\` と \`secondary\` を指定できます。
差分を固定するため、currentMonthはUnRequiredですが初期値を設定しています。
      `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizCalendar>;

const Template: Story = {
  render: (args) => (
    <div>
      <p>
        表示している月: {args.currentMonth?.getFullYear()}年
        {(args.currentMonth?.getMonth() ?? 0) + 1}月
      </p>
      <WizCalendar {...args} />
    </div>
  ),
};

export const Default: Story = {
  ...Template,
  args: {
    currentMonth: new Date("2023-03"),
  },
};

export const CurrentMonth: Story = {
  ...Template,
  args: {
    currentMonth: new Date("2021-01"),
  },
  parameters: {
    docs: {
      description: {
        story: "`currentMonth` を指定すると、その月のカレンダーを表示します。",
      },
    },
  },
};

export const ActiveDates: Story = {
  ...Template,
  args: {
    currentMonth: new Date("2021-01"),
    activeDates: [
      {
        date: new Date("2021-01-11"),
        state: "primary",
      },
      {
        date: new Date("2021-01-12"),
        state: "secondary",
      },
      {
        date: new Date("2021-01-13"),
        state: "secondary",
      },
      {
        date: new Date("2021-01-14"),
        state: "secondary",
      },
      {
        date: new Date("2021-01-15"),
        state: "primary",
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "`activeDates` には `date` と `state` を持つオブジェクトの配列を渡します。 `state` には `primary` と `secondary` を指定できます。",
      },
    },
  },
};

export const FilledWeeks: Story = {
  ...Template,
  args: {
    currentMonth: new Date("2023-03"),
    filledWeeks: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "`filledWeeks` を `true` にすると、月の最初の日と最後の日の前後に空白の日付を表示します。",
      },
    },
  },
};

export const Today: Story = {
  ...Template,
  args: {
    currentMonth: new Date("2023-03"),
    _today: new Date("2023-03-05"),
  },
};

export const DisabledToday: Story = {
  ...Template,
  args: {
    currentMonth: new Date("2023-03"),
    _today: new Date("2023-03-05"),
    disabledDate: (date: Date) => date.getDate() === 5,
  },
};

export const SelectedToday: Story = {
  ...Template,
  args: {
    currentMonth: new Date("2023-03"),
    _today: new Date("2023-03-05"),
    activeDates: [{ date: new Date("2023-03-05"), state: "primary" }],
  },
};
