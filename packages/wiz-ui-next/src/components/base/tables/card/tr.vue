<template>
  <tr :class="cardTrStyle" @click="onClick">
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { cardTrStyle } from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

defineOptions({
  name: ComponentName.CardTr,
});

interface Emits {
  (event: "click"): void;
}

const emits = defineEmits<Emits>();

const onClick = () => emits("click");
</script>
