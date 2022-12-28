<template>
  <div :class="paginationStyle">
    <WizHStack gap="md">
      <div
        :class="paginationButtonStyle['default']"
        @click="onUpdatePage(activePageNumber - 1)"
      >
        <component
          :is="WizIChevronLeft"
          :class="paginationIconStyle"
        ></component>
      </div>
      <div
        v-for="pageNumber in pageSlot"
        :class="
          activePageNumber === pageNumber
            ? paginationButtonStyle['active']
            : paginationButtonStyle['default']
        "
        @click="onUpdatePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
      <div
        :class="paginationButtonStyle['default']"
        @click="onUpdatePage(activePageNumber + 1)"
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
  paginationIconStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/pagination.css";
import { ref } from "vue";

import { WizIChevronLeft, WizIChevronRight } from "@/components/icons";

import { WizHStack } from "../stack";

interface Props {
  pageSlot: number;
}
const props = defineProps<Props>();

interface Emits {
  (event: "update", pageNumber: number): void;
}
const emits = defineEmits<Emits>();

const activePageNumber = ref(1);

const onUpdatePage = (pageNumber: number) => {
  if (pageNumber === 0 || pageNumber === props.pageSlot + 1) return;
  activePageNumber.value = pageNumber;
  emits("update", pageNumber);
};
</script>
