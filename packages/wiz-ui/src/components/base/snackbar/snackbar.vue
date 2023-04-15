<template>
  <div
    :class="[
      styles.snackbarStyle,
      !isStatic && styles.snackbarFixedStyle,
      isHidden && styles.snackbarHiddenStyle,
    ]"
    :styles="{
      bottom: `${bottom}`,
      left: `${left}`,
    }"
    ref="snackbarRef"
  >
    <div :class="styles.snackbarContainerStyle">
      <WizIcon color="white.800" :icon="WizICircleCheck" />
      <div :class="styles.snackbarMessageStyle">
        <WizText color="white.800" fontSize="sm">{{ message }}</WizText>
      </div>
      <button :class="styles.snackbarCloseButtonStyle" @click="onDelete">
        <WizIcon color="white.800" :icon="WizIClose" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/snackbar.css";
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
});

const emits = defineEmits<Emits>();

const snackbarRef = ref<HTMLElement | undefined>();
const isHidden = ref(props.isStatic ? false : true);

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
