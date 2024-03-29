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
currentPageが現在のページの番号を表します。
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <WizPagination
        {...args}
        currentPage={currentPage}
        onChangePage={(page) => setCurrentPage(page)}
      />
    );
  },
};

export const Length: Story = {
  args: {
    length: 10,
    sideLength: 1,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <>
        {[0, 1, 2, 3, 4, 5].map((i, length) => (
          <WizPagination
            {...args}
            sideLength={length}
            key={i}
            currentPage={currentPage}
            onChangePage={(page) => setCurrentPage(page)}
          />
        ))}
      </>
    );
  },
};
