<template>
  <tr
    :class="[isSafari ? styles.cardTrOnSafariStyle : styles.cardTrStyle]"
    @click="onClick"
  >
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

import { useIsSafari } from "./hooks/use-is-safari";

defineOptions({
  name: ComponentName.CardTr,
});

interface Emits {
  (event: "click"): void;
}

const emits = defineEmits<Emits>();

const onClick = () => emits("click");

const isSafari = useIsSafari();
</script>
