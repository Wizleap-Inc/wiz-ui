<template>
  <MountingPortal mountTo="body" name="dialog" append>
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
  </MountingPortal>
</template>

<script setup lang="ts">
import { THEME, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  dialogStyle,
  dialogVisibleStyle,
  dialogMaskStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/dialog.css";
import { MountingPortal } from "portal-vue";
import { computed, PropType } from "vue";

import { WizIconButton } from "@/components/base/buttons";
import { WizCard } from "@/components/base/card";
import { WizIClose } from "@/components/icons";
import { useZIndex } from "@/hooks";

defineOptions({
  name: ComponentName.Dialog,
});

const props = defineProps({
  value: {
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
  (e: "input", value: boolean): void;
}

const emit = defineEmits<Emit>();

const visible = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const close = () => (visible.value = false);

const { currentZIndex } = useZIndex(THEME.zIndex.dialog);
</script>
