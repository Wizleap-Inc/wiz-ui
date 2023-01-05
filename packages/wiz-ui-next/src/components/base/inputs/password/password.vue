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
    <button
      :aria-label="AREA_LABELS.PASSWORD_VISIBLE_TOGGLE"
      :class="passwordVisibleIconStyle"
      @click="isPasswordVisible = !isPasswordVisible"
    >
      <WizIEye :class="isPasswordVisible && passwordVisibleIconActiveStyle" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { AREA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
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
  modelValue: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  width?: string;
}

interface Emit {
  (e: "update:modelValue", value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const isPasswordVisible = ref(false);

const passwordValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const computedExpand = computed(() => (props.expand ? "expand" : "default"));
</script>
