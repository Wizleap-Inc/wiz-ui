import { Meta, StoryObj } from "@storybook/react";
import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import { useEffect, useState } from "react";

import { WizProvider } from "@/components/manager";

import {
  WizPopup,
  WizPopupClose,
  WizPopupContent,
  WizPopupTrigger,
} from "../components";
import { Direction } from "../types/direction";

const meta: Meta<typeof WizPopup> = {
  title: "Base/Popup",
  component: WizPopup,
  argTypes: {},
  decorators: [
    (Story) => (
      <WizProvider>
        <Story />
      </WizProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WizPopup>;

type Pattern = {
  direction: Direction;
  gap?: SpacingKeys;
};

const popupContentStyle = {
  padding: "16px",
  backgroundColor: "white",
  borderRadius: "4px",
};

export const Default: Story = {
  render: (args) => {
    const patterns: Pattern[] = [
      { direction: "bl" },
      { direction: "bc" },
      { direction: "br" },
      { direction: "tl" },
      { direction: "tc" },
      { direction: "tr" },
      { direction: "lt" },
      { direction: "lc" },
      { direction: "lb" },
      { direction: "rt" },
      { direction: "rc" },
      { direction: "rb" },
    ];
    const Popup = ({ pattern }: { pattern: Pattern }) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <WizPopup
          {...args}
          isOpen={isOpen}
          open={() => setIsOpen(true)}
          close={() => setIsOpen(false)}
        >
          <WizPopupTrigger>
            <button>Click me {pattern.direction}</button>
          </WizPopupTrigger>
          <WizPopupContent {...pattern}>
            <div style={popupContentStyle}>
              <p>This is a popup content {pattern.direction}</p>
              <button>
                <WizPopupClose>close </WizPopupClose>
              </button>
            </div>
          </WizPopupContent>
        </WizPopup>
      );
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15rem",
        }}
      >
        {patterns.map((pattern, i) => (
          <div key={i}>
            <Popup pattern={pattern} />
          </div>
        ))}
      </div>
    );
  },
  args: {},
};

export const Gap: Story = {
  render: (args) => {
    const patterns: Pattern[] = [
      { direction: "rt", gap: "no" },
      { direction: "rt", gap: "xs2" },
      { direction: "rt", gap: "xs" },
      { direction: "rt", gap: "sm" },
      { direction: "rt", gap: "md" },
      { direction: "rt", gap: "lg" },
      { direction: "rt", gap: "xl" },
      { direction: "rt", gap: "xl2" },
      { direction: "rt", gap: "xl3" },
      { direction: "rt", gap: "xl4" },
    ];

    const Popup = ({ pattern }: { pattern: Pattern }) => {
      const [isOpen, setIsOpen] = useState(false);
      return (
        <WizPopup
          {...args}
          isOpen={isOpen}
          open={() => setIsOpen(true)}
          close={() => setIsOpen(false)}
        >
          <WizPopupTrigger>
            <button>
              Click me {pattern.direction} {pattern.gap}
            </button>
          </WizPopupTrigger>
          <WizPopupContent {...pattern}>
            <div style={popupContentStyle}>
              <p>
                This is a popup content {pattern.direction} {pattern.gap}
              </p>
              <button>
                <WizPopupClose>close </WizPopupClose>
              </button>
            </div>
          </WizPopupContent>
        </WizPopup>
      );
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15rem",
        }}
      >
        {patterns.map((pattern, i) => (
          <div key={i}>
            <Popup pattern={pattern} />
          </div>
        ))}
      </div>
    );
  },
  args: {},
};

export const Playground: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [maxX, setMaxX] = useState(0);
    const [maxY, setMaxY] = useState(0);
    const sbRoot = document.getElementById("storybook-root");
    if (!sbRoot) return <></>;
    const updateMax = () => {
      setMaxX(sbRoot.clientWidth);
      setMaxY(sbRoot.clientHeight);
    };
    useEffect(() => {
      updateMax();
      window.addEventListener("resize", updateMax);
    }, []);
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: y + "px",
            left: x + "px",
          }}
        >
          <WizPopup
            {...args}
            isOpen={isOpen}
            open={() => setIsOpen(true)}
            close={() => setIsOpen(false)}
          >
            <WizPopupTrigger>
              <button>Toggle</button>
            </WizPopupTrigger>
            <WizPopupContent>
              <div style={popupContentStyle}>
                <p>This is a popup content</p>
                <button>
                  <WizPopupClose>close </WizPopupClose>
                </button>
              </div>
            </WizPopupContent>
          </WizPopup>
        </div>
        <input
          type="range"
          min={0}
          max={maxX}
          onChange={(e) => setX(parseInt(e.target.value))}
        />
        <input
          type="range"
          min={0}
          max={maxY}
          onChange={(e) => setY(parseInt(e.target.value))}
        />
      </div>
    );
  },
  args: {},
};

export const Playground2: Story = {
  render: (args) => {
    const absolutePositions = [
      {
        top: "0px",
        left: "0px",
        bottom: "initial",
        right: "initial",
        transform: "initial",
      },
      {
        top: "0px",
        left: "initial",
        bottom: "initial",
        right: "0px",
        transform: "initial",
      },
      {
        top: "initial",
        left: "0px",
        bottom: "0px",
        right: "initial",
        transform: "initial",
      },
      {
        top: "initial",
        left: "initial",
        bottom: "0px",
        right: "0px",
        transform: "initial",
      },
      {
        top: "50%",
        left: "50%",
        bottom: "initial",
        right: "initial",
        transform: "translate(-50%, -50%)",
      },
      {
        top: "50%",
        left: "0px",
        bottom: "initial",
        right: "initial",
        transform: "translate(0%, -50%)",
      },
      {
        top: "50%",
        left: "initial",
        bottom: "initial",
        right: "0px",
        transform: "translate(0%, -50%)",
      },
      {
        top: "0px",
        left: "50%",
        bottom: "initial",
        right: "initial",
        transform: "translate(-50%, 0%)",
      },
      {
        top: "initial",
        left: "50%",
        bottom: "0px",
        right: "initial",
        transform: "translate(-50%, 0%)",
      },
    ];
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "relative",
        }}
      >
        {absolutePositions.map((pattern, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pattern,
            }}
          >
            <WizPopup
              {...args}
              isOpen={isOpen}
              open={() => setIsOpen(true)}
              close={() => setIsOpen(false)}
            >
              <WizPopupTrigger>
                <button>Toggle</button>
              </WizPopupTrigger>
              <WizPopupContent {...pattern}>
                <div style={popupContentStyle}>
                  <p>This is a popup content</p>
                  <button>
                    <WizPopupClose>close </WizPopupClose>
                  </button>
                </div>
              </WizPopupContent>
            </WizPopup>
          </div>
        ))}
      </div>
    );
  },
  args: {},
};
