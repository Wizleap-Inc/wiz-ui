<template>
  <div>temp</div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";

defineOptions({
  name: ComponentName.FullModalView,
});

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
interface Emit {
  (e: "update:isOpen", value: boolean): void;
}
const emit = defineEmits<Emit>();
</script>
