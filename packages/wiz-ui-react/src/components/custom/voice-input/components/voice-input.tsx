import { ComponentName, ColorKeys } from "@wizleap-inc/wiz-ui-constants";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import {
  voiceInputExpandStyle,
  voiceInputStyle,
  voiceInputTextAreaStyle,
  voiceInputDisabledStyle,
  voiceInputButtonStyle,
} from "@wizleap-inc/wiz-ui-styles/customs/voice-input.css";
import clsx from "clsx";
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  useContext,
  useMemo,
  useState,
} from "react";

import { WizIcon, WizIMicFilled, WizIMicOffFilled } from "@/components";
import { FormControlContext } from "@/components/custom/form/components/form-control-context";

type Props = Omit<
  ComponentPropsWithoutRef<"textarea">,
  "value" | "onChange" | "rows" | "resize"
> & {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  micDisabled: boolean;
  expand?: boolean;
  rows?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
  maxWidth?: string;
  minWidth?: string;
  isListening: boolean;
  onMicClick: () => void;
  onChange: (value: string) => void;
};

const VoiceInput = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      value,
      placeholder,
      disabled = false,
      micDisabled,
      expand = false,
      rows = 3,
      resize = "none",
      maxWidth,
      minWidth,
      isListening,
      onMicClick,
      onChange,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const formControl = useContext(FormControlContext);
    const isError = formControl?.error || false;
    const [isFocused, setIsFocused] = useState(false);

    const state = useMemo(() => {
      if (isError) return "error";
      if (isListening || isFocused) return "active";
      return "default";
    }, [isError, isListening, isFocused]);

    const micColor: ColorKeys = useMemo(() => {
      if (isListening) return "green.800";
      if (micDisabled || disabled) return "gray.500";
      return "gray.800";
    }, [isListening, micDisabled, disabled]);

    const computedPlaceholder = useMemo(() => {
      if (placeholder) return placeholder;
      return disabled ? "入力できません" : "入力してください";
    }, [placeholder, disabled]);

    const handleMicClick = () => {
      if (disabled) return;
      onMicClick();
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };

    return (
      <label
        className={clsx(
          voiceInputStyle,
          expand && voiceInputExpandStyle,
          disabled && voiceInputDisabledStyle,
          inputBorderStyle[state],
          className
        )}
        style={{
          maxWidth,
          minWidth,
          ...style,
        }}
      >
        <textarea
          ref={ref}
          value={value}
          name="voice-input"
          placeholder={computedPlaceholder}
          disabled={disabled}
          rows={rows}
          className={voiceInputTextAreaStyle}
          style={{ resize }}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        <button
          type="button"
          className={voiceInputButtonStyle}
          onClick={handleMicClick}
          disabled={disabled}
          aria-label={isListening ? "音声入力を停止" : "音声入力を開始"}
        >
          <WizIcon
            icon={micDisabled || disabled ? WizIMicOffFilled : WizIMicFilled}
            color={micColor}
            size="xl"
          />
        </button>
      </label>
    );
  }
);

VoiceInput.displayName = ComponentName.VoiceInput;

export default VoiceInput;
