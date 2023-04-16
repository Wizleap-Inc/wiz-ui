import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  timePickerStyle,
  timePickerDisabledStyle,
  timePickerCursorStyle,
  timePickerBoxStyle,
  timePickerBoxColorStyle,
  timePickerScrollStyle,
  timePickerSelectorOptionItemColorStyle,
  timePickerSelectorOptionItemSelectedStyle,
  timePickerSelectorOptionItemStyle,
  timePickerSelectorOptionStyle,
  timePickerSelectorOptionTypeStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/time-picker-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { memo, useState } from "react";

import { WizDivider, WizIcon } from "@/components";
import { WizISchedule } from "@/components/icons";

type Props = {
  time: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  setTime: (time: string) => void;
};
const _TimePicker = ({
  time,
  placeholder = "時間を選択",
  width = "10rem",
  disabled = false,
  ...props
}: Props) => {
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");

  const hourOptions = [...Array(24).keys()].map((val) => String(val));
  const minuteOptions = ["00", "15", "30", "45"];

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
    props.setTime(defaultValue.join(":"));
  };

  const timePickerCursor = disabled ? "disabled" : "default";
  const timePickerBoxColor = time ? "selected" : "default";
  const timePickerSelectorOptionItemColor = (isSelected: boolean) =>
    isSelected ? "selected" : "default";

  const isError = false; // useFormContext
  const state = (() => {
    if (isError) return "error";
    if (openTimePicker) return "active";
    return "default";
  })();

  return (
    <div
      className={clsx([
        timePickerStyle,
        inputBorderStyle[state],
        disabled && timePickerDisabledStyle,
        timePickerCursorStyle[timePickerCursor],
      ])}
    >
      <div
        className={clsx(
          timePickerBoxStyle,
          timePickerBoxColorStyle[timePickerBoxColor]
        )}
        style={{ width }}
        onClick={toggleTimePicker}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "100%",
          }}
        >
          <WizIcon size="xl2" color="gray.500" icon={WizISchedule} />
          <span>{time || placeholder}</span>
        </div>

        {/* popup */}
        <div className={"timePickerSelectorStyle"}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflow: "none",
            }}
          >
            {/* hh */}
            <div
              className={timePickerScrollStyle}
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
                height: "8rem",
                alignItems: "center",
              }}
            >
              <div
                className={clsx(
                  timePickerSelectorOptionStyle,
                  timePickerSelectorOptionTypeStyle
                )}
              >
                時
              </div>
              {hourOptions.map((option) => (
                <div
                  key={"hh" + option}
                  className={clsx([
                    timePickerSelectorOptionStyle,
                    timePickerSelectorOptionItemStyle,
                    option === selectedHour &&
                      timePickerSelectorOptionItemSelectedStyle,
                    timePickerSelectorOptionItemColorStyle[
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <WizDivider direction="vertical" />
            </div>

            {/* mm */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                className={clsx(
                  timePickerSelectorOptionStyle,
                  timePickerSelectorOptionTypeStyle
                )}
              >
                分
              </div>
              {minuteOptions.map((option) => (
                <div
                  key={"mm" + option}
                  className={clsx([
                    timePickerSelectorOptionStyle,
                    timePickerSelectorOptionItemStyle,
                    option === selectedMinute &&
                      timePickerSelectorOptionItemSelectedStyle,
                    timePickerSelectorOptionItemColorStyle[
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

_TimePicker.displayName = ComponentName.TimePicker;

export const WizTimePicker = memo(_TimePicker);
