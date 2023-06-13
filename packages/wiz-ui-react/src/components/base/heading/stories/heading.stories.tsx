import { Meta, StoryObj } from "@storybook/react";
import {
  COLOR_MAP_ACCESSORS,
  FONT_SIZE_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { HeadingLevel, WizHeading } from "../components/heading";

const meta: Meta<typeof WizHeading> = {
  title: "Base/Heading",
  component: WizHeading,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizHeading>;

export const Default: Story = {
  render: (arg) => <WizHeading {...arg}>見出し</WizHeading>,
};

const HEADING_LIST: HeadingLevel[] = [1, 2, 3, 4, 5, 6];
export const Level: Story = {
  render: () => (
    <table>
      {HEADING_LIST.map((heading) => (
        <tr key={`heading-${heading}`}>
          <td style={{ padding: "1rem" }}>level = {heading}</td>
          <td style={{ padding: "1rem" }}>
            <WizHeading level={heading}>Level{heading}の見出し</WizHeading>
          </td>
        </tr>
      ))}
    </table>
  ),
};

export const Color: Story = {
  render: () => (
    <table>
      {COLOR_MAP_ACCESSORS.map((color) => (
        <tr key={`color-${color}`}>
          <td style={{ padding: "1rem" }}>{color}</td>
          <td style={{ padding: "1rem" }}>
            <WizHeading color={color}>{color}の見出し</WizHeading>
          </td>
        </tr>
      ))}
    </table>
  ),
};

export const FontSize: Story = {
  render: () => (
    <table>
      {FONT_SIZE_ACCESSORS.map((fontSize) => (
        <tr key={`fontSize-${fontSize}`}>
          <td style={{ padding: "1rem" }}>{fontSize}</td>
          <td style={{ padding: "1rem" }}>
            <WizHeading fontSize={fontSize}>{fontSize}の見出し</WizHeading>
          </td>
        </tr>
      ))}
    </table>
  ),
};

export const Test: Story = {
  args: {
    fontSize: "sm",
    color: "gray.900",
  },
  render: (args) => <WizHeading {...args}>案件配信</WizHeading>,
};
