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
    transition="bottom 0.3s ease-in-out"
    ref="floatChatCardRef"
  >
    <WizCard shadow :title="username">
      <template #subHeaderArea>
        <WizIcon
          size="xl2"
          color="gray.500"
          :icon="isOpen ? WizIExpandMore : WizIExpandLess"
        />
      </template>
      <WizDivider />
      <WizVStack gap="xs" height="320px" overflow="scroll" ref="chatListRef">
        <WizChatItem
          v-for="(item, i) in messages"
          :key="i"
          :content="item"
          :maxChatItemWidth="'192px'"
          :hideReadStatus="hideReadStatus"
          :hideTimestamp="hideTimestamp"
        />
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

import { WizBox, WizDivider, WizIcon, WizVStack } from "@/components/atoms";
import { WizIExpandMore, WizIExpandLess } from "@/components/icons";
import { WizCard, WizChatForm, WizChatItem } from "@/components/molecules";
import { THEME } from "@/constants";
import { useZIndex } from "@/hooks";
import { Message } from "@/types/components/chat";

interface Props {
  value: string;
  username: string;
  placeholder?: string;
  messages: Message[];
  isOpen: boolean;
  hideReadStatus?: boolean;
  hideTimestamp?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  hideReadStatus: false,
  hideTimestamp: false,
});

interface Emit {
  (e: "input", value: string): void;
  (e: "submit"): void;
  (e: "toggleDisplay"): void;
}

const emits = defineEmits<Emit>();

const { nextZIndex } = useZIndex();

const floatChatCardHeight = ref(0);
const floatChatCardRef = ref<InstanceType<typeof WizBox>>();
const chatListRef = ref<InstanceType<typeof WizVStack>>();

onMounted(() => {
  if (floatChatCardRef.value) {
    floatChatCardHeight.value = floatChatCardRef.value.$el.clientHeight;
  }
  if (chatListRef.value) {
    chatListRef.value.$el.scrollTo(0, chatListRef.value.$el.scrollHeight);
  }
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
</script>

<style lang="scss" scoped>
.wiz-chat-card__open-btn {
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
</style>
