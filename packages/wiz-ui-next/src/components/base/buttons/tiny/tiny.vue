<template>
  <button
    :class="[
      tinyButtonStyle,
      tinyButtonSizeStyle,
      status === 'Off' && tinyButtonOffStyle,
      status === 'disableTranslucent' && tinyButtonDisabledStyle,
      status === 'disableGray' && tinyButtonDisabledGrayStyle,
      rounded && tinyButtonRoundStyle,
    ]"
    :disabled="
      props.status === 'disableGray' || props.status === 'disableTranslucent'
    "
    @click="onClick"
  >
    <WizHStack
      align="center"
      justify="center"
      gap="xs2"
      :reverse="iconPosition === 'right'"
    >
      <WizIcon v-if="icon" :icon="icon" size="xs" />
      <slot />
    </WizHStack>
  </button>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  tinyButtonStyle,
  tinyButtonDisabledStyle,
  tinyButtonRoundStyle,
  tinyButtonSizeStyle,
  tinyButtonDisabledGrayStyle,
  tinyButtonOffStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/tiny-button.css";
import { PropType } from "vue";

import { TIcon, WizHStack, WizIcon } from "@/components";

defineOptions({
  name: ComponentName.TinyButton,
});

interface Emits {
  (e: "click"): void;
}

const props = defineProps({
  status: {
    type: String as PropType<
      "On" | "Off" | "disableGray" | "disableTranslucent"
    >,
    required: true,
    default: "Off",
  },
  rounded: {
    type: Boolean,
    required: false,
    default: true,
  },
  icon: {
    type: Object as PropType<TIcon>,
    required: false,
  },
  iconPosition: {
    type: String as PropType<"left" | "right">,
    required: false,
    default: "left",
  },
});

const emit = defineEmits<Emits>();

const onClick = () =>
  props.status === "On" || props.status === "Off" || emit("click");
</script>
