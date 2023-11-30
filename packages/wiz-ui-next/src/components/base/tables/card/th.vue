<template>
  <th
    :class="[
      styles.cardTableAlignStyle[align],
      isSafari ? styles.cardThOnSafariStyle : styles.cardThStyle,
    ]"
    :style="{ width }"
    :rowSpan="rowSpan"
    :colSpan="colSpan"
  >
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";
import { PropType } from "vue";

import { useIsSafari } from "./hooks/use-is-safari";

defineOptions({
  name: ComponentName.CardTh,
});

defineProps({
  align: {
    type: String as PropType<"left" | "center" | "right">,
    required: false,
    default: "center",
  },
  width: {
    type: String,
    required: false,
    default: "auto",
  },
  rowSpan: {
    type: Number,
    required: false,
  },
  colSpan: {
    type: Number,
    required: false,
  },
});

const isSafari = useIsSafari();
</script>
