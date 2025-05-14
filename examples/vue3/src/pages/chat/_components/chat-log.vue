<template>
  <WizBox ref="chatListRef" overflow-y="scroll" width="100%">
    <WizVStack gap="xs" py="xs">
      <template v-for="messages in displayMessages" :key="messages.date">
        <WizHStack justify="center">
          <WizTag
            :label="formatDateToMonthDayWeek(messages.date)"
            variant="mono"
            font-size="xs2"
          />
        </WizHStack>
        <WizChatItem
          v-for="(item, i) in messages.contents"
          :key="messages.date.toDateString() + i"
          :content="item"
          :max-chat-item-width="`200px`"
        />
      </template>
    </WizVStack>
  </WizBox>
</template>

<script setup lang="ts">
import {
  DisplayMessage,
  Message,
  WizBox,
  WizChatItem,
  WizHStack,
  WizTag,
  WizVStack,
} from "@wizleap-inc/wiz-ui-next";
import { formatDateToMonthDayWeek } from "@wizleap-inc/wiz-ui-utils";
import { PropType, computed, nextTick, onMounted, ref, watch } from "vue";

const props = defineProps({
  messages: {
    type: Array as PropType<Message[]>,
    required: true,
  },
});

const floatChatCardHeight = ref(0);
const floatChatCardRef = ref<InstanceType<typeof WizBox>>();
const chatListRef = ref<InstanceType<typeof WizVStack>>();

const updateFloatChatCardHeight = () => {
  if (floatChatCardRef.value) {
    floatChatCardHeight.value = floatChatCardRef.value.$el.clientHeight;
  }
};

onMounted(() => {
  updateFloatChatCardHeight();
  if (chatListRef.value) {
    chatListRef.value.$el.scrollTo(0, chatListRef.value.$el.scrollHeight);
  }
});

const displayMessages = computed(() => {
  const messages = props.messages;
  const displayMessages: DisplayMessage[] = [];
  messages.forEach((message) => {
    const date = new Date(message.time);
    const displayMessage = displayMessages.find(
      (displayMessage) =>
        displayMessage.date.getFullYear() === date.getFullYear() &&
        displayMessage.date.getMonth() === date.getMonth() &&
        displayMessage.date.getDate() === date.getDate()
    );
    if (displayMessage) {
      displayMessage.contents.push(message);
    } else {
      displayMessages.push({
        date,
        contents: [message],
      });
    }
  });
  return displayMessages;
});

watch(props.messages, () => {
  nextTick(() => {
    if (chatListRef.value) {
      chatListRef.value.$el.scrollTo(0, chatListRef.value.$el.scrollHeight);
    }
  });
});
watch(props, () => {
  nextTick(updateFloatChatCardHeight);
});
</script>
