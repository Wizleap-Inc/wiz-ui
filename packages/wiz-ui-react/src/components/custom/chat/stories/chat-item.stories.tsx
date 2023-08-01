import { Meta, StoryObj } from "@storybook/react";

import { WizChatItem } from "..";
import { Message } from "../components/types";

const meta: Meta<typeof WizChatItem> = {
  title: "Custom/Chat/Item",
  component: WizChatItem,
};

export default meta;
type Story = StoryObj<typeof WizChatItem>;

const dummyContent: Record<string, Message> = {
  others: {
    message: "こんにちは",
    sender: "other",
    time: new Date("2021-01-01T00:00:00.000+09:00"),
  },
  mine: {
    message: "こんにちは",
    sender: "me",
    time: new Date("2021-01-01T00:00:00.000+09:00"),
  },
};

export const ChatItemOwner: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content 300px",
        gridGap: "1rem",
        alignItems: "center",
      }}
    >
      <div>me</div>
      <div>
        <WizChatItem {...args} content={dummyContent.mine} />
      </div>
      <div>other</div>
      <div>
        <WizChatItem {...args} content={dummyContent.others} />
      </div>
    </div>
  ),
};

export const ChatItemRead: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content 300px",
        gridGap: "1rem",
        alignItems: "center",
      }}
    >
      <div>readers=undefined</div>
      <div>
        <WizChatItem
          {...args}
          content={{ ...dummyContent.mine, readers: undefined }}
        />
      </div>
      <div>readers=[]</div>
      <div>
        <WizChatItem
          {...args}
          content={{ ...dummyContent.mine, readers: [] }}
        />
      </div>
      <div>readers=[&apos;man1&apos;]</div>
      <div>
        <WizChatItem
          {...args}
          content={{ ...dummyContent.mine, readers: ["man1"] }}
        />
      </div>
      <div>readers=[&apos;man1&apos;, &apos;man2&apos;]</div>
      <div>
        <WizChatItem
          {...args}
          content={{ ...dummyContent.mine, readers: ["man1", "man2"] }}
        />
      </div>
    </div>
  ),
};

export const ChatItemUsername: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content 300px",
        gridGap: "1rem",
        alignItems: "center",
      }}
    >
      <div>me</div>
      <div>
        <WizChatItem
          {...args}
          content={{ ...dummyContent.mine, username: "マネーキャリアスタッフ" }}
        />
      </div>
      <div>other</div>
      <div>
        <WizChatItem
          {...args}
          content={{
            ...dummyContent.others,
            username: "マネーキャリアスタッフ",
          }}
        />
      </div>
    </div>
  ),
};

export const ChatItemWithLink: Story = {
  args: {
    content: {
      message:
        "こんにちは、こちらがHPになります。https://wizleap.co.jp ご確認いただいたあとこちらのリンクからご返信ください。https://example.com",
      sender: "other",
      time: new Date("2021-01-01T00:00:00.000+09:00"),
    },
  },
};
