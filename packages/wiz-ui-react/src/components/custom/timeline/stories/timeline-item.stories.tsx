import { Meta, StoryObj } from "@storybook/react";

import {
  WizDivider,
  WizHStack,
  WizIAdd,
  WizIHelp,
  WizIInfo,
  WizIcon,
  WizMenuItem,
  WizText,
  WizUnstyledTable,
  WizUnstyledTbody,
  WizUnstyledTd,
  WizUnstyledTr,
} from "@/components";

import { WizTimelineItem } from "..";
import { TimelineContext } from "../components/use-timeline";

const meta: Meta<typeof WizTimelineItem> = {
  title: "Custom/Timeline/Item",
  component: WizTimelineItem,
  decorators: [
    (Story) => (
      <TimelineContext.Provider value={{ device: "pc" }}>
        <Story />
      </TimelineContext.Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof WizTimelineItem>;

const Template = ({ disabled }: { disabled?: boolean }) => (
  <WizTimelineItem
    disabled={disabled}
    variant="success"
    tag="面談終了"
    title="面談レポート提出完了しました"
    annotation="2022年6月17日"
    footer={
      <>
        <WizDivider />
        <WizMenuItem label="編集" expand />
        <WizDivider />
        <WizMenuItem label="面談日程追加" expand />
        <WizDivider />
        <WizMenuItem label="相談者不在申請" expand />
      </>
    }
  >
    <WizUnstyledTable space="xs2" width="100%">
      <WizUnstyledTbody>
        <WizUnstyledTr>
          <WizUnstyledTd align="left" width="80px">
            <WizText fontSize="xs">相談日時</WizText>
          </WizUnstyledTd>
          <WizUnstyledTd>
            <WizHStack align="center" justify="between">
              <WizText bold fontSize="sm">
                <WizText as="span" bold fontSize="sm" display="inline-block">
                  2022年6月17日
                </WizText>
                <WizText as="span" bold fontSize="sm" display="inline-block">
                  10:00 ~ 11:00
                </WizText>
              </WizText>
              <WizIcon icon={WizIInfo} color="yellow.800" />
            </WizHStack>
          </WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr>
          <WizUnstyledTd align="left">
            <WizText fontSize="xs">相談場所</WizText>
          </WizUnstyledTd>
          <WizUnstyledTd>
            <WizText bold fontSize="sm">
              オンライン
            </WizText>
          </WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr>
          <WizUnstyledTd />
          <WizUnstyledTd>
            <WizHStack align="center">
              <WizText fontSize="sm" as="span">
                ※ビデオ面談URL：
              </WizText>
              <WizText bold color="red.800" as="span" fontSize="sm">
                未設定
              </WizText>
              <WizIcon icon={WizIInfo} color="red.800" />
            </WizHStack>
          </WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr>
          <WizUnstyledTd align="left">
            <WizText fontSize="xs">専門家</WizText>
          </WizUnstyledTd>
          <WizUnstyledTd>
            <WizText bold fontSize="sm">
              専門 タロウ
            </WizText>
          </WizUnstyledTd>
        </WizUnstyledTr>
        <WizUnstyledTr>
          <WizUnstyledTd align="left">
            <WizText fontSize="xs">前日の挨拶</WizText>
          </WizUnstyledTd>
          <WizUnstyledTd>
            <WizHStack align="center" justify="between">
              <WizText bold fontSize="sm">
                配信済み
              </WizText>
              <WizIcon icon={WizIHelp} />
            </WizHStack>
          </WizUnstyledTd>
        </WizUnstyledTr>
      </WizUnstyledTbody>
    </WizUnstyledTable>
  </WizTimelineItem>
);

export const Overview: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: `
  タイムラインのアイテムコンポーネントです。
  \`Timeline\`コンポーネントの子要素として使用します。
  このような感じで\`WizMenuItem\`や\`WizFlatTable\`と組み合わせて綺麗なレイアウトを作ることができます。
  `,
      },
    },
  },
};

export const Icon: Story = {
  render: () => (
    <WizTimelineItem
      variant="success"
      title="Iconをカスタマイズできます。"
      icon={WizIAdd}
    />
  ),
};

export const WithTag: Story = {
  render: () => (
    <WizTimelineItem
      variant="success"
      tag="これはタグです"
      title="タグを設定できます"
    />
  ),
};

export const WithAnnotation: Story = {
  render: () => (
    <WizTimelineItem
      variant="success"
      title="注釈（日付）を設定できます"
      annotation="2021年01月01日"
    />
  ),
};

export const VariantFailure: Story = {
  render: () => (
    <WizTimelineItem
      variant="failure"
      tag="タグは赤くなります"
      title="失敗ステータスのバリエーションです"
    />
  ),
};

export const VariantYellow: Story = {
  render: () => (
    <WizTimelineItem
      variant="yellow"
      tag="タグは黄色になります"
      title="黄色のバリエーションです"
    />
  ),
};

export const VariantGray: Story = {
  render: () => (
    <WizTimelineItem
      variant="gray"
      tag="タグは灰色になります"
      title="灰色のバリエーションです"
    />
  ),
};
export const Header: Story = {
  render: () => (
    <WizTimelineItem
      title="タイトルの下にコンテンツを表示できます"
      annotation="2022年6月17日"
      header={
        <>
          <WizText fontSize="sm">header content</WizText>
        </>
      }
    />
  ),
};

export const MobileDevice: Story = {
  render: () => (
    <WizTimelineItem
      variant="success"
      title="Timeline（親）コンポーネントのdeviceがmobileの場合は、TimelineItem(子)コンポーネントも小さくなります"
      annotation="2022年6月17日"
      header={<WizText fontSize="sm">header content</WizText>}
    />
  ),
  decorators: [
    (Story) => (
      <TimelineContext.Provider
        value={{
          device: "mobile",
        }}
      >
        <Story />
      </TimelineContext.Provider>
    ),
  ],
};

export const MobileDeviceTag: Story = {
  render: () => (
    <WizTimelineItem
      variant="success"
      title="Timeline（親）コンポーネントのdeviceがmobileの場合は、TimelineItem(子)コンポーネントも小さくなります"
      annotation="2022年6月17日"
      header={<WizText fontSize="sm">header content</WizText>}
      tag="タグ"
    />
  ),
  decorators: [
    (Story) => (
      <TimelineContext.Provider
        value={{
          device: "mobile",
        }}
      >
        <Story />
      </TimelineContext.Provider>
    ),
  ],
};

export const Disabled: Story = {
  render: () => <Template disabled />,
};
