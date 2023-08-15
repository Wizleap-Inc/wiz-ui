/* eslint-disable react-hooks/rules-of-hooks */

import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { WizShowMoreLess } from "../components";

const meta: Meta<typeof WizShowMoreLess> = {
  title: "Base/ShowMoreLess",
  component: WizShowMoreLess,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          "childrenに渡したDOMを開閉し、表示-非表示を制御するためのコンポーネントです。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizShowMoreLess>;

const children = (
  <div>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </div>
);

export const Default: Story = {
  args: {
    children,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <WizShowMoreLess
        {...args}
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
      />
    );
  },
};

export const Mobile: Story = {
  args: {
    variant: "mobile",
    children,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <WizShowMoreLess
        {...args}
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
      />
    );
  },
};

export const Open: Story = {
  args: {
    children,
    isOpen: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    return (
      <WizShowMoreLess
        {...args}
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
      />
    );
  },
};

export const Multiple: Story = {
  args: {
    children,
  },
  render: (args) => {
    const [isOpens, setIsOpens] = useState([true, false, false]);
    return (
      <>
        {[0, 1, 2].map((i) => (
          <WizShowMoreLess
            key={`show-more-less-${i}`}
            {...args}
            isOpen={isOpens[i]}
            onToggle={() =>
              setIsOpens((prev) => {
                const next = [...prev];
                next[i] = !next[i];
                return next;
              })
            }
          />
        ))}
      </>
    );
  },
};
