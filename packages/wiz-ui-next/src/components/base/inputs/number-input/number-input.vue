<template>
  <div
    :class="[
      styles.container,
      disabled && styles.disabled,
      inputBorderStyle['default'],
    ]"
    :style="{ display: 'flex', width: width }"
  >
    <input
      :class="styles.input"
      type="number"
      :value="inputValue"
      ref="inputRef"
      @input="onInput"
      v-bind="restProps"
    />
    <WizVStack>
      <button
        type="button"
        @click="handleStepUp"
        :class="styles.button"
        :aria-label="ARIA_LABELS.YEAR_SELECTOR_NEXT"
      >
        <WizIArrowDropUp
          :class="[
            fillStyle['gray.500'],
            fontSizeStyle['xs2'],
            styles.arrowIcon,
          ]"
        />
      </button>
      <WizDivider />
      <button
        type="button"
        @click="handleStepDown"
        :class="styles.button"
        :aria-label="ARIA_LABELS.YEAR_SELECTOR_PREV"
      >
        <WizIArrowDropDown
          :class="[
            fillStyle['gray.500'],
            fontSizeStyle['xs2'],
            styles.arrowIcon,
          ]"
        />
      </button>
    </WizVStack>
  </div>
</template>

<script setup lang="ts" generic="T = number">
import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/number-input.css";
import {
  fillStyle,
  fontSizeStyle,
  inputBorderStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, ref } from "vue";

import {
  WizDivider,
  WizIArrowDropDown,
  WizIArrowDropUp,
  WizVStack,
} from "@/components";

defineOptions({
  name: ComponentName.NumberInput,
});

type Props = {
  modelValue: number | null;
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
