<template>
  <div :class="[passwordStyle, passwordExpandStyle[computedExpand]]">
    <PrivateBaseInput
      v-model="passwordValue"
      :placeholder="placeholder"
      :id="id"
      :disabled="disabled"
      :expand="expand"
      :width="width"
      :error="isError"
      :type="isPasswordVisible ? 'text' : 'password'"
      space-type="right"
    />
    <button
      :aria-label="ARIA_LABELS.PASSWORD_VISIBLE_TOGGLE"
      :class="passwordVisibleIconStyle"
      @click="isPasswordVisible = !isPasswordVisible"
    >
      <WizIEye :class="isPasswordVisible && passwordVisibleIconActiveStyle" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  passwordStyle,
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
  (e: "input", value: string): void;
}

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  value: {
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
  get: () => props.value,
  set: (value) => emit("input", value),
});

const computedExpand = computed(() => (props.expand ? "expand" : "default"));

// Form Control
const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));
</script>
