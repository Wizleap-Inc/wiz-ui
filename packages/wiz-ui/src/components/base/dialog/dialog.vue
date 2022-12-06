<template>
  <MountingPortal mountTo="body" name="dialog" append>
    <div class="wiz-dialog" :class="{ 'wiz-dialog--visible': visible }">
      <div class="wiz-dialog__mask" @click.self="close">
        <WizCard maxWidth="600px" p="xl">
          <template #mainHeaderArea>
            <slot name="mainHeaderArea"></slot>
          </template>
          <template #subHeaderArea>
            <slot name="subHeaderArea"></slot>
          </template>
          <slot />
          <template #footer>
            <slot name="footer"></slot>
          </template>
        </WizCard>
      </div>
    </div>
  </MountingPortal>
</template>

<script setup lang="ts">
import { MountingPortal } from "portal-vue";
import { computed } from "vue";

import { WizCard } from "@/components/base/card";
import { THEME } from "@/constants";
import { useZIndex } from "@/hooks";

interface Props {
  value: boolean;
}

const props = defineProps<Props>();

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

const colorGray800 = THEME.color.gray["800"];
</script>

<style lang="scss" scoped>
.wiz-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: v-bind(currentZIndex);
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
    background-color: v-bind(colorGray800);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
