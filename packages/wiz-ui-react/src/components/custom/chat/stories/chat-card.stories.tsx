/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { ComponentProps, useState } from "react";

import { WizChatCard } from "..";
import { Message } from "../components/types";

const meta: Meta<typeof WizChatCard> = {
  title: "Custom/Chat/Card",
  component: WizChatCard,
};

export default meta;
type Story = StoryObj<typeof WizChatCard>;

const dummyMessages: Message[] = [
  {
    message: "こんにちは、マネーキャリアスタッフの田中です。",
    sender: "other",
    username: "マネーキャリアスタッフ",
    time: new Date("2021-08-01T23:00:00.000+09:00"),
  },
  {
    message: "こんにちは、〇〇です。よろしくお願いします。",
    sender: "me",
    readers: [
      "マネーキャリアスタッフ1",
      "マネーキャリアスタッフ2",
      "マネーキャリアスタッフ3",
    ],
    time: new Date("2021-08-02T00:00:00.000+09:00"),
  },
  {
    message: "よろしくお願いします。",
    sender: "other",
    username: "マネーキャリアスタッフ",
    time: new Date("2021-08-02T01:00:00.000+09:00"),
  },
  {
    message: "面談者が時間になっても来ない場合は、どうすればいいですか？",
    sender: "me",
    readers: [
      "マネーキャリアスタッフ1",
      "マネーキャリアスタッフ2",
      "マネーキャリアスタッフ3",
    ],
    time: new Date("2021-08-02T02:00:00.000+09:00"),
  },
  {
    message: "不在申請ですね、承知しました少々お待ちください。",
    sender: "other",
    username: "マネーキャリアスタッフ",
    time: new Date("2021-08-02T03:00:00.000+09:00"),
  },
  {
    message:
      "こちらが申請条件になります。https://example.com/shinsei-zyoken ご確認いただいたあとこちらのリンクから必要事項を入力してください。https://example.com/shinsei-form",
    sender: "me",
    readers: [
      "マネーキャリアスタッフ1",
      "マネーキャリアスタッフ2",
      "マネーキャリアスタッフ3",
    ],
    time: new Date("2021-08-02T04:00:00.000+09:00"),
  },
];
const dummyStatusOptions: ComponentProps<typeof WizChatCard>["statusOptions"] =
  [
    {
      label: "ステータス１",
      value: 1,
    },
    {
      label: "ステータス２",
      value: 2,
    },
    {
      label: "ステータス３",
      value: 3,
    },
    {
      label: "ステータス４",
      value: 4,
    },
  ];

const templateArgs = {
  username: "マネーキャリアスタッフ",
  placeholder: "入力してください",
  messages: dummyMessages,
};

const OpenTemplate: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");
    buttons.forEach((button) => {
      if (button.children.length === 0) {
        userEvent.click(button);
      }
    });
  },
  parameters: {
    screenshot: {
      delay: 300,
    },
  },
};

export const Default: Story = {
  ...OpenTemplate,
  args: {
    ...templateArgs,
  },
};

export const FormRows: Story = {
  ...OpenTemplate,
  args: {
    ...templateArgs,
    formRows: 5,
  },
};

export const SomeonesTyping: Story = {
  ...OpenTemplate,
  args: {
    ...templateArgs,
    typingUsername: "なんとかかんとか",
  },
};

export const Status: Story = {
  ...OpenTemplate,
  args: {
    ...templateArgs,
    status: 1,
    statusOptions: dummyStatusOptions,
    statusPlaceholder: "ステータスを選択してください",
  },
};

export const Closed: Story = {
  args: {
    ...templateArgs,
  },
};

export const HaveNewMessage: Story = {
  args: {
    ...templateArgs,
    haveNewMessage: true,
  },
};

export const Playground: Story = {
  render: () => {
    const [messages, setMessages] = useState(dummyMessages);
    const [textValue, setTextValue] = useState("");
    const [haveNewMessage, setHaveNewMessage] = useState(true);
    const [status, setStatus] = useState<number | null>(null);
    return (
      <WizChatCard
        messages={messages}
        haveNewMessage={haveNewMessage}
        textValue={textValue}
        username="マネーキャリアスタッフ"
        placeholder="入力してください"
        statusPlaceholder="ステータスを選択してください"
        typingUsername="なんとかかんとか"
        status={status}
        statusOptions={dummyStatusOptions}
        onToggleOpen={() => setHaveNewMessage(false)}
        onChangeTextValue={(changed) => setTextValue(changed)}
        onChangeStatus={(changed) => setStatus(changed)}
        onSubmit={() => {
          if (!textValue) return;
          setMessages([
            ...messages,
            {
              message: textValue,
              sender: "me",
              readers: ["マネーキャリアスタッフ"],
              time: new Date(),
            },
          ]);
          setTextValue("");
        }}
      />
    );
  },
};
