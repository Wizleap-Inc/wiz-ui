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
    const [isOpen1, setIsOpen1] = useState(true);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    return (
      <>
        <WizShowMoreLess
          {...args}
          isOpen={isOpen1}
          onToggle={() => setIsOpen1((prev) => !prev)}
        />
        <WizShowMoreLess
          {...args}
          isOpen={isOpen2}
          onToggle={() => setIsOpen2((prev) => !prev)}
        />
        <WizShowMoreLess
          {...args}
          isOpen={isOpen3}
          onToggle={() => setIsOpen3((prev) => !prev)}
        />
      </>
    );
  },
};
