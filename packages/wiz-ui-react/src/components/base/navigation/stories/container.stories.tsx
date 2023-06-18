/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import {
  WizIAssignment,
  WizIBusinessCenter,
  WizIDashboard,
  WizIHelp,
} from "@/components/icons";

import { ButtonGroupItem } from "../../popup-button-group/types";
import { WizNavigationContainer, WizNavigationItem } from "../components";

const meta: Meta<typeof WizNavigationContainer> = {
  title: "Base/Navigation/Container",
  component: WizNavigationContainer,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizNavigationContainer>;

const handleSetOpen = () => void 0;
const setLock = () => void 0;

const paths = [
  {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
  },
  {
    icon: WizIAssignment,
    label: "Page1",
    href: "/page1",
  },
  {
    icon: WizIBusinessCenter,
    label: "Page2",
    href: "/page2",
  },
  {
    icon: WizIHelp,
    label: "Page3",
    href: "/page3",
  },
];

const Template: Story = {
  render: (args) => (
    <div style={{ display: "flex", height: "100vh" }}>
      <WizNavigationContainer {...args}>
        {paths.map((path) => (
          <WizNavigationItem
            key={`path-${path.label}`}
            icon={path.icon}
            label={path.label}
            href={path.href}
            active={false}
            onSetIsOpen={handleSetOpen}
            onSetLockingPopup={setLock}
          />
        ))}
      </WizNavigationContainer>
    </div>
  ),
};

export const Overview: Story = {
  ...Template,
  args: {},
};

export const WithFooter: Story = {
  ...Template,
  args: {
    footer: (
      <div>
        <h4>Footer</h4>
        <h5>Footer</h5>
        <h6>Footer</h6>
      </div>
    ),
  },
};

export const Close: Story = {
  ...Template,
  args: {
    isOpen: false,
  },
};

export const Playground: Story = {
  args: {
    isOpen: true,
  },
  render: (args) => {
    const [isMenuOpen, setIsMenuOpen] = useState(args.isOpen);
    const handleSetOpen = () => setIsMenuOpen((prev) => !prev);
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <WizNavigationContainer {...args} isOpen={isMenuOpen}>
          {paths.map((path) => (
            <WizNavigationItem
              key={`path-${path.label}`}
              icon={path.icon}
              label={path.label}
              href={path.href}
              active={false}
              onSetIsOpen={handleSetOpen}
              onSetLockingPopup={setLock}
            />
          ))}
        </WizNavigationContainer>
        <div>
          デバッグ用
          <button onClick={handleSetOpen}>
            {isMenuOpen ? "Close" : "Open"}
          </button>
        </div>
      </div>
    );
  },
};

export const Fixed: Story = {
  ...Template,
  args: {
    sticky: true,
    footer: (
      <div>
        <h4>Footer</h4>
        <h5>Footer</h5>
        <h6>Footer</h6>
      </div>
    ),
  },
};

const createButton = (n: number): ButtonGroupItem => ({
  kind: "button",
  option: {
    label: `label ${n}`,
    value: n,
    onClick: () => void 0,
  },
});

const PopupTemplate: Story = {
  render: (args) => {
    const [isOpens, setIsOpens] = useState([false, false, false, false]);
    const handleSetIsOpen = (index: number) => {
      const newIsOpens = [...isOpens];
      newIsOpens[index] = !newIsOpens[index];
      setIsOpens(newIsOpens);
    };

    const [lockingPopup, setLockingPopup] = useState(false);
    const handleSetLockingPopup = (isLockingPopup: boolean) =>
      setLockingPopup(isLockingPopup);

    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <WizNavigationContainer {...args}>
          {paths.map((path, i) => (
            <WizNavigationItem
              key={`path-${path.label}`}
              icon={path.icon}
              label={path.label}
              href={path.href}
              active={false}
              buttons={[createButton(i + 1)]}
              isOpen={isOpens[i]}
              onSetIsOpen={() => handleSetIsOpen(i)}
              lockingPopup={lockingPopup}
              onSetLockingPopup={handleSetLockingPopup}
            />
          ))}
        </WizNavigationContainer>
      </div>
    );
  },
};

export const Popup: Story = {
  ...PopupTemplate,
  args: {
    isOpen: true,
  },
};
