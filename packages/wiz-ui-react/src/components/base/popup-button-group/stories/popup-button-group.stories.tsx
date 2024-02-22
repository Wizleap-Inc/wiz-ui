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

const getDummyOptions = (count: number) => {
  const options: PopupButtonOption<number>[] = [];
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
      exLabel: undefined,
      icon: icon?.icon,
      iconDefaultColor: icon?.iconDefaultColor,
      onClick: () => void 0,
    });
  });
  return options.map(
    (opt) => ({ kind: "button", option: opt } as ButtonGroupItem<number>)
  );
};

const createButton = (
  n: number,
  disabled?: boolean,
  icon?: TIcon
): ButtonGroupItem<number> => ({
  kind: "button",
  option: {
    label: `item ${n}`,
    value: n,
    onClick: () => void 0,
    disabled: disabled,
    icon: icon,
    iconDefaultColor: "gray.500",
  },
});

const dummyItems: ButtonGroupItem<number>[] = [
  {
    kind: "group",
    title: "タイトル1",
    groupDivider: true,
    buttonDivider: true,
    items: [
      ...getDummyOptions(3),
      {
        kind: "group",
        title: "タイトル2",
        items: [createButton(4), createButton(5)],
      },
    ],
  },
  createButton(6),
  createButton(7),
];

export const Default: Story = {
  args: {
    options: dummyItems,
  },
  render: (args) => {
    return <WizPopupButtonGroup {...args} />;
  },
};

export const Disabled: Story = {
  args: {
    options: dummyItems,
    disabled: true,
  },
  render: (args) => {
    return <WizPopupButtonGroup {...args} />;
  },
};

export const DisabledButton: Story = {
  args: {
    options: [
      createButton(1, true, WizIOpenInNew),
      createButton(2, false, WizIOpenInNew),
      createButton(3, true),
      createButton(4, false),
    ],
  },
  render: (args) => {
    return <WizPopupButtonGroup {...args} />;
  },
};

export const Popup: Story = {
  args: {
    options: dummyItems,
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
      createButton(1),
      createButton(2),
      { kind: "divider" },
      createButton(3),
      createButton(4),
    ],
  },
  render: (args) => {
    return <WizPopupButtonGroup {...args} />;
  },
};
