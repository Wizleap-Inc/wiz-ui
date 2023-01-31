import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

import { WizBox } from "@/components";
import { SelectBoxOption } from "@/components/base/inputs/selectbox/types";

import { Message } from "..";

import { WizChatCard } from ".";

export default {
  title: "Custom/Chat/Card",
  component: WizChatCard,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    username: {
      control: {
        type: "text",
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
    messages: {
      control: {
        type: "object",
      },
    },
    isOpen: {
      control: {
        type: "boolean",
      },
    },
    formRows: {
      control: {
        type: "number",
      },
    },
    haveNewMessage: {
      control: { type: "boolean" },
    },
    typingUsername: {
      control: { type: "text" },
    },
    status: {
      control: { type: "number" },
    },
    statusOptions: {
      control: { type: "object" },
    },
    statusPlaceholder: {
      control: { type: "text" },
    },
    toggleDisplay: {
      action: "toggleDisplay",
    },
    input: {
      action: "input",
    },
    submit: {
      action: "submit",
    },
  },
} as Meta<typeof WizChatCard>;

const templateMessages: Message[] = [
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

const templateArgs = {
  username: "マネーキャリアスタッフ",
  placeholder: "入力してください",
  messages: templateMessages,
};

const Template: StoryFn<typeof WizChatCard> = (args) => ({
  components: { WizChatCard, WizBox },
  setup() {
    const newMessage = ref("");
    return { newMessage, args };
  },
  template: `<WizChatCard v-bind="args" v-model="newMessage" @toggleDisplay="args.toggleDisplay" @update:modelValue="args.input" @submit="args.submit" />`,
});

export const Open = Template.bind({});
Open.args = {
  ...templateArgs,
  isOpen: true,
};
Open.parameters = {
  docs: {
    description: {
      story:
        "`isOpen` で Chat Card のコンテンツが開いているかどうかを指定します。",
    },
    source: {
      code: `
<script lang="ts" setup>
  const templateArgs = {
    username: "マネーキャリアスタッフ",
    placeholder: "入力してください",
    messages: [
      {
        message: "こんにちは、マネーキャリアスタッフの田中です。",
        sender: "other",
        username: "マネーキャリアスタッフ",
        time: new Date("2021-08-01T23:00:00.000+09:00"),
      },
      {
        message: "こんにちは、〇〇です。よろしくお願いします。",
        sender: "me",
        read: true,
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
        read: true,
        time: new Date("2021-08-02T02:00:00.000+09:00"),
      },
      {
        message: "不在申請ですね、承知しました少々お待ちください。",
        sender: "other",
        username: "マネーキャリアスタッフ",
        time: new Date("2021-08-02T03:00:00.000+09:00"),
      },
    ],
  };
</script>
<template>
  <WizChatCard v-bind="templateArgs" isOpen v-model="newMessage" @toggleDisplay="toggleDisplay" @input="input" @submit="submit" />
</template>
      `,
    },
  },
};

export const FormRows = Template.bind({});
FormRows.args = {
  ...templateArgs,
  isOpen: true,
  formRows: 5,
};
FormRows.parameters = {
  docs: {
    description: {
      story: "`formRows` で入力フォームの行を指定することができます。",
    },
    source: {
      code: `
<script lang="ts" setup>
  const templateArgs = {
    username: "マネーキャリアスタッフ",
    placeholder: "入力してください",
    messages: [
      {
        message: "こんにちは、マネーキャリアスタッフの田中です。",
        sender: "other",
        username: "マネーキャリアスタッフ",
        time: new Date("2021-08-01T23:00:00.000+09:00"),
      },
      {
        message: "こんにちは、〇〇です。よろしくお願いします。",
        sender: "me",
        read: true,
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
        read: true,
        time: new Date("2021-08-02T02:00:00.000+09:00"),
      },
      {
        message: "不在申請ですね、承知しました少々お待ちください。",
        sender: "other",
        username: "マネーキャリアスタッフ",
        time: new Date("2021-08-02T03:00:00.000+09:00"),
      },
    ],
  };
</script>
<template>
  <WizChatCard v-bind="templateArgs" isOpen :formRows="5" v-model="newMessage" @toggleDisplay="toggleDisplay" @input="input" @submit="submit" />
</template>
      `,
    },
  },
};

export const SomeonesTyping = Template.bind({});
SomeonesTyping.args = {
  ...templateArgs,
  isOpen: true,
  typingUsername: "なんとかかんとか",
};
const STATUS_OPTIONS: SelectBoxOption[] = [
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

export const Status = Template.bind({});
Status.args = {
  ...templateArgs,
  isOpen: true,
  status: 1,
  statusOptions: STATUS_OPTIONS,
  statusPlaceholder: "ステータスを選択してください",
};
Status.parameters = {
  docs: {
    description: {
      story:
        "`typingUsername` で現在入力しているユーザーを他のユーザーに通知します。 ",
    },
    source: {
      code: `
<script lang="ts" setup>
  const templateArgs = {
    username: "マネーキャリアスタッフ",
    placeholder: "入力してください",
    messages: [
      {
        message: "こんにちは、マネーキャリアスタッフの田中です。",
        sender: "other",
        username: "マネーキャリアスタッフ",
        time: new Date("2021-08-01T23:00:00.000+09:00"),
      },
      {
        message: "こんにちは、〇〇です。よろしくお願いします。",
        sender: "me",
        read: true,
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
        read: true,
        time: new Date("2021-08-02T02:00:00.000+09:00"),
      },
      {
        message: "不在申請ですね、承知しました少々お待ちください。",
        sender: "other",
        username: "マネーキャリアスタッフ",
        time: new Date("2021-08-02T03:00:00.000+09:00"),
      },
    ],
  };
</script>
<template>
  <WizChatCard v-bind="templateArgs" isOpen typingUsername="なんとかかんとか" v-model="newMessage" @toggleDisplay="toggleDisplay" @input="input" @submit="submit" />
</template>
      `,
    },
  },
};

export const Closed = Template.bind({});
Closed.args = {
  ...templateArgs,
  isOpen: false,
};
Closed.parameters = {
  docs: {
    description: {
      story: "`isOpen = false` で Chat Card を閉じます。 ",
    },
    source: {
      code: `
<script lang="ts" setup>
  const templateArgs = {
    username: "マネーキャリアスタッフ",
    placeholder: "入力してください",
    messages: [
      {
        message: "こんにちは、マネーキャリアスタッフの田中です。",
        sender: "other",
        username: "マネーキャリアスタッフ",
        time: new Date("2021-08-01T23:00:00.000+09:00"),
      },
      {
        message: "こんにちは、〇〇です。よろしくお願いします。",
        sender: "me",
        read: true,
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
        read: true,
        time: new Date("2021-08-02T02:00:00.000+09:00"),
      },
      {
        message: "不在申請ですね、承知しました少々お待ちください。",
        sender: "other",
        username: "マネーキャリアスタッフ",
        time: new Date("2021-08-02T03:00:00.000+09:00"),
      },
    ],
  };
</script>
<template>
  <WizChatCard v-bind="templateArgs" :isOpen="false" v-model="newMessage" @toggleDisplay="toggleDisplay" @input="input" @submit="submit" />
</template>
      `,
    },
  },
};

export const HaveNewMessage = Template.bind({});
HaveNewMessage.args = {
  ...templateArgs,
  isOpen: false,
  haveNewMessage: true,
};
HaveNewMessage.parameters = {
  docs: {
    description: {
      story: "`haveNewMessage` を指定することで、Notification が表示されます。",
    },
    source: {
      code: `
<script lang="ts" setup>
  const templateArgs = {
    username: "マネーキャリアスタッフ",
    placeholder: "入力してください",
    messages: [
      {
        message: "こんにちは、マネーキャリアスタッフの田中です。",
        sender: "other",
        username: "マネーキャリアスタッフ",
        time: new Date("2021-08-01T23:00:00.000+09:00"),
      },
      {
        message: "こんにちは、〇〇です。よろしくお願いします。",
        sender: "me",
        read: true,
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
        read: true,
        time: new Date("2021-08-02T02:00:00.000+09:00"),
      },
      {
        message: "不在申請ですね、承知しました少々お待ちください。",
        sender: "other",
        username: "マネーキャリアスタッフ",
        time: new Date("2021-08-02T03:00:00.000+09:00"),
      },
    ],
  };
</script>
<template>
  <WizChatCard v-bind="templateArgs" haveNewMessage isOpen  v-model="newMessage" @toggleDisplay="toggleDisplay" @input="input" @submit="submit" />
</template>
      `,
    },
  },
};

const PlaygroundTemplate: StoryFn<typeof WizChatCard> = (args) => ({
  components: { WizChatCard, WizBox },
  setup() {
    const haveNewMessage = ref(true);
    const isFloatingMenuOpen = ref(false);
    const messages = ref(templateArgs.messages);
    const newMessage = ref("");
    const status = ref(0);
    const toggleDisplay = () => {
      if (!isFloatingMenuOpen.value) haveNewMessage.value = false;
      isFloatingMenuOpen.value = !isFloatingMenuOpen.value;
    };
    const postMessage = () => {
      if (newMessage.value === "") return;
      messages.value.push({
        message: newMessage.value,
        sender: "me",
        readers: ["マネーキャリアスタッフ"],
        time: new Date("2022-08-02T04:00:00.000+09:00"),
      });
      newMessage.value = "";
    };
    return {
      messages,
      newMessage,
      haveNewMessage,
      status,
      STATUS_OPTIONS,
      isFloatingMenuOpen,
      toggleDisplay,
      postMessage,
      args,
    };
  },
  template: `
    <WizChatCard
      v-bind="args"
      v-model="newMessage"
      :messages="messages"
      :isOpen="isFloatingMenuOpen"
      :haveNewMessage="haveNewMessage"
      v-model:status="status"
      :statusOptions="STATUS_OPTIONS"
      @toggleDisplay="() => {
        args.toggleDisplay();
        toggleDisplay();
      }"
      @update:modelValue="args.input"
      @submit="() => {
        args.submit();
        postMessage();
      }"
    />
  `,
});

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  username: templateArgs.username,
  placeholder: templateArgs.placeholder,
  statusPlaceholder: "ステータスを選択してください",
  typingUsername: "なんとかかんとか",
};
