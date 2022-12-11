<template>
  <MountingPortal mountTo="body" name="dialog" append>
    <div
      class="wiz-dialog"
      :class="{ 'wiz-dialog--visible': visible }"
      :style="{ zIndex: currentZIndex }"
    >
      <div class="wiz-dialog__mask" @click.self="close">
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
import { MountingPortal } from "portal-vue";
import { computed } from "vue";

import { WizIconButton } from "@/components/base/buttons";
import { WizCard } from "@/components/base/card";
import { WizIClose } from "@/components/icons";
import { THEME } from "@/constants";
import { ComponentName } from "@/constants/component/name";
import { useZIndex } from "@/hooks";

defineOptions({
  name: ComponentName.Dialog,
});

interface Props {
  value: boolean;
  title?: string;
  maxWidth?: string;
  align?: "start" | "center" | "end";
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: "600px",
});

interface Emit {
  (e: "input", value: boolean): void;
}

const emit = defineEmits<Emit>();

const visible = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const close = () => {
  visible.value = false;
};

const { currentZIndex } = useZIndex(THEME.zIndex.dialog);
</script>

<style lang="scss" scoped>
.wiz-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);

  &--visible {
    opacity: 1;
    pointer-events: auto;
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
