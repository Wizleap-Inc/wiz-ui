import { StoryFn } from "@storybook/vue";
import { computed } from "vue";

import {
  WizMenuItem,
  WizDivider,
  WizUnstyledTable,
  WizUnstyledTbody,
  WizUnstyledTr,
  WizUnstyledTd,
  WizText,
  WizHStack,
  WizVStack,
  WizIInfo,
  WizIHelp,
  WizIArrowRight,
  WizIcon,
  WizMessageBox,
  WizAnchor,
} from "@/components";
import { useBreakpoint } from "@/hooks/use-breakpoint";

import { WizTimeline, WizTimelineItem } from "..";

export default {
  title: "Custom/Timeline",
  component: WizTimeline,
  argTypes: {
    bp: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

const Template: StoryFn<typeof WizTimeline> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTimeline, WizTimelineItem, WizMenuItem, WizDivider },
  template: `
  <WizTimeline v-bind="$props">
    <WizTimelineItem title="Title"/>
    <WizTimelineItem title="Title" tag="Tag"/>
    <WizTimelineItem title="Title" tag="Tag" annotation="2023年12月9日"/>
    <WizTimelineItem title="Title" tag="Tag" annotation="2023年12月9日" variant="failure"/>
    <WizTimelineItem title="Title" tag="Tag" annotation="2023年12月9日" variant="failure">
      SLOT
    </WizTimelineItem>
    <WizTimelineItem title="Title" tag="Tag" annotation="2023年12月9日" variant="failure">
      SLOT
      <template #footer>
        <WizDivider/>
        <WizMenuItem label="FOOTER" active expand />
      </template>
    </WizTimelineItem>
  </WizTimeline>
  `,
});

export const Large = Template.bind({});
Large.args = {
  bp: "lg",
};

export const Small = Template.bind({});
Small.args = {
  bp: "sm",
};

export const Playground: StoryFn<typeof WizTimeline> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    WizTimeline,
    WizTimelineItem,
    WizMenuItem,
    WizDivider,
    WizUnstyledTable,
    WizUnstyledTbody,
    WizUnstyledTr,
    WizUnstyledTd,
    WizText,
    WizIcon,
    WizHStack,
    WizVStack,
    WizMessageBox,
    WizAnchor,
  },
  setup() {
    const bp = useBreakpoint();
    const sectionFontSize = computed(() => (bp.value === "sm" ? "sm" : "lg"));
    return { bp, sectionFontSize, WizIInfo, WizIHelp, WizIArrowRight };
  },
  template: `
    <WizTimeline :bp="bp">
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
              <WizText fontSize="xs">
                相談日時
              </WizText>
            </WizUnstyledTd>
            <WizUnstyledTd align="left">
              <WizHStack align="start" justify="between">
                <WizVStack>
                  <WizText bold :fontSize="sectionFontSize">
                    <WizText as="span" bold :fontSize="sectionFontSize" display="inline-block">
                      2022年6月17日
                    </WizText>
                    <WizText as="span" bold :fontSize="sectionFontSize" display="inline-block">
                      10:00 ~ 11:00
                    </WizText>
                  </WizText>
                  <WizMessageBox
                    title="相談者が時間になっても現れない場合"
                    variant="caution"
                    :icon="WizIInfo"
                    expand
                    v-if="bp !== 'sm'"
                  >
                    <WizText fontSize="sm">
                      相談者が数分でも遅れた場合、早急にマネーキャリアまでご連絡ください。<br />
                      すぐにマネーキャリアから相談者に連絡を取ります。<br />
                      申請後、相談開始時間から30分は、そのまま待機をお願いいたします。
                    </WizText>
                    <WizAnchor href="https://wizleap.co.jp" target="_blank" rel="noopener" :icon="WizIArrowRight">
                      マネーキャリアに連絡する（相談者不在申請）
                    </WizAnchor>
                  </WizMessageBox>
                </WizVStack>
                <WizIcon :icon="WizIInfo" color="yellow.800" />
              </WizHStack>
            </WizUnstyledTd>
          </WizUnstyledTr>
          <WizUnstyledTr>
            <WizUnstyledTd align="left">
              <WizText fontSize="xs">
                相談場所
              </WizText>
            </WizUnstyledTd>
            <WizUnstyledTd>
              <WizText bold :fontSize="sectionFontSize">
                オンライン
              </WizText>
            </WizUnstyledTd>
          </WizUnstyledTr>
          <WizUnstyledTr>
            <WizUnstyledTd />
            <WizUnstyledTd>
              <WizHStack align="center" wrap>
                <WizText fontSize="sm" as="span">
                  ※ビデオ面談URL：
                </WizText>
                <WizText bold color="red.800" as="span" fontSize="sm">
                  未設定
                </WizText>
                <WizIcon :icon="WizIInfo" color="red.800" />
              </WizHStack>
            </WizUnstyledTd>
          </WizUnstyledTr>
          <WizUnstyledTr>
            <WizUnstyledTd align="left">
              <WizText fontSize="xs">
                専門家
              </WizText>
            </WizUnstyledTd>
            <WizUnstyledTd>
              <WizText bold :fontSize="sectionFontSize">
                専門 タロウ
              </WizText>
            </WizUnstyledTd>
          </WizUnstyledTr>
          <WizUnstyledTr>
            <WizUnstyledTd align="left">
              <WizText fontSize="xs">
                前日の挨拶
              </WizText>
            </WizUnstyledTd>
            <WizUnstyledTd>
              <WizHStack align="center" justify="between">
                <WizText bold :fontSize="sectionFontSize">
                  配信済み
                </WizText>
                <WizIcon :icon="WizIHelp"/>
              </WizHStack>
            </WizUnstyledTd>
          </WizUnstyledTr>
        </WizUnstyledTbody>
      </WizUnstyledTable>
      <template #footer>
        <WizDivider />
        <WizMenuItem label="編集" active expand />
        <WizDivider />
        <WizMenuItem label="面談日程追加" active expand />
        <WizDivider />
        <WizMenuItem label="相談者不在申請" active expand />
      </template>
    </WizTimelineItem>
    <WizTimelineItem title="Title"/>
    <WizTimelineItem title="Title" disabled />
    <WizTimelineItem title="Title" tag="Tag"/>
    <WizTimelineItem title="Title" tag="Tag" annotation="2023年12月9日"/>
    <WizTimelineItem title="Title" tag="Tag" annotation="2023年12月9日" variant="failure"/>
    <WizTimelineItem title="Title" tag="Tag" annotation="2023年12月9日" variant="failure">
      SLOT
    </WizTimelineItem>
    <WizTimelineItem title="Title" tag="Tag" annotation="2023年12月9日" variant="failure">
      SLOT
      <template #footer>
        <WizDivider/>
        <WizMenuItem label="FOOTER" active expand />
      </template>
    </WizTimelineItem>
  </WizTimeline>
  `,
});
