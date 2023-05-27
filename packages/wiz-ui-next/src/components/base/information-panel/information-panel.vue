<template>
  <div :class="[informationPanelStye]" v-show="visible">
    <div>
      <div
        v-for="message in messages"
        :key="message.text"
        :class="[
          informationPanelMessageStyle,
          informationPanelFontStyle[message.type],
        ]"
      >
        {{ message.text }}
      </div>
    </div>
    <div :class="[informationPanelIconStyle]">
      <WizVStack align="center">
        <WizIconButton variant="transparent" :icon="WizIClose" @click="close" />
      </WizVStack>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  informationPanelStye,
  informationPanelMessageStyle,
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
  modelValue: {
    type: Boolean,
    required: true,
  },
  messages: {
    type: Array as PropType<messageType[]>,
    required: true,
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
