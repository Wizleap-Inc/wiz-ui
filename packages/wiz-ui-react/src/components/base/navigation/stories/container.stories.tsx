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

const navItems = [
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
    href: "http://localhost:6008/",
  },
];

const Template: Story = {
  render: (args) => (
    <div style={{ display: "flex", height: "100vh" }}>
      <WizNavigationContainer {...args}>
        {navItems.map((path) => (
          <WizNavigationItem
            key={`path-${path.label}`}
            icon={path.icon}
            label={path.label}
            href={path.href}
            active={false}
            onTogglePopup={handleSetOpen}
            onTogglePopupLocking={setLock}
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
          {navItems.map((path) => (
            <WizNavigationItem
              key={`path-${path.label}`}
              icon={path.icon}
              label={path.label}
              href={path.href}
              active={false}
              onTogglePopup={handleSetOpen}
              onTogglePopupLocking={setLock}
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
    const [isPopupLocking, setLockingPopup] = useState(false);
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
            buttons={[createButton(0)]}
            isPopupOpen={isOpen0}
            onTogglePopup={(isOpen) => setIsOpen0(isOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleSetLockingPopup}
          />
          <WizNavigationItem
            icon={WizIAssignment}
            label="Page1"
            href="/page1"
            active={false}
            buttons={[createButton(1), createButton(2)]}
            isPopupOpen={isOpen1}
            onTogglePopup={(isOpen) => setIsOpen1(isOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleSetLockingPopup}
          />
          <WizNavigationItem
            icon={WizIBusinessCenter}
            label="Page2"
            href="/page2"
            active={false}
            buttons={[createButton(3), createButton(4)]}
            isPopupOpen={isOpen2}
            onTogglePopup={(isOpen) => setIsOpen2(isOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleSetLockingPopup}
          />
          <WizNavigationItem
            icon={WizIHelp}
            label="Page3"
            href="http://localhost:6008/"
            active={false}
            buttons={[createButton(5), createButton(6)]}
            isPopupOpen={isOpen3}
            onTogglePopup={(isOpen) => setIsOpen3(isOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleSetLockingPopup}
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

export const PopupSticky: Story = {
  ...PopupTemplate,
  args: {
    isOpen: true,
    sticky: true,
  },
};

export const Disabled: Story = {
  args: {
    isOpen: true,
    sticky: true,
  },
  render: (args) => (
    <div style={{ display: "flex", height: "100vh" }}>
      <WizNavigationContainer {...args}>
        {navItems.map((path) => (
          <WizNavigationItem
            key={`path-${path.label}`}
            icon={path.icon}
            label={path.label}
            href={path.href}
            active={false}
            onTogglePopup={handleSetOpen}
            onTogglePopupLocking={setLock}
            disabled
          />
        ))}
      </WizNavigationContainer>
    </div>
  ),
};

export const PopupAndTooltip: Story = {
  args: {
    isOpen: true,
    sticky: true,
  },
  render: (args) => {
    const [isOpen0, setIsOpen0] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isPopupLocking, setLockingPopup] = useState(false);
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
            buttons={[createButton(0)]}
            isPopupOpen={isOpen0}
            onTogglePopup={(isOpen) => setIsOpen0(isOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleSetLockingPopup}
            tooltipText="これはヒント1です。"
          />
          <WizNavigationItem
            icon={WizIAssignment}
            label="Page1"
            href="/page1"
            active={false}
            buttons={[createButton(1), createButton(2)]}
            isPopupOpen={isOpen1}
            onTogglePopup={(isOpen) => setIsOpen1(isOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleSetLockingPopup}
            tooltipText="これはヒント2です。"
          />
          <WizNavigationItem
            icon={WizIBusinessCenter}
            label="Page2"
            href="/page2"
            active={false}
            buttons={[createButton(3), createButton(4)]}
            isPopupOpen={isOpen2}
            onTogglePopup={(isOpen) => setIsOpen2(isOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleSetLockingPopup}
            tooltipText="これはヒント3です。"
          />
          <WizNavigationItem
            icon={WizIHelp}
            label="Page3"
            href="http://localhost:6008/"
            active={false}
            buttons={[createButton(5), createButton(6)]}
            isPopupOpen={isOpen3}
            onTogglePopup={(isOpen) => setIsOpen3(isOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleSetLockingPopup}
            tooltipText="これはヒント4です。"
          />
        </WizNavigationContainer>
      </div>
    );
  },
};
