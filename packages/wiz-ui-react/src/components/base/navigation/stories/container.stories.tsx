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
            onSetIsOpenPopup={handleSetOpen}
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
              onSetIsOpenPopup={handleSetOpen}
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
    const [isOpen0, setIsOpen0] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [lockingPopup, setLockingPopup] = useState(false);
    const handleSetLockingPopup = (isLockingPopup: boolean) =>
      setLockingPopup(isLockingPopup);

    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <WizNavigationContainer {...args}>
          <WizNavigationItem
            icon={WizIDashboard}
            label="Home"
            href="/"
            active={false}
            buttons={[createButton(1)]}
            isOpenPopup={isOpen0}
            onSetIsOpenPopup={(isOpen) => setIsOpen0(isOpen)}
            lockingPopup={lockingPopup}
            onSetLockingPopup={handleSetLockingPopup}
          />
          <WizNavigationItem
            icon={WizIAssignment}
            label="Page1"
            href="/page1"
            active={false}
            buttons={[createButton(1)]}
            isOpenPopup={isOpen1}
            onSetIsOpenPopup={(isOpen) => setIsOpen1(isOpen)}
            lockingPopup={lockingPopup}
            onSetLockingPopup={handleSetLockingPopup}
          />
          <WizNavigationItem
            icon={WizIBusinessCenter}
            label="Page2"
            href="/page2"
            active={false}
            buttons={[createButton(1)]}
            isOpenPopup={isOpen2}
            onSetIsOpenPopup={(isOpen) => setIsOpen2(isOpen)}
            lockingPopup={lockingPopup}
            onSetLockingPopup={handleSetLockingPopup}
          />
          <WizNavigationItem
            icon={WizIHelp}
            label="Page3"
            href="/page3"
            active={false}
            buttons={[createButton(1)]}
            isOpenPopup={isOpen3}
            onSetIsOpenPopup={(isOpen) => setIsOpen3(isOpen)}
            lockingPopup={lockingPopup}
            onSetLockingPopup={handleSetLockingPopup}
          />
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
