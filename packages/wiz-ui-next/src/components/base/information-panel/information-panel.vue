<template>
  <div
    v-show="visible"
    :class="[informationPanelStyle, border && informationPanelBorderStyle]"
    :style="{ width }"
  >
    <WizVStack gap="xs">
      <div v-for="(message, i) in messages" :key="i">
        <template v-if="isTextMessage(message)">
          <div :class="[informationPanelFontStyle[message.type]]">
            {{ message.text }}
          </div>
        </template>
        <template v-else>
          <component :is="message" />
        </template>
      </div>
    </WizVStack>
    <WizVStack>
      <WizIconButton
        variant="transparent"
        :icon="WizIClose"
        :ariaLabel="ARIA_LABELS.INFORMATION_PANEL.CLOSE"
        @click="close"
      />
    </WizVStack>
  </div>
</template>
<script setup lang="ts">
import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  informationPanelBorderStyle,
  informationPanelFontStyle,
  informationPanelStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/information-panel.css";
import { Component as ComponentType, PropType, computed } from "vue"; // Componentの場合、<component>タグと競合するためエイリアスをつける

import { WizIClose, WizIconButton } from "@/components";

import { WizVStack } from "../stack";

type TextMessage = {
  text: string;
  type: "default" | "error";
};

defineOptions({
  name: ComponentName.InformationPanel,
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  messages: {
    type: Array as PropType<(TextMessage | ComponentType)[]>,
    required: true,
  },
  width: {
    type: String,
    required: false,
  },
  border: {
    type: Boolean,
    required: false,
    default: false,
  },
});

interface Emit {
  (e: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<Emit>();

const isTextMessage = (
  message: TextMessage | ComponentType
): message is TextMessage => {
  return (
    typeof message === "object" &&
    message !== null &&
    "text" in message &&
    "type" in message &&
    (message.type === "default" || message.type === "error")
  );
};

const visible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const close = () => {
  visible.value = false;
};
</script>
