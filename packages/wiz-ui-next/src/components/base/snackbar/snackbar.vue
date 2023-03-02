<template>
  <div
    :class="[snackbarStyle, isHidden && snackbarHiddenStyle]"
    ref="snackbarRef"
  >
    <div :class="snackbarContainerStyle">
      <WizIcon color="white.800" :icon="WizICircleCheck" />
      <div :class="snackbarMessageStyle">
        <WizText color="white.800" fontSize="sm">{{ message }}</WizText>
      </div>
      <button :class="snackbarCloseButtonStyle" @click="onDelete">
        <WizIcon color="white.800" :icon="WizIClose" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  snackbarStyle,
  snackbarContainerStyle,
  snackbarHiddenStyle,
  snackbarMessageStyle,
  snackbarCloseButtonStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/snackbar.css";
import { ref, onMounted } from "vue";

import { WizText, WizIcon, WizICircleCheck, WizIClose } from "@/components";

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
  visible: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emits = defineEmits<Emits>();

const snackbarRef = ref<HTMLElement | undefined>();
const isHidden = ref(props.visible ? false : true);

const onDelete = () => {
  isHidden.value = true;
  setTimeout(() => emits("delete"), 500);
};

if (!props.visible) {
  setTimeout(onDelete, 3000);
}

onMounted(() => {
  if (snackbarRef.value?.clientWidth) {
    isHidden.value = false;
  }
});
</script>
