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
      :error="isError"
      :type="isPasswordVisible ? 'text' : 'password'"
      space-type="right"
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
import { computed, ref, inject } from "vue";

import { WizIEye } from "@/components";
import { formControlKey } from "@/hooks/use-form-control-provider";

import { PrivateBaseInput } from "../base";

defineOptions({
  name: ComponentName.PasswordInput,
});

interface Emit {
  (e: "update:modelValue", value: string): void;
}

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  expand: {
    type: Boolean,
    required: false,
  },
  width: {
    type: String,
    required: false,
  },
});

const emit = defineEmits<Emit>();

const isPasswordVisible = ref(false);

const passwordValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const computedExpand = computed(() => (props.expand ? "expand" : "default"));

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));
</script>
