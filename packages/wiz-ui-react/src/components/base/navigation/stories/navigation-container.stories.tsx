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
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof WizNavigationContainer>;

const navItems = [
  {
    icon: WizIDashboard,
    label: "Home",
    href: "/page0",
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
            href="/"
            active={false}
          />
        ))}
      </WizNavigationContainer>
    </div>
  ),
};

export const Overview: Story = {
  ...Template,
  args: {
    isOpen: true,
  },
};

export const Width: Story = {
  ...Template,
  args: {
    isOpen: true,
    width: "15rem",
  },
};

export const WithFooter: Story = {
  ...Template,
  args: {
    isOpen: true,
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
    const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <WizNavigationContainer {...args} isOpen={isMenuOpen}>
          {navItems.map((path) => (
            <WizNavigationItem
              key={`path-${path.label}`}
              icon={path.icon}
              label={path.label}
              href="/"
              active={false}
            />
          ))}
        </WizNavigationContainer>
        <div>
          デバッグ用
          <button onClick={handleToggleMenu}>
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
    isOpen: true,
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
    const [activeItem, setActiveItem] = useState<number>(-1);
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);
    const [isPopupOpen3, setIsPopupOpen3] = useState(false);

    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <WizNavigationContainer {...args}>
          <WizNavigationItem
            icon={WizIDashboard}
            label="Jump to /"
            href="/"
            active={activeItem === 0}
          />
          <WizNavigationItem
            icon={WizIAssignment}
            label="Jump to /"
            href="/"
            active={activeItem === 1}
          />
          <WizNavigationItem
            icon={WizIBusinessCenter}
            label="Nav-Item 1"
            as="button"
            asProps={{
              style: {
                backgroundColor: "white",
                border: "none",
                width: "100%",
              },
            }}
            active={activeItem === 2}
            buttons={[createButton(3), createButton(4)]}
            isPopupOpen={isPopupOpen2}
            onTogglePopup={(isPopupOpen) => {
              if (isPopupOpen) {
                setActiveItem(2);
              }
              setIsPopupOpen2(isPopupOpen);
            }}
          />
          <WizNavigationItem
            icon={WizIHelp}
            label="Nav-Item 02"
            as="button"
            asProps={{
              style: {
                backgroundColor: "white",
                border: "none",
                width: "100%",
              },
            }}
            active={activeItem === 3}
            buttons={[createButton(5), createButton(6)]}
            isPopupOpen={isPopupOpen3}
            onTogglePopup={(isPopupOpen) => {
              if (isPopupOpen) {
                setActiveItem(3);
              }
              setIsPopupOpen3(isPopupOpen);
            }}
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
            href="/"
            active={false}
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
            tooltipText="これはヒント1です。"
          />
          <WizNavigationItem
            icon={WizIAssignment}
            label="Page1"
            href="/"
            active={false}
            buttons={[createButton(1), createButton(2)]}
            isPopupOpen={isPopupOpen1}
            onTogglePopup={(isPopupOpen) => setIsPopupOpen1(isPopupOpen)}
            tooltipText="これはヒント2です。"
          />
          <WizNavigationItem
            icon={WizIBusinessCenter}
            label="Page2"
            href="/"
            active={false}
            buttons={[createButton(3), createButton(4)]}
            isPopupOpen={isPopupOpen2}
            onTogglePopup={(isPopupOpen) => setIsPopupOpen2(isPopupOpen)}
            tooltipText="これはヒント3です。"
          />
          <WizNavigationItem
            icon={WizIHelp}
            label="Page3"
            href="/"
            active={false}
            buttons={[createButton(5), createButton(6)]}
            isPopupOpen={isPopupOpen3}
            onTogglePopup={(isPopupOpen) => setIsPopupOpen3(isPopupOpen)}
            tooltipText="これはヒント4です。"
          />
        </WizNavigationContainer>
      </div>
    );
  },
};
