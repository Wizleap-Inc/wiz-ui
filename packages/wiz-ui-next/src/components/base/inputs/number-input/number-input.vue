<template>
  <div
    :class="[
      styles.container,
      inputBorderStyle[isError ? 'error' : hasFocus ? 'active' : 'default'],
    ]"
    :style="{ display: 'flex', width: width }"
    @focusin="hasFocus = true"
    @focusout="hasFocus = false"
  >
    <input
      ref="inputRef"
      :class="styles.input"
      type="number"
      :value="inputValue"
      v-bind="restProps"
      :disabled="disabled"
      @input="onInput"
    />
    <WizVStack justify="center" nowrap>
      <button
        type="button"
        :class="styles.button"
        :disabled="disabled"
        @click="handleStepUp"
      >
        <WizIArrowDropUp :class="[styles.arrowIcon]" />
      </button>
      <WizDivider />
      <button
        type="button"
        :class="styles.button"
        :disabled="disabled"
        @click="handleStepDown"
      >
        <WizIArrowDropDown :class="[styles.arrowIcon]" />
      </button>
    </WizVStack>
  </div>
</template>

<script setup lang="ts" generic="T = number">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/number-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, inject, ref } from "vue";

import {
  WizDivider,
  WizIArrowDropDown,
  WizIArrowDropUp,
  WizVStack,
} from "@/components";
import { formControlKey } from "@/hooks/use-form-control-provider";

defineOptions({
  name: ComponentName.NumberInput,
});

type Props = {
  modelValue?: number;
  placeholder?: string;
  disabled?: boolean;
  width?: string;
  error?: boolean;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
};

const props = withDefaults(defineProps<Props>(), {
  width: "7rem",
});

const emit = defineEmits(["update:modelValue"]);

const form = inject(formControlKey);
const isError = computed(() => (form ? form.isError.value : false));
const hasFocus = ref(false);

const inputRef = ref<HTMLInputElement | null>(null);

const inputValue = computed({
  get() {
    return props.modelValue !== null ? props.modelValue : "";
  },
  set(value) {
    emit("update:modelValue", value !== "" ? Number(value) : null);
  },
});

const triggerChangeEvent = () => {
  if (inputRef.value) {
    const event = new Event("input", { bubbles: true });
    inputRef.value.dispatchEvent(event);
  }
};

const handleStepUp = () => {
  if (inputRef.value) {
    inputRef.value.stepUp();
    triggerChangeEvent();
  }
};

const handleStepDown = () => {
  if (inputRef.value) {
    inputRef.value.stepDown();
    triggerChangeEvent();
  }
};

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  emit("update:modelValue", value !== "" ? Number(value) : null);
};

const restProps = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { modelValue, width, ...rest } = props;
  return rest;
});

const disabled = computed(() => props.disabled);
const width = computed(() => props.width);
</script>
