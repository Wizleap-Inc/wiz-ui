<template>
  <div
    :class="[informationPanelStyle, border && informationPanelBorderStyle]"
    :style="{ width }"
    v-show="visible"
  >
    <WizVStack gap="xs">
      <div v-for="message in messages" :key="message.text || message.type">
        <WizAnchor
          v-if="message.type === 'anchor'"
          v-bind="message.anchorProps"
          :to="message.anchorProps?.to"
        >
          {{ message.text }}
        </WizAnchor>
        <div v-else :class="[informationPanelFontStyle[message.type]]">
          {{ message.text }}
        </div>
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
import { PropType, computed } from "vue";

import { WizAnchor, WizIClose, WizIconButton } from "@/components";

import { WizVStack } from "../stack";

type MessageType = {
  text: string;
  type: "default" | "error" | "anchor";
  anchorProps?: typeof WizAnchor;
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
    type: Array as PropType<MessageType[]>,
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

const visible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const close = () => {
  visible.value = false;
};
</script>
