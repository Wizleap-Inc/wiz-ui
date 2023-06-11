import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/time-picker-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { useContext, useRef, useState } from "react";

import {
  WizDivider,
  WizHStack,
  WizIcon,
  WizPopup,
  WizVStack,
} from "@/components";
import { FormControlContext } from "@/components/custom/form/form-control-context";
import { WizISchedule } from "@/components/icons";

type Props = {
  time: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  isDirectionFixed?: boolean;
  onChange: (time: string) => void;
};

const hourOptions = [...Array(24).keys()].map((val) => String(val));
const minuteOptions = ["00", "15", "30", "45"];

const _TimePicker = ({
  time,
  placeholder = "時間を選択",
  width = "10rem",
  disabled = false,
  isDirectionFixed = false,
  onChange,
}: Props) => {
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const anchor = useRef<HTMLDivElement | null>(null);

  const toggleTimePicker = () => {
    if (disabled) return;
    setOpenTimePicker(!openTimePicker);
  };

  const onSelect = (inputValue: string, isHour: boolean) => {
    const defaultValue = time.length > 0 ? time.split(":") : ["0", "00"];
    if (isHour) {
      defaultValue[0] = inputValue;
      setSelectedHour(inputValue);
    } else {
      defaultValue[1] = inputValue;
      setSelectedMinute(inputValue);
    }
    onChange(defaultValue.join(":"));
  };

  const timePickerCursor = disabled ? "disabled" : "default";
  const timePickerBoxColor = time ? "selected" : "default";
  const timePickerSelectorOptionItemColor = (isSelected: boolean) =>
    isSelected ? "selected" : "default";

  const formControl = useContext(FormControlContext);
  const state = (() => {
    if (formControl.error) return "error";
    if (openTimePicker) return "active";
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
            <WizIcon size="xl2" color="gray.500" icon={WizISchedule} />
            <span>{time || placeholder}</span>
          </WizHStack>
        </div>
      </div>

      <WizPopup
        isOpen={openTimePicker}
        anchorElement={anchor}
        shadow={true}
        isDirectionFixed={isDirectionFixed}
        direction="bottomLeft"
        gap="sm"
        onClose={() => setOpenTimePicker(false)}
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
                    styles.timePickerSelectorOptionItemStyle,
                    option === selectedHour &&
                      styles.timePickerSelectorOptionItemSelectedStyle,
                    styles.timePickerSelectorOptionItemColorStyle[
                      timePickerSelectorOptionItemColor(option === selectedHour)
                    ],
                  ])}
                  onClick={() => onSelect(option, true)}
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
                    styles.timePickerSelectorOptionItemStyle,
                    option === selectedMinute &&
                      styles.timePickerSelectorOptionItemSelectedStyle,
                    styles.timePickerSelectorOptionItemColorStyle[
                      timePickerSelectorOptionItemColor(
                        option === selectedMinute
                      )
                    ],
                  ])}
                  onClick={() => onSelect(option, false)}
                >
                  {option}
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
