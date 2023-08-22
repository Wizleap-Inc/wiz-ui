<template>
  <div
    :class="[informationPanelStyle, border && informationPanelBorderStyle]"
    :style="{ width }"
    v-show="visible"
  >
    <WizVStack gap="xs">
      <div
        v-for="message in messages"
        :key="message.text"
        :class="[informationPanelFontStyle[message.type]]"
      >
        {{ message.text }}
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
import { ComponentName, ARIA_LABELS } from "@wizleap-inc/wiz-ui-constants";
import {
  informationPanelStyle,
  informationPanelBorderStyle,
  informationPanelFontStyle,
  informationPanelIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/information-panel.css";
import { PropType, computed } from "vue";

import { WizIconButton, WizIClose } from "@/components";

import { WizVStack } from "../stack";

type messageType = {
  text: string;
  type: "default" | "error";
};

defineOptions({
  name: ComponentName.InformationPanel,
});

const props = defineProps({
  value: {
    type: Boolean,
    required: true,
  },
  messages: {
    type: Array as PropType<messageType[]>,
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
  (e: "input", value: boolean): void;
}

const emit = defineEmits<Emit>();

const visible = computed({
  get: () => props.value,
  set: (value: boolean) => emit("input", value),
});

const close = () => {
  visible.value = false;
};
</script>
