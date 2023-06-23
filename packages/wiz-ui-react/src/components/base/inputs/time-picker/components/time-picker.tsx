import {
  ARIA_LABELS,
  ComponentName,
  THEME,
} from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/time-picker-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { useContext, useEffect, useRef, useState } from "react";

import {
  WizDivider,
  WizHStack,
  WizIcon,
  WizPopup,
  WizVStack,
} from "@/components";
import { FormControlContext } from "@/components/custom/form/form-control-context";
import { WizICancel, WizISchedule } from "@/components/icons";

import { HOURS, MINUTES, Time } from "../types/time";

type Props = {
  time: Time | null;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  isDirectionFixed?: boolean;
  error?: boolean;
  onChange: (time: Time | null) => void;
};

const TimePicker = ({
  time,
  placeholder = "時間を選択",
  width = "10rem",
  disabled = false,
  isDirectionFixed = false,
  error = false,
  onChange,
}: Props) => {
  const anchor = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isCancelButtonFocused, setIsCancelButtonFocused] = useState(false);
  const cancelButtonVisible =
    !disabled && !!time && (isHover || isCancelButtonFocused);
  useEffect(() => {
    if (!cancelButtonVisible) {
      setIsCancelButtonFocused(false);
    }
  }, [cancelButtonVisible]);
  const toggleTimePicker = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const timePickerCursor = disabled ? "disabled" : "default";
  const label = time
    ? `${time.hour}:${String(time.minute).padStart(2, "0")}`
    : placeholder;
  const timePickerBoxColor = (() => {
    if (disabled) return "disabled";
    if (time) return "selected";
    return "default";
  })();

  const timePickerSelectorOptionItemColor = (isSelected: boolean) =>
    isSelected ? "selected" : "default";

  const formControl = useContext(FormControlContext);
  const formState = (() => {
    if (error || formControl.error) return "error";
    if (!disabled && isOpen) return "active";
    return "default";
  })();

  return (
    <>
      <div
        ref={anchor}
        className={clsx([
          styles.timePickerStyle,
          inputBorderStyle[formState],
          disabled && styles.timePickerDisabledStyle,
          styles.timePickerCursorStyle[timePickerCursor],
        ])}
      >
        <div
          className={clsx(
            styles.timePickerBoxStyle,
            styles.timePickerBoxColorStyle[timePickerBoxColor]
          )}
          style={{ width }}
          onClick={toggleTimePicker}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <WizHStack gap="sm" align="center" height="100%">
            <button
              className={clsx([
                styles.cancelButtonStyle,
                disabled && styles.cancelButtonDisabledStyle,
              ])}
              disabled={!cancelButtonVisible}
              aria-label={ARIA_LABELS.TIME_PICKER_CANCEL}
              onClick={() => onChange(null)}
              onFocus={() => setIsCancelButtonFocused(true)}
              onBlur={() => setIsCancelButtonFocused(false)}
            >
              {cancelButtonVisible ? (
                <WizIcon size="xl2" color="inherit" icon={WizICancel} />
              ) : (
                <WizIcon size="xl2" color="gray.500" icon={WizISchedule} />
              )}
            </button>
            <span>{label}</span>
          </WizHStack>
        </div>
      </div>

      <WizPopup
        isOpen={!disabled && isOpen}
        anchorElement={anchor}
        shadow={true}
        isDirectionFixed={isDirectionFixed}
        direction="bottomLeft"
        gap="sm"
        onClose={() => setIsOpen(false)}
      >
        <div
          style={{
            height: "100%",
            padding: THEME.spacing.xs,
            background: THEME.color.white["800"],
            borderRadius: THEME.spacing.xs2,
            boxSizing: "border-box",
          }}
        >
          <WizHStack overflow="none" gap="xs2">
            {/* hh  */}
            <div
              className={styles.timePickerScrollStyle}
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                height: "8rem",
                alignItems: "center",
                gap: THEME.spacing.xs2,
              }}
            >
              <div
                className={clsx(
                  styles.timePickerSelectorOptionStyle,
                  styles.timePickerSelectorOptionTypeStyle
                )}
              >
                時
              </div>
              {HOURS.map((option) => (
                <div
                  key={"hh" + option}
                  className={clsx([
                    styles.timePickerSelectorOptionStyle,
                    option !== time?.hour &&
                      styles.timePickerSelectorOptionItemStyle,
                    option === time?.hour &&
                      styles.timePickerSelectorOptionItemSelectedStyle,
                    styles.timePickerSelectorOptionItemColorStyle[
                      timePickerSelectorOptionItemColor(option === time?.hour)
                    ],
                  ])}
                  onClick={() =>
                    onChange({ hour: option, minute: time?.minute || 0 })
                  }
                >
                  {option}
                </div>
              ))}
            </div>

            {/* ｜ */}
            <WizVStack gap="xs2">
              <WizDivider direction="vertical" />
            </WizVStack>

            {/* mm */}
            <WizVStack gap="xs2" align="center" justify="center">
              <div
                className={clsx(
                  styles.timePickerSelectorOptionStyle,
                  styles.timePickerSelectorOptionTypeStyle
                )}
              >
                分
              </div>
              {MINUTES.map((option) => (
                <div
                  key={"mm" + option}
                  className={clsx([
                    styles.timePickerSelectorOptionStyle,
                    option !== time?.minute &&
                      styles.timePickerSelectorOptionItemStyle,
                    option === time?.minute &&
                      styles.timePickerSelectorOptionItemSelectedStyle,
                    styles.timePickerSelectorOptionItemColorStyle[
                      timePickerSelectorOptionItemColor(option === time?.minute)
                    ],
                  ])}
                  onClick={() =>
                    onChange({ hour: time?.hour || 0, minute: option })
                  }
                >
                  {String(option).padStart(2, "0")}
                </div>
              ))}
            </WizVStack>
          </WizHStack>
        </div>
      </WizPopup>
    </>
  );
};

TimePicker.displayName = ComponentName.TimePicker;

export const WizTimePicker = TimePicker;
