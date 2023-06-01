/* eslint-disable react-hooks/rules-of-hooks */

import { Meta, StoryObj } from "@storybook/react";
import { COLOR_MAP_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { useState } from "react";

import { WizShowMoreLess } from "../components";

const meta: Meta<typeof WizShowMoreLess> = {
  title: "Base/ShowMoreLess",
  component: WizShowMoreLess,
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
    },
    openMessage: {
      control: { type: "text" },
    },
    closeMessage: {
      control: { type: "text" },
    },
    width: {
      control: { type: "text" },
    },
    bgColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    fontColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    onToggle: {
      action: "onClick",
    },
  },
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

export const Color: Story = {
  args: {
    children,
    bgColor: "gray.300",
    fontColor: "green.800",
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
