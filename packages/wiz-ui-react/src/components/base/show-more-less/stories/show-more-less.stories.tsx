import { Meta, StoryObj } from "@storybook/react";
// import { useState } from "react";

import { WizShowMoreLess } from "../components";

const meta: Meta<typeof WizShowMoreLess> = {
  title: "Base/ShowMoreLess",
  component: WizShowMoreLess,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: `
### WizShowMoreLess

Length分のページネーションを表示するコンポーネントです。
currentPageが現在のページの番号を表します。
初期値は1にするとよいです。`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizShowMoreLess>;

export const Default: Story = {
  args: {
    length: 10,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const [currentPage, setCurrentPage] = useState(1);
    return <WizShowMoreLess {...args} />;
  },
};
