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
    :transition="`bottom ${canAnimate ? '0.3s' : '0s'} ease-in-out`"
    ref="floatChatCardRef"
    zIndex="floating"
  >
    <WizCard shadow align="stretch">
      <template #mainHeaderArea>
        <WizHStack align="center" gap="xs2">
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
        </WizHStack>
      </template>
      <template #subHeaderArea>
        <WizIcon
          size="xl2"
          color="gray.500"
          :icon="isOpen ? WizIExpandMore : WizIExpandLess"
        />
      </template>
      <WizDivider />
      <WizBox overflowY="scroll" ref="chatListRef">
        <WizVStack gap="xs" py="xs" height="320px">
          <template
            v-for="messages in displayMessages"
            :key="messages.date.toDateString()"
          >
            <WizHStack justify="center">
              <WizTag
                :label="formatDateToMonthDayWeek(messages.date)"
                variant="mono"
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
        <WizVStack width="100%" justify="end" gap="xs">
          <WizChatForm
            v-model="textValue"
            @submit="onSubmit"
            :placeholder="placeholder"
            :formRows="formRows"
          />
          <WizHStack v-if="status !== undefined && statusOptions !== undefined">
            <WizSelectBox
              :options="statusOptions"
              v-model="statusValue"
              :placeholder="statusPlaceholder"
              expand
            />
            <div
              :style="{
                width: THEME.spacing.xl4,
                flexShrink: 0,
              }"
            />
          </WizHStack>
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
import { computed, nextTick, onMounted, ref, watch, PropType } from "vue";

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
  WizSelectBox,
} from "@/components";
import { SelectBoxOption } from "@/components/base/inputs/selectbox/types";

import { DisplayMessage, Message } from "..";

defineOptions({
  name: ComponentName.ChatCard,
});

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  messages: {
    type: Array as PropType<Message[]>,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
  haveNewMessage: {
    type: Boolean,
    required: false,
  },
  formRows: {
    type: Number,
    required: false,
  },
  typingUsername: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    required: false,
  },
  statusOptions: {
    type: Array as PropType<SelectBoxOption[]>,
    required: false,
  },
  statusPlaceholder: {
    type: String,
    required: false,
  },
});

interface Emit {
  (e: "update:modelValue", value: string): void;
  (e: "submit"): void;
  (e: "toggleDisplay"): void;
  (e: "update:status", value: number): void;
}

const emits = defineEmits<Emit>();

const canAnimate = ref(false);

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

const textValue = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

const statusValue = computed({
  get: () => props.status || NaN,
  set: (value) => value && emits("update:status", value),
});

const onSubmit = () => emits("submit");

const toggleDisplay = () => {
  canAnimate.value = true;
  emits("toggleDisplay");
  nextTick(() => (canAnimate.value = false));
};
</script>
