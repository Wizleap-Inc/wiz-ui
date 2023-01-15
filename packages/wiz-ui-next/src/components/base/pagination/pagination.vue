<template>
  <div
    :class="[
      paginationStyle,
      activeValue <= 1 && paginationGapStyle['left'],
      activeValue >= length && paginationGapStyle['right'],
    ]"
  >
    <div
      v-if="activeValue > 1"
      :class="[paginationButtonStyle, paginationButtonVariantStyle['default']]"
      @click="onUpdatePage(activeValue - 1)"
    >
      <component :is="WizIChevronLeft" :class="paginationIconStyle"></component>
    </div>
    <div
      v-for="index in displayIndex"
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
      v-if="activeValue < length"
      :class="[paginationButtonStyle, paginationButtonVariantStyle['default']]"
      @click="onUpdatePage(activeValue + 1)"
    >
      <component
        :is="WizIChevronRight"
        :class="paginationIconStyle"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  paginationStyle,
  paginationGapStyle,
  paginationButtonStyle,
  paginationButtonVariantStyle,
  paginationIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/pagination.css";
import { computed, PropType } from "vue";

import { WizIChevronLeft, WizIChevronRight } from "@/components/icons";

const props = defineProps({
  modelValue: {
    type: Number as PropType<number>,
    required: true,
  },
  length: {
    type: Number as PropType<number>,
    required: true,
  },
});

interface Emits {
  (event: "update:modelValue", value: number): void;
}

const emits = defineEmits<Emits>();

const activeValue = computed({
  get: () => props.modelValue,
  set: (value: number) => emits("update:modelValue", value),
});

const onUpdatePage = (index: number) => {
  if (index < 1) return (activeValue.value = 1);
  if (index > props.length) return (activeValue.value = props.length);
  activeValue.value = index;
};

const displayIndex = computed(() => {
  // if we have less than 5 pages, display all pages
  if (props.length <= 5)
    return Array.from({ length: props.length }, (_, i) => i + 1);
  // if we have 10 pages
  let from = activeValue.value - 2; // -2, -1, [activeValue], 1, 2
  if (activeValue.value < 3) from = 1; // fixed to 1, 2, 3, 4, 5
  if (activeValue.value > props.length - 2) from = props.length - 4; //  fixed to 6, 7, 8, 9, 10
  return Array.from({ length: 5 }, (_, i) => from + i);
});
</script>
