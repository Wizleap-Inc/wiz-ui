<template>
  <div>Chat</div>
  <WizChatCard
    v-model="newMessage"
    username="username"
    placeholder="placeholder"
    statusPlaceholder="statusPlaceholder"
    typingUsername="typingUsername"
    :messages="messages"
    :isOpen="isFloatingMenuOpen"
    :haveNewMessage="haveNewMessage"
    :status="status"
    :statusOptions="STATUS_OPTIONS"
    @updateStatus="status = $event"
    @toggleDisplay="toggleDisplay"
    @input="() => {}"
    @submit="() => postMessage()"
  />
</template>

<script setup lang="ts">
import { WizChatCard } from "@wizleap-inc/wiz-ui-next";
import { SelectBoxOption } from "@wizleap-inc/wiz-ui-next/dist/components/base/inputs/selectbox/types";
import { Message } from "@wizleap-inc/wiz-ui-next/dist/components/custom/chat/types";
import { ref } from "vue";
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
const templateMessages: Message[] = [
  {
    message: "こんにちは、マネーキャリアスタッフの××です。",
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
  messages.value.push({
    message: newMessage.value,
    sender: "me",
    readers: ["マネーキャリアスタッフ"],
    time: new Date("2022-08-02T04:00:00.000+09:00"),
  });
  newMessage.value = "";
};
</script>
