import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/time-picker-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
  ComponentPropsWithoutRef,
} from "react";

import {
  WizDivider,
  WizHStack,
  WizICancel,
  WizISchedule,
  WizIcon,
  WizPopup,
  WizVStack,
} from "@/components";
import { FormControlContext } from "@/components/custom/form/components/form-control-context";

import { HOURS, MINUTES, Time } from "../types/time";

type Props = ComponentPropsWithoutRef<"div"> & {
  time: Time | null;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  isDirectionFixed?: boolean;
  error?: boolean;
  onChange?: (time: Time | null) => void;
};

const TimePicker: FC<Props> = ({
  className,
  style,
  time,
  placeholder = "時間を選択",
  width = "10rem",
  disabled = false,
  isDirectionFixed = false,
  error = false,
  onChange,
  ...props
}) => {
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
        {...props}
        ref={anchor}
        className={clsx([
          className,
          styles.timePickerStyle,
          inputBorderStyle[formState],
          disabled && styles.timePickerDisabledStyle,
          styles.timePickerCursorStyle[timePickerCursor],
          styles.timePickerBoxColorStyle[timePickerBoxColor],
        ])}
        style={{ ...style, width }}
        onClick={toggleTimePicker}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <WizHStack gap="sm" align="center" height="100%">
          <button
            type="button"
            className={styles.cancelButtonStyle}
            disabled={!cancelButtonVisible}
            aria-label={ARIA_LABELS.TIME_PICKER_CANCEL}
            onClick={() => onChange?.(null)}
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

      <WizPopup
        isOpen={!disabled && isOpen}
        anchorElement={anchor}
        isDirectionFixed={isDirectionFixed}
        gap="xs"
        onClose={() => setIsOpen(false)}
      >
        <div className={styles.timePickerSelectorStyle}>
          <WizHStack overflow="none" gap="xs2" nowrap>
            {/* hh  */}
            <WizVStack height="8rem" align="center" nowrap>
              <div
                className={clsx(
                  styles.timePickerSelectorOptionStyle,
                  styles.timePickerSelectorOptionTitleStyle,
                  styles.timePickerSelectorOptionTypeStyle
                )}
              >
                時
              </div>
              <WizVStack
                gap="xs2"
                overflow="auto"
                nowrap
                className={styles.timePickerScrollStyle}
              >
                {HOURS.map((option) => (
                  <div
                    key={"hh" + option}
                    className={clsx([
                      styles.timePickerSelectorOptionStyle,
                      styles.timePickerCursorStyle[timePickerCursor],
                      option !== time?.hour &&
                        styles.timePickerSelectorOptionItemStyle,
                      option === time?.hour &&
                        styles.timePickerSelectorOptionItemSelectedStyle,
                      styles.timePickerSelectorOptionItemColorStyle[
                        timePickerSelectorOptionItemColor(option === time?.hour)
                      ],
                    ])}
                    aria-label={`time-picker-${option}時`}
                    onClick={() =>
                      onChange?.({ hour: option, minute: time?.minute || 0 })
                    }
                  >
                    {option}
                  </div>
                ))}
              </WizVStack>
            </WizVStack>

            {/* ｜ */}
            <WizVStack gap="xs2">
              <WizDivider direction="vertical" />
            </WizVStack>

            {/* mm */}
            <WizVStack height="8rem" align="center" nowrap>
              <div
                className={clsx(
                  styles.timePickerSelectorOptionStyle,
                  styles.timePickerSelectorOptionTitleStyle,
                  styles.timePickerSelectorOptionTypeStyle
                )}
              >
                分
              </div>
              <WizVStack
                gap="xs2"
                overflow="auto"
                nowrap
                className={styles.timePickerScrollStyle}
              >
                {MINUTES.map((option) => (
                  <div
                    key={"mm" + option}
                    className={clsx([
                      styles.timePickerSelectorOptionStyle,
                      styles.timePickerCursorStyle[timePickerCursor],
                      option !== time?.minute &&
                        styles.timePickerSelectorOptionItemStyle,
                      option === time?.minute &&
                        styles.timePickerSelectorOptionItemSelectedStyle,
                      styles.timePickerSelectorOptionItemColorStyle[
                        timePickerSelectorOptionItemColor(
                          option === time?.minute
                        )
                      ],
                    ])}
                    aria-label={`time-picker-${option}分`}
                    onClick={() =>
                      onChange?.({ hour: time?.hour || 0, minute: option })
                    }
                  >
                    {String(option).padStart(2, "0")}
                  </div>
                ))}
              </WizVStack>
            </WizVStack>
          </WizHStack>
        </div>
      </WizPopup>
    </>
  );
};

TimePicker.displayName = ComponentName.TimePicker;

export const WizTimePicker = TimePicker;
