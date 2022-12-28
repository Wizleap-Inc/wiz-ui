<template>
  <div :class="[passwordStyle, passwordExpandStyle[computedExpand]]">
    <PrivateBaseInput
      :class="passwordInputStyle"
      v-model="passwordValue"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :expand="expand"
      :width="width"
      :type="isPasswordVisible ? 'text' : 'password'"
    />
    <div
      :class="passwordVisibleIconStyle"
      @click="isPasswordVisible = !isPasswordVisible"
    >
      <WizIEye :class="isPasswordVisible && passwordVisibleIconActiveStyle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  passwordStyle,
  passwordInputStyle,
  passwordExpandStyle,
  passwordVisibleIconStyle,
  passwordVisibleIconActiveStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/password-input.css";
import { computed, ref } from "vue";

import { WizIEye } from "@/components";

import { PrivateBaseInput } from "../base";

defineOptions({
  name: ComponentName.PasswordInput,
});

interface Props {
  value: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  width?: string;
}

interface Emit {
  (e: "input", value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const isPasswordVisible = ref(false);

const passwordValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const computedExpand = computed(() => (props.expand ? "expand" : "default"));
</script>
