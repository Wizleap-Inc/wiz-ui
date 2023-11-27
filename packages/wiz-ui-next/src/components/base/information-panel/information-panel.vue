<template>
  <div
    :class="[informationPanelStyle, border && informationPanelBorderStyle]"
    :style="{ width }"
    v-show="visible"
  >
    <WizVStack gap="xs">
      <!--メッセージの内容はv-htmlで描画される-->
      <div
        v-for="message in messages"
        :key="message.text"
        v-html="message.text"
        :class="[informationPanelFontStyle[message.type]]"
      />
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

import { WizIClose, WizIconButton } from "@/components";

import { WizVStack } from "../stack";

type messageType = {
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
