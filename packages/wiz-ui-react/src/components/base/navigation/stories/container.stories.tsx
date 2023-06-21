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

const handleTogglePopupOpen = () => void 0;
const handleTogglePopupLocking = () => void 0;

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
            onTogglePopup={handleTogglePopupOpen}
            onTogglePopupLocking={handleTogglePopupLocking}
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
    const handleTogglePopupOpen = () => setIsMenuOpen((prev) => !prev);
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
              onTogglePopup={handleTogglePopupOpen}
              onTogglePopupLocking={handleTogglePopupLocking}
            />
          ))}
        </WizNavigationContainer>
        <div>
          デバッグ用
          <button onClick={handleTogglePopupOpen}>
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
    const [isPopupOpen0, setIsPopupOpen0] = useState(false);
    const [isPopupOpen1, setIsPopupOpen1] = useState(false);
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);
    const [isPopupOpen3, setIsPopupOpen3] = useState(false);
    const [isPopupLocking, setIsPopupLocking] = useState(false);
    const handleTogglePopupLocking = (isPopupLocking: boolean) =>
      setIsPopupLocking(isPopupLocking);

    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <WizNavigationContainer {...args}>
          <WizNavigationItem
            icon={WizIDashboard}
            label="Home"
            href="/"
            active={false}
            buttons={[createButton(0)]}
            isPopupOpen={isPopupOpen0}
            onTogglePopup={(isPopupOpen) => setIsPopupOpen0(isPopupOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleTogglePopupLocking}
          />
          <WizNavigationItem
            icon={WizIAssignment}
            label="Page1"
            href="/page1"
            active={false}
            buttons={[createButton(1), createButton(2)]}
            isPopupOpen={isPopupOpen1}
            onTogglePopup={(isPopupOpen) => setIsPopupOpen1(isPopupOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleTogglePopupLocking}
          />
          <WizNavigationItem
            icon={WizIBusinessCenter}
            label="Page2"
            href="/page2"
            active={false}
            buttons={[createButton(3), createButton(4)]}
            isPopupOpen={isPopupOpen2}
            onTogglePopup={(isPopupOpen) => setIsPopupOpen2(isPopupOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleTogglePopupLocking}
          />
          <WizNavigationItem
            icon={WizIHelp}
            label="Page3"
            href="http://localhost:6008/"
            active={false}
            buttons={[createButton(5), createButton(6)]}
            isPopupOpen={isPopupOpen3}
            onTogglePopup={(isPopupOpen) => setIsPopupOpen3(isPopupOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleTogglePopupLocking}
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
            onTogglePopup={handleTogglePopupOpen}
            onTogglePopupLocking={handleTogglePopupLocking}
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
    const [isPopupOpen0, setIsPopupOpen0] = useState(false);
    const [isPopupOpen1, setIsPopupOpen1] = useState(false);
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);
    const [isPopupOpen3, setIsPopupOpen3] = useState(false);
    const [isPopupLocking, setIsPopupLocking] = useState(false);
    const handleTogglePopupLocking = (isPopupLocking: boolean) =>
      setIsPopupLocking(isPopupLocking);

    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <WizNavigationContainer {...args}>
          <WizNavigationItem
            icon={WizIDashboard}
            label="Home"
            href="/"
            active={false}
            buttons={[createButton(0)]}
            isPopupOpen={isPopupOpen0}
            onTogglePopup={(isPopupOpen) => setIsPopupOpen0(isPopupOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleTogglePopupLocking}
            tooltipText="これはヒント1です。"
          />
          <WizNavigationItem
            icon={WizIAssignment}
            label="Page1"
            href="/page1"
            active={false}
            buttons={[createButton(1), createButton(2)]}
            isPopupOpen={isPopupOpen1}
            onTogglePopup={(isPopupOpen) => setIsPopupOpen1(isPopupOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleTogglePopupLocking}
            tooltipText="これはヒント2です。"
          />
          <WizNavigationItem
            icon={WizIBusinessCenter}
            label="Page2"
            href="/page2"
            active={false}
            buttons={[createButton(3), createButton(4)]}
            isPopupOpen={isPopupOpen2}
            onTogglePopup={(isPopupOpen) => setIsPopupOpen2(isPopupOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleTogglePopupLocking}
            tooltipText="これはヒント3です。"
          />
          <WizNavigationItem
            icon={WizIHelp}
            label="Page3"
            href="http://localhost:6008/"
            active={false}
            buttons={[createButton(5), createButton(6)]}
            isPopupOpen={isPopupOpen3}
            onTogglePopup={(isPopupOpen) => setIsPopupOpen3(isPopupOpen)}
            isPopupLocking={isPopupLocking}
            onTogglePopupLocking={handleTogglePopupLocking}
            tooltipText="これはヒント4です。"
          />
        </WizNavigationContainer>
      </div>
    );
  },
};
