import { Meta, StoryFn, StoryObj } from "@storybook/react";

import {
  WizMenuItem,
  WizDivider,
  WizIHelp,
  WizUnstyledTable,
  WizUnstyledTbody,
  WizUnstyledTr,
  WizUnstyledTd,
  WizText,
  WizHStack,
  WizVStack,
  WizMessageBox,
  WizIInfo,
  WizIArrowRight,
  WizAnchor,
  WizIcon,
} from "@/components";
import { useBreakpoint } from "@/hooks/use-breakpoint";

import { WizTimeline, WizTimelineItem } from "..";

const meta: Meta<typeof WizTimeline> = {
  title: "Custom/Timeline",
  component: WizTimeline,
};

export default meta;
type Story = StoryObj<typeof WizTimeline>;

const Template: StoryFn<typeof WizTimeline> = (args) => (
  <WizTimeline {...args}>
    <WizTimelineItem title="Title" />
    <WizTimelineItem title="Title" tag="Tag" />
    <WizTimelineItem title="Title" tag="Tag" annotation="2023年12月9日" />
    <WizTimelineItem
      title="Title"
      tag="Tag"
      annotation="2023年12月9日"
      variant="failure"
    />
    <WizTimelineItem
      title="Title"
      tag="Tag"
      annotation="2023年12月9日"
      variant="failure"
    >
      SLOT
    </WizTimelineItem>
    <WizTimelineItem
      title="Title"
      tag="Tag"
      annotation="2023年12月9日"
      variant="failure"
      footer={
        <>
          <WizDivider />
          <WizMenuItem label="FOOTER" expand />
        </>
      }
    >
      SLOT
    </WizTimelineItem>
  </WizTimeline>
);

export const Large: Story = {
  render: () => <Template device="pc" />,
};

export const Small: Story = {
  render: () => <Template device="mobile" />,
};

const PlaygroundTemplate: StoryFn<typeof WizTimeline> = () => {
  const bp = useBreakpoint();
  const device = bp === "sm" ? "mobile" : "pc";
  const sectionFontSize = bp === "sm" ? "sm" : "lg";

  return (
    <WizTimeline device={device}>
      <WizTimelineItem
        variant="success"
        tag="面談終了"
        title="面談レポート提出完了しました"
        annotation="2022年6月17日"
      >
        <WizUnstyledTable space="sm" width="100%">
          <WizUnstyledTbody>
            <WizUnstyledTr>
              <WizUnstyledTd align="left" width="80px">
                <WizText fontSize="xs">相談日時</WizText>
              </WizUnstyledTd>
              <WizUnstyledTd align="left">
                <WizHStack align="start" justify="between">
                  <WizVStack>
                    <WizText bold fontSize={sectionFontSize}>
                      <WizText
                        as="span"
                        bold
                        fontSize={sectionFontSize}
                        display="inline-block"
                      >
                        2022年6月17日
                      </WizText>
                      <WizText
                        as="span"
                        bold
                        fontSize={sectionFontSize}
                        display="inline-block"
                      >
                        10:00 ~ 11:00
                      </WizText>
                    </WizText>
                    <WizMessageBox
                      title="相談者が時間になっても現れない場合"
                      variant="caution"
                      icon={WizIInfo}
                      expand
                      v-if="bp !== 'sm'"
                    >
                      <WizText fontSize="sm">
                        相談者が数分でも遅れた場合、早急にマネーキャリアまでご連絡ください。
                        <br />
                        すぐにマネーキャリアから相談者に連絡を取ります。
                        <br />
                        申請後、相談開始時間から30分は、そのまま待機をお願いいたします。
                      </WizText>
                      <WizAnchor
                        href="https://wizleap.co.jp"
                        openInNewTab={true}
                        icon={WizIArrowRight}
                      >
                        マネーキャリアに連絡する（相談者不在申請）
                      </WizAnchor>
                    </WizMessageBox>
                  </WizVStack>
                  <WizIcon icon={WizIInfo} color="yellow.800" />
                </WizHStack>
              </WizUnstyledTd>
            </WizUnstyledTr>
            <WizUnstyledTr>
              <WizUnstyledTd align="left">
                <WizText fontSize="xs">相談場所</WizText>
              </WizUnstyledTd>
              <WizUnstyledTd>
                <WizText bold fontSize={sectionFontSize}>
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
                <WizText bold fontSize={sectionFontSize}>
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
                  <WizText bold fontSize={sectionFontSize}>
                    配信済み
                  </WizText>
                  <WizIcon icon={WizIHelp} />
                </WizHStack>
              </WizUnstyledTd>
            </WizUnstyledTr>
          </WizUnstyledTbody>
        </WizUnstyledTable>
      </WizTimelineItem>
      <WizTimelineItem title="Title" />
      <WizTimelineItem title="Title" disabled />
      <WizTimelineItem title="Title" tag="Tag" />
      <WizTimelineItem title="Title" tag="Tag" annotation="2023年12月9日" />
      <WizTimelineItem
        title="Title"
        tag="Tag"
        annotation="2023年12月9日"
        variant="failure"
      />
      <WizTimelineItem
        title="Title"
        tag="Tag"
        annotation="2023年12月9日"
        variant="failure"
      >
        SLOT
      </WizTimelineItem>
      <WizTimelineItem
        title="Title"
        tag="Tag"
        annotation="2023年12月9日"
        variant="failure"
        footer={
          <>
            <WizDivider />
            <WizMenuItem label="FOOTER" expand />
          </>
        }
      >
        SLOT
      </WizTimelineItem>
    </WizTimeline>
  );
};

export const Playground: Story = {
  render: PlaygroundTemplate,
};
