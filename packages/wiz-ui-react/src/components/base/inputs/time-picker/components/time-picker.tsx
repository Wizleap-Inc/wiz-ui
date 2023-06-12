import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/time-picker-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { useContext, useRef } from "react";

import {
  WizDivider,
  WizHStack,
  WizIcon,
  WizPopup,
  WizVStack,
} from "@/components";
import { FormControlContext } from "@/components/custom/form/form-control-context";
import { WizICancel, WizISchedule } from "@/components/icons";

import { HOURS, MINUTE_MAP, Time } from "../types/time";

type Props = {
  time: Time;
  isOpen: boolean;
  isHover: boolean;
  onChange: (time: Time) => void;
  setIsOpen: (isOpen: boolean) => void;
  setIsHover: (isHover: boolean) => void;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  isDirectionFixed?: boolean;
};

const hourOptions = HOURS;
const minuteOptions = [0, 15, 30, 45] as const;

const _TimePicker = ({
  time,
  isOpen,
  isHover,
  placeholder = "時間を選択",
  width = "10rem",
  disabled = false,
  isDirectionFixed = false,
  onChange,
  setIsOpen,
  setIsHover,
}: Props) => {
  const anchor = useRef<HTMLDivElement | null>(null);
  const toggleTimePicker = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const timePickerCursor = disabled ? "disabled" : "default";
  const timePickerIsSelected = time.hour || time.minute;
  const label = timePickerIsSelected
    ? `${time.hour}:${MINUTE_MAP[time.minute]}`
    : placeholder;
  const timePickerBoxColor = (() => {
    if (disabled) return "disabled";
    if (timePickerIsSelected) return "selected";
    return "default";
  })();

  const timePickerSelectorOptionItemColor = (isSelected: boolean) =>
    isSelected ? "selected" : "default";

  const formControl = useContext(FormControlContext);
  const state = (() => {
    if (formControl.error) return "error";
    if (!disabled && isOpen) return "active";
    return "default";
  })();

  return (
    <>
      <div
        ref={anchor}
        className={clsx([
          styles.timePickerStyle,
          inputBorderStyle[state],
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
        >
          <WizHStack gap="sm" align="center" height="100%">
            <span
              onClick={() => onChange({ hour: null, minute: null })}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              {isHover ? (
                <span className={styles.cancelButtonStyle}>
                  <WizIcon size="xl2" color="inherit" icon={WizICancel} />
                </span>
              ) : (
                <WizIcon size="xl2" color="gray.500" icon={WizISchedule} />
              )}
            </span>
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
              {hourOptions.map((option) => (
                <div
                  key={"hh" + option}
                  className={clsx([
                    styles.timePickerSelectorOptionStyle,
                    option !== time.hour &&
                      styles.timePickerSelectorOptionItemStyle,
                    option === time.hour &&
                      styles.timePickerSelectorOptionItemSelectedStyle,
                    styles.timePickerSelectorOptionItemColorStyle[
                      timePickerSelectorOptionItemColor(option === time.hour)
                    ],
                  ])}
                  onClick={() =>
                    onChange({ hour: option, minute: time.minute || 0 })
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
              {minuteOptions.map((option) => (
                <div
                  key={"mm" + option}
                  className={clsx([
                    styles.timePickerSelectorOptionStyle,
                    option !== time.minute &&
                      styles.timePickerSelectorOptionItemStyle,
                    option === time.minute &&
                      styles.timePickerSelectorOptionItemSelectedStyle,
                    styles.timePickerSelectorOptionItemColorStyle[
                      timePickerSelectorOptionItemColor(option === time.minute)
                    ],
                  ])}
                  onClick={() =>
                    onChange({ hour: time.hour || 0, minute: option })
                  }
                >
                  {MINUTE_MAP[option]}
                </div>
              ))}
            </WizVStack>
          </WizHStack>
        </div>
      </WizPopup>
    </>
  );
};

_TimePicker.displayName = ComponentName.TimePicker;

export const WizTimePicker = _TimePicker;
