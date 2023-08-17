<template>
  <th
    :class="isSafari ? cardThOnSafariStyle : cardThStyle"
    :style="{ width }"
    :rowSpan="rowSpan"
    :colSpan="colSpan"
  >
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  cardThStyle,
  cardThOnSafariStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

import { useIsSafari } from "./hooks/use-is-safari";

defineOptions({
  name: ComponentName.CardTh,
});

defineProps({
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
