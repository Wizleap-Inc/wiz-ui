<template>
  <table class="wiz-unstyled-table">
    <slot />
  </table>
</template>

<script setup lang="ts">
import { ComponentName } from "@wiz-ui/constants/component/name";
import { computed } from "vue";

import { SpacingKeys } from "@/types/styles/spacing";
import { getSpacingCSS } from "@/utils/styles/spacing";

defineOptions({
  name: ComponentName.UnstyledTable,
});

interface Props {
  space?: SpacingKeys;
}

const props = withDefaults(defineProps<Props>(), {
  space: "no",
});

const computedSpace = computed(() => getSpacingCSS(props.space));
</script>

<style lang="scss" scoped>
.wiz-unstyled-table {
  border-spacing: v-bind(computedSpace);
}
</style>
