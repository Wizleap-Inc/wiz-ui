<template>
  <WizBox
    position="fixed"
    :bottom="
      isOpen
        ? '0'
        : `calc(${THEME.fontSize.xl2} + ${THEME.spacing.md} * 2 - ${floatChatCardHeight}px)`
    "
    right="1.5rem"
    width="20rem"
    :transition="canAnimate ? 'bottom 0.3s ease-in-out' : undefined"
    ref="floatChatCardRef"
  >
    <WizCard shadow>
      <template #mainHeaderArea>
        <WizText color="gray.700" as="span" bold>
          {{ username }}
        </WizText>
        <div v-if="haveNewMessage" class="wiz-chat-card__have-new-message" />
      </template>
      <template #subHeaderArea>
        <WizIcon
          size="xl2"
          color="gray.500"
          :icon="isOpen ? WizIExpandMore : WizIExpandLess"
        />
      </template>
      <WizDivider />
      <WizVStack gap="xs" height="320px" overflow="scroll" ref="chatListRef">
        <template v-for="messages in displayMessages">
          <WizHStack justify="center" :key="messages.date.toDateString()">
            <WizTag
              :label="formatDateToMonthDayWeek(messages.date)"
              color="gray.900"
              backgroundColor="gray.300"
              fontSize="xs2"
            />
          </WizHStack>
          <WizChatItem
            v-for="(item, i) in messages.contents"
            :key="messages.date.toDateString() + i"
            :content="item"
            maxChatItemWidth="192px"
          />
        </template>
      </WizVStack>
      <template #footer>
        <WizChatForm
          v-model="textValue"
          @submit="onSubmit"
          :placeholder="placeholder"
        />
      </template>
    </WizCard>
    <button class="wiz-chat-card__open-btn" @click="toggleDisplay" />
  </WizBox>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";

import {
  WizBox,
  WizDivider,
  WizIcon,
  WizText,
  WizTag,
  WizVStack,
  WizHStack,
  WizCard,
  WizChatForm,
  WizChatItem,
  WizIExpandMore,
  WizIExpandLess,
} from "@/components";
import { THEME } from "@/constants";
import { useZIndex } from "@/hooks";
import { formatDateToMonthDayWeek } from "@/utils/date";

import { Message } from "..";

interface Props {
  value: string;
  username: string;
  placeholder?: string;
  messages: Message[];
  isOpen: boolean;
  haveNewMessage?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
});

interface Emit {
  (e: "input", value: string): void;
  (e: "submit"): void;
  (e: "toggleDisplay"): void;
}

const emits = defineEmits<Emit>();

const { nextZIndex } = useZIndex();

const canAnimate = ref(false);

const floatChatCardHeight = ref(0);
const floatChatCardRef = ref<InstanceType<typeof WizBox>>();
const chatListRef = ref<InstanceType<typeof WizVStack>>();

onMounted(() => {
  if (floatChatCardRef.value) {
    floatChatCardHeight.value = floatChatCardRef.value.$el.clientHeight;
  }
  setTimeout(() => {
    canAnimate.value = true;
  }, 0);
  if (chatListRef.value) {
    chatListRef.value.$el.scrollTo(0, chatListRef.value.$el.scrollHeight);
  }
});

interface DisplayMessage {
  date: Date;
  contents: Message[];
}

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

const textValue = computed({
  get: () => props.value,
  set: (value) => emits("input", value),
});

const onSubmit = () => emits("submit");

const toggleDisplay = () => emits("toggleDisplay");

const zIndex = nextZIndex();
const titleHeight = THEME.spacing.xl;
const titlePadding = THEME.spacing.md;
const red800 = THEME.color.red[800];
const spacingMax = THEME.spacing.max;
const fontSizeMd = THEME.fontSize.md;
</script>

<style lang="scss" scoped>
.wiz-chat-card {
  &__open-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(v-bind(titleHeight) + v-bind(titlePadding) * 2);
    border: none;
    cursor: pointer;
    background: transparent;
    z-index: v-bind(zIndex);
  }

  &__have-new-message {
    display: flex;
    align-items: center;
    justify-content: center;
    width: v-bind(fontSizeMd);
    height: v-bind(fontSizeMd);
    border-radius: v-bind(spacingMax);
    background: v-bind(red800);
  }
}
</style>
