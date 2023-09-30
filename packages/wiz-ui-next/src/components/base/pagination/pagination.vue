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
  paginationButtonStyle,
  paginationButtonVariantStyle,
  paginationGapStyle,
  paginationIconStyle,
  paginationStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/pagination.css";
import { PropType, computed } from "vue";

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
  /**
   * 表示ページ数を制御します。(`>=0`)
   * @default 2
   */
  sideLength: {
    type: Number as PropType<number>,
    default: 2,
    validator: (value: number) => value >= 0,
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
  const maxItemLength = props.sideLength * 2 + 1;
  // 表示可能幅がページ数より大きい場合は全て表示
  if (props.length <= maxItemLength)
    return Array.from({ length: props.length }, (_, i) => i + 1);
  // if we have 10 pages
  let from = activeValue.value - props.sideLength; // (ex.)  3 4 [5] 6 7
  if (activeValue.value <= props.sideLength) from = 1; // (ex.)  1 [2] 3 4 5
  if (activeValue.value > props.length - props.sideLength)
    from = props.length - 2 * props.sideLength; // (ex.)  6 7 8 [9] 10
  return Array.from({ length: maxItemLength }, (_, i) => from + i);
});
</script>
