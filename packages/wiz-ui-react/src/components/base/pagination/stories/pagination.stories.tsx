import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizPagination } from "../components";

const meta: Meta<typeof WizPagination> = {
  title: "Base/Pagination",
  component: WizPagination,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: `
### WizPagination

Length分のページネーションを表示するコンポーネントです。
activeValueが現在のページの番号を表します。
初期値は1にするとよいです。`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizPagination>;

export const Default: Story = {
  args: {
    length: 10,
  },
  render: (args) => {
    const [activeValue, setActiveValue] = useState(1);
    return (
      <WizPagination
        {...args}
        activeValue={activeValue}
        setActiveValue={setActiveValue}
      />
    );
  },
};
