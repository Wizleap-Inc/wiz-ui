<template>
  <div :class="snackbarControllerStyle">
    <WizSnackbar
      v-for="option in options.value"
      :key="option.created.toString()"
      :message="option.message"
      @delete="option.delete"
    />
  </div>
</template>

<script setup lang="ts">
import { snackbarControllerStyle } from "@wizleap-inc/wiz-ui-styles/bases/snackbar.css";
import { PropType, Ref } from "vue";

import { WizSnackbar } from "@/components";

import { SnackbarOption } from "./types";

defineProps({
  options: {
    type: Object as PropType<Ref<SnackbarOption[]>>,
    required: true,
  },
});
</script>
