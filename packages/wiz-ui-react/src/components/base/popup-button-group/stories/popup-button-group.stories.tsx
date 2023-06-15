/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";

import { WizPopup } from "@/components";
import { TIcon, WizIAddCircle, WizIOpenInNew } from "@/components/icons";

import { WizPopupButtonGroup } from "../components";
import { ButtonGroupItem, PopupButtonOption } from "../types";

const meta: Meta<typeof WizPopupButtonGroup> = {
  title: "Base/PopupButtonGroup",
  component: WizPopupButtonGroup,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizPopupButtonGroup>;

const _getDummyOptions = (
  count: number,
  click: (n: number) => void,
  exLabel?: string
) => {
  const options: PopupButtonOption[] = [];
  const createIcon = (i: number) => {
    if (i % 3 === 0) {
      return undefined;
    }
    return i % 3 === 1
      ? { icon: WizIOpenInNew, iconDefaultColor: "gray.500" as const }
      : {
          icon: WizIAddCircle,
          iconDefaultColor: "green.800" as const,
        };
  };
  Array.from({ length: count }).forEach((_, i) => {
    const n = i + 1;
    const icon = createIcon(n);
    options.push({
      label: (n % 2 === 0 ? "test" : " テスト") + n,
      value: n,
      exLabel: exLabel,
      icon: icon?.icon,
      iconDefaultColor: icon?.iconDefaultColor,
      onClick: () => click(n),
    });
  });
  return options.map(
    (opt) => ({ kind: "button", option: opt } as ButtonGroupItem)
  );
};

const createButton = (
  n: number,
  click: (n: number) => void,
  disabled?: boolean,
  icon?: TIcon
): ButtonGroupItem => ({
  kind: "button",
  option: {
    label: `item ${n}`,
    value: n,
    onClick: () => click(n),
    disabled: disabled,
    icon: icon,
    iconDefaultColor: "gray.500",
  },
});

const onClick = () => void 0;

const _getDummyItems = (click: (arg: number) => void): ButtonGroupItem[] => [
  {
    kind: "group",
    title: "タイトル1",
    groupDivider: true,
    buttonDivider: true,
    items: [
      ..._getDummyOptions(3, click),
      {
        kind: "group",
        title: "タイトル2",
        items: [createButton(4, click), createButton(5, click)],
      },
    ],
  },
  createButton(6, click),
  createButton(7, click),
];

export const Default: Story = {
  args: {
    options: _getDummyItems(onClick),
  },
  render: (args) => {
    return <WizPopupButtonGroup {...args} />;
  },
};

export const Disabled: Story = {
  args: {
    options: _getDummyItems(onClick),
    disabled: true,
  },
  render: (args) => {
    return <WizPopupButtonGroup {...args} />;
  },
};

export const DisabledButton: Story = {
  args: {
    options: [
      createButton(1, onClick, true, WizIOpenInNew),
      createButton(2, onClick, false, WizIOpenInNew),
      createButton(3, onClick, true),
      createButton(4, onClick, false),
    ],
  },
  render: (args) => {
    return <WizPopupButtonGroup {...args} />;
  },
};

export const Popup: Story = {
  args: {
    options: _getDummyItems(onClick),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    const anchor = useRef<HTMLButtonElement | null>(null);
    return (
      <>
        <button ref={anchor} onClick={() => setIsOpen((prev) => !prev)}>
          open/close
        </button>
        <WizPopup
          anchorElement={anchor}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          direction="bottomLeft"
        >
          <WizPopupButtonGroup {...args} />
        </WizPopup>
      </>
    );
  },
};

export const Divider: Story = {
  args: {
    options: [
      createButton(1, onClick),
      createButton(2, onClick),
      { kind: "divider" },
      createButton(3, onClick),
      createButton(4, onClick),
    ],
  },
  render: (args) => {
    return <WizPopupButtonGroup {...args} />;
  },
};
