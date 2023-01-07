<template>
  <teleport to="body">
    <div
      :class="[dialogStyle, visible && dialogVisibleStyle]"
      :style="{ zIndex: currentZIndex }"
    >
      <div :class="dialogMaskStyle" @click.self="close">
        <WizCard :maxWidth="maxWidth" p="xl" :title="title" :align="align">
          <template #mainHeaderArea>
            <slot v-if="!title" name="title" />
          </template>
          <template #subHeaderArea>
            <WizIconButton
              :icon="WizIClose"
              @click="close"
              variant="transparent"
            />
          </template>
          <slot />
          <template #footer>
            <slot name="footer" />
          </template>
        </WizCard>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { THEME, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  dialogStyle,
  dialogVisibleStyle,
  dialogMaskStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/dialog.css";
import { computed, PropType } from "vue";

import { WizIconButton } from "@/components/base/buttons";
import { WizCard } from "@/components/base/card";
import { WizIClose } from "@/components/icons";
import { useZIndex } from "@/hooks";

defineOptions({
  name: ComponentName.Dialog,
});

/*
interface Props {
  modelValue: boolean;
  title?: string;
  maxWidth?: string;
  align?: "start" | "center" | "end";
}
*/

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  maxWidth: {
    type: String,
    required: false,
    default: "600px",
  },
  align: {
    type: String as PropType<"start" | "center" | "end">,
    required: false,
  },
});

interface Emit {
  (e: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<Emit>();

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const close = () => (visible.value = false);

const { currentZIndex } = useZIndex(THEME.zIndex.dialog);
</script>
