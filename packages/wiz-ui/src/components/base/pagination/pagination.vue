<template>
  <div :class="paginationStyle">
    <WizHStack gap="md">
      <div
        :class="[
          paginationButtonStyle,
          paginationButtonVariantStyle['default'],
        ]"
        @click="onUpdatePage(activeValue - 1)"
      >
        <component
          :is="WizIChevronLeft"
          :class="paginationIconStyle"
        ></component>
      </div>
      <div
        v-for="index in length"
        :class="[
          paginationButtonStyle,
          paginationButtonVariantStyle[
            activeValue === index ? 'active' : 'default'
          ],
        ]"
        @click="onUpdatePage(index)"
      >
        {{ index }}
      </div>
      <div
        :class="[
          paginationButtonStyle,
          paginationButtonVariantStyle['default'],
        ]"
        @click="onUpdatePage(activeValue + 1)"
      >
        <component
          :is="WizIChevronRight"
          :class="paginationIconStyle"
        ></component>
      </div>
    </WizHStack>
  </div>
</template>

<script setup lang="ts">
import {
  paginationStyle,
  paginationButtonStyle,
  paginationButtonVariantStyle,
  paginationIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/pagination.css";
import { computed, PropType } from "vue";

import { WizIChevronLeft, WizIChevronRight } from "@/components/icons";

import { WizHStack } from "../stack";

const props = defineProps({
  value: {
    type: Number as PropType<number>,
    required: true,
  },
  length: {
    type: Number as PropType<number>,
    required: true,
  },
});

interface Emits {
  (event: "input", value: number): void;
}

const emits = defineEmits<Emits>();

const activeValue = computed({
  get: () => props.value,
  set: (value: number) => emits("input", value),
});

const onUpdatePage = (index: number) => {
  if (index < 1) return (activeValue.value = 1);
  if (index > props.length) return (activeValue.value = props.length);
  activeValue.value = index;
};
</script>
