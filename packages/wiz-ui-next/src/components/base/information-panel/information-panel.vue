<template>
  <div
    :class="[informationPanelStyle, border && informationPanelBorderStyle]"
    :style="{ width }"
    v-show="visible"
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
    <div :class="[informationPanelIconStyle]">
      <WizVStack align="center">
        <WizIconButton
          variant="transparent"
          :icon="WizIClose"
          @click="close"
          :ariaLabel="ARIA_LABELS.INFORMATION_PANEL.CLOSE"
        />
      </WizVStack>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  informationPanelBorderStyle,
  informationPanelFontStyle,
  informationPanelIconStyle,
  informationPanelStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/information-panel.css";
import { PropType, computed, VNode } from "vue";

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
  /**
   * typeによって表示するメッセージをカスタマイズします。
   * リンクを表示する場合は、`type=anchor`とし、`anchorProps`に`WizAnchor`のpropsを渡してください。
   */
  messages: {
    type: Array as PropType<(TextMessage | VNode)[]>,
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
  message: TextMessage | VNode
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
