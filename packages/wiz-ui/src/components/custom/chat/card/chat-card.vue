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
    zIndex="floating"
  >
    <WizCard shadow align="stretch">
      <template #mainHeaderArea>
        <WizText color="gray.700" as="span" bold>
          {{ username }}
        </WizText>
        <WizBox
          v-if="haveNewMessage"
          :width="THEME.fontSize.md"
          :height="THEME.fontSize.md"
          bgColor="red.800"
          round="max"
        />
      </template>
      <template #subHeaderArea>
        <WizIcon
          size="xl2"
          color="gray.500"
          :icon="isOpen ? WizIExpandMore : WizIExpandLess"
        />
      </template>
      <WizDivider />
      <WizBox overflowY="scroll">
        <WizVStack gap="xs" py="xs" height="320px" ref="chatListRef">
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
      </WizBox>
      <template #footer>
        <WizChatForm
          v-model="textValue"
          @submit="onSubmit"
          :placeholder="placeholder"
          :formRows="formRows"
        />
        <WizVStack height="1.125rem" width="100%" justify="end">
          <WizText v-if="typingUsername" color="gray.600" as="p" fontSize="xs2">
            <WizText as="span" bold fontSize="xs2" color="gray.700">
              {{ typingUsername }}
            </WizText>
            さんが入力しています...
          </WizText>
        </WizVStack>
      </template>
    </WizCard>
    <button :class="chatCardOpenButtonStyle" @click="toggleDisplay" />
  </WizBox>
</template>

<script setup lang="ts">
import { THEME, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { chatCardOpenButtonStyle } from "@wizleap-inc/wiz-ui-styles/customs/chat-card.css";
import { formatDateToMonthDayWeek } from "@wizleap-inc/wiz-ui-utils";
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

import { Message, DisplayMessage } from "..";

defineOptions({
  name: ComponentName.ChatCard,
});

interface Props {
  value: string;
  username: string;
  placeholder?: string;
  messages: Message[];
  isOpen: boolean;
  haveNewMessage?: boolean;
  formRows?: number;
  typingUsername?: string;
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
</script>
