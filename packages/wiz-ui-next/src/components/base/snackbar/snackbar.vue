<template>
  <div
    ref="snackbarRef"
    :class="[
      snackbarStyle,
      snackbarWidthStyle[snackbarWidthType],
      !isStatic && snackbarFixedStyle,
      isHidden && snackbarHiddenStyle,
    ]"
    :style="{
      bottom: `${bottom}`,
      left: `${left}`,
    }"
  >
    <div :class="snackbarContainerStyle">
      <WizIcon color="white.800" :icon="WizICircleCheck" />
      <div :class="snackbarMessageStyle">
        <WizText color="white.800" font-size="sm">{{ message }}</WizText>
      </div>
      <button
        type="button"
        :class="snackbarCloseButtonStyle"
        :aria-label="ARIA_LABELS.SNACKBAR.CLOSE"
        @click="onDelete"
      >
        <WizIcon color="white.800" :icon="WizIClose" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  snackbarCloseButtonStyle,
  snackbarContainerStyle,
  snackbarFixedStyle,
  snackbarHiddenStyle,
  snackbarMessageStyle,
  snackbarStyle,
  snackbarWidthStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/snackbar.css";
import { ref, onMounted, computed } from "vue";

import { WizICircleCheck, WizIClose, WizIcon, WizText } from "@/components";

interface Emits {
  (event: "delete"): void;
}

defineOptions({
  name: ComponentName.PopupContainer,
});

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  bottom: {
    type: String,
    required: false,
    default: "0",
  },
  left: {
    type: String,
    required: false,
    default: "0",
  },
  isStatic: {
    type: Boolean,
    required: false,
    default: false,
  },
  expand: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emits = defineEmits<Emits>();

const snackbarRef = ref<HTMLElement | undefined>();
const isHidden = ref(props.isStatic ? false : true);

const snackbarWidthType = computed(() => (props.expand ? "expand" : "default"));

const onDelete = () => {
  isHidden.value = true;
  setTimeout(() => emits("delete"), 200);
};

if (!props.isStatic) {
  setTimeout(onDelete, 3000);
}

onMounted(() => {
  if (snackbarRef.value?.clientWidth) {
    isHidden.value = false;
  }
});
</script>
