import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/date-range-picker.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { formatDateToYYMMDD } from "@wizleap-inc/wiz-ui-utils";
import clsx from "clsx";
import {
  FC,
  KeyboardEvent,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  WizCalendar,
  WizCard,
  WizICalendar,
  WizICancel,
  WizIChevronLeft,
  WizIChevronRight,
  WizIExpandLess,
  WizIExpandMore,
  WizIcon,
  WizPopup,
} from "@/components";
import { DateStatus } from "@/components/base/calendar/components/types";
import { FormControlContext } from "@/components/custom/form/components/form-control-context";
import { useClickOutside } from "@/hooks/use-click-outside";

import { DateRange, DateRangePickerSelectBoxOption } from "../types";

type Props = {
  dateRange: DateRange;
  expand?: boolean;
  disabled?: boolean;
  selectBoxOptions?: DateRangePickerSelectBoxOption[];
  selectBoxValue?: string;
  isDirectionFixed?: boolean;
  error?: boolean;
  onChangeDateRange: (dateRange: DateRange) => void;
  onChangeSelectBoxValue?: (value: string) => void;
};

const DateRangePicker: FC<Props> = ({
  dateRange,
  expand = false,
  disabled = false,
  selectBoxOptions,
  selectBoxValue,
  isDirectionFixed = false,
  error,
  onChangeDateRange,
  onChangeSelectBoxValue,
}: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const cancelButtonVisible =
    !disabled && !!dateRange.start && (isHover || isFocused);
  const [rightCalendarDate, setRightCalendarDate] = useState(
    (() => {
      const [start, end] = [dateRange.start, dateRange.end];
      if (end) {
        return new Date(end);
      }
      if (start) {
        return new Date(start.getFullYear(), start.getMonth() + 1, 1);
      }
      return new Date();
    })()
  );
  const leftCalendarDate = useMemo(
    () =>
      new Date(
        rightCalendarDate.getFullYear(),
        rightCalendarDate.getMonth() - 1,
        1
      ),
    [rightCalendarDate]
  );
  const onClickCancel = () => onChangeDateRange({ start: null, end: null });
  const moveCalendar = (command: "nextMonth" | "prevMonth") => {
    const dm = command === "nextMonth" ? 1 : -1;
    setRightCalendarDate(
      new Date(
        rightCalendarDate.getFullYear(),
        rightCalendarDate.getMonth() + dm,
        1
      )
    );
  };

  const selectedDates = useMemo(() => {
    const getDateStatus = (
      date: Date,
      state: DateStatus["state"]
    ): DateStatus => ({
      date,
      state,
    });
    const [start, end] = [dateRange.start, dateRange.end];
    if (start && end) {
      const secondaries: DateStatus[] = [];
      const tomorrowOfStart = new Date(start);
      tomorrowOfStart.setDate(tomorrowOfStart.getDate() + 1);
      for (let d = tomorrowOfStart; d < end; d.setDate(d.getDate() + 1)) {
        secondaries.push(getDateStatus(new Date(d), "secondary"));
      }
      return [
        getDateStatus(start, "primary"),
        ...secondaries,
        getDateStatus(end, "primary"),
      ];
    }
    if (start) {
      return [getDateStatus(start, "primary")];
    }
    return [];
  }, [dateRange]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    switch (e.key) {
      case "ArrowRight":
        return moveCalendar("nextMonth");
      case "ArrowLeft":
        return moveCalendar("prevMonth");
      case "Enter":
        return setIsOpen(!isOpen);
    }
  };

  const onClickDate = useCallback(
    (date: Date) => {
      const [start, end] = [dateRange.start, dateRange.end];
      if (start && end) {
        onChangeDateRange({ start: date, end: null });
      } else if (start) {
        const [nextStart, nextEnd] =
          start > date ? [date, start] : [start, date];
        onChangeDateRange({ start: nextStart, end: nextEnd });
      } else {
        onChangeDateRange({ start: date, end: null });
      }
    },
    [dateRange, onChangeDateRange]
  );

  const selectedOption = (() => {
    if (!selectBoxOptions) return undefined;
    return selectBoxOptions.find((option) => option.value === selectBoxValue);
  })();

  const handleClickSelectBoxOption = (
    option: DateRangePickerSelectBoxOption
  ) => {
    setIsSelectBoxOpen(false);
    onChangeSelectBoxValue?.(option.value);
  };

  const formControl = useContext(FormControlContext);

  const anchor = useRef<HTMLButtonElement | null>(null);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);
  useClickOutside([selectBoxRef], () => setIsSelectBoxOpen(false));

  const isError = error || formControl.error;
  const borderStyle = (() => {
    if (isError) return "error";
    if (isOpen && !disabled) return "active";
    return "default";
  })();
  return (
    <>
      <button
        ref={anchor}
        aria-label={ARIA_LABELS.RANGE_DATE_PICKER_INPUT}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={clsx(
          styles.bodyStyle[disabled ? "disabled" : "active"],
          styles.widthStyle[expand ? "expanded" : "default"],
          inputBorderStyle[borderStyle]
        )}
      >
        {cancelButtonVisible ? (
          <button
            className={styles.popupCalendarCancelButtonStyle}
            disabled={disabled}
            onClick={onClickCancel}
            aria-label={ARIA_LABELS.DATE_PICKER_CANCEL}
          >
            <WizIcon size="xl2" color="inherit" icon={WizICancel} />
          </button>
        ) : (
          <button
            className={styles.popupCalendarCancelButtonStyle}
            disabled={disabled}
          >
            <WizIcon size="xl2" color="gray.500" icon={WizICalendar} />
          </button>
        )}
        <span
          className={
            styles.inputTextStyle[
              dateRange.start && !disabled ? "selected" : "default"
            ]
          }
        >
          {dateRange.start ? formatDateToYYMMDD(dateRange.start) : "開始日"}
        </span>
        <span className={styles.separatorStyle}>-</span>
        <span
          className={
            styles.inputTextStyle[
              dateRange.end && !disabled ? "selected" : "default"
            ]
          }
        >
          {dateRange.end ? formatDateToYYMMDD(dateRange.end) : "終了日"}
        </span>
      </button>
      <WizPopup
        isOpen={!disabled && isOpen}
        onClose={() => setIsOpen(false)}
        isDirectionFixed={isDirectionFixed}
        anchorElement={anchor}
      >
        <WizCard p="no">
          <div className={styles.popupStyle}>
            {selectBoxOptions && (
              <div className={styles.popupHeaderStyle}>
                <div
                  className={styles.popupHeaderSelectBoxContainerStyle}
                  ref={selectBoxRef}
                >
                  <button
                    className={clsx(
                      styles.popupHeaderSelectBoxStyle,
                      inputBorderStyle[isSelectBoxOpen ? "active" : "default"]
                    )}
                    onClick={() => setIsSelectBoxOpen(!isSelectBoxOpen)}
                    aria-label={ARIA_LABELS.RANGE_DATE_PICKER_SELECT_BOX_INPUT}
                  >
                    {selectedOption?.label || "未選択"}
                    <WizIcon
                      size="xl"
                      color="gray.400"
                      icon={isSelectBoxOpen ? WizIExpandLess : WizIExpandMore}
                    />
                    {isSelectBoxOpen && (
                      <div className={styles.popupHeaderSelectBoxOptionsStyle}>
                        {selectBoxOptions.map((option) => (
                          <button
                            key={option.value}
                            className={styles.popupHeaderSelectBoxOptionStyle}
                            aria-label={option.label}
                            onClick={() => {
                              handleClickSelectBoxOption(option);
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}
            <div className={styles.popupCalendarsStyle}>
              <div className={styles.popupCalendarContainerStyle["left"]}>
                <div className={styles.popupCalendarHeaderStyle}>
                  <button
                    className={styles.popupCalendarHeaderButtonStyle}
                    onClick={() => moveCalendar("prevMonth")}
                    aria-label={ARIA_LABELS.MONTH_SELECTOR_PREV}
                  >
                    <WizIcon size="md" color="inherit" icon={WizIChevronLeft} />
                  </button>
                  <span className={styles.popupCalendarMonthStyle}>
                    {`${leftCalendarDate.getFullYear()}年${
                      leftCalendarDate.getMonth() + 1
                    }月`}
                  </span>
                  <div className={styles.popupCalendarHeaderSpacerStyle} />
                </div>
                <WizCalendar
                  currentMonth={leftCalendarDate}
                  activeDates={selectedDates}
                  onClickDate={onClickDate}
                />
              </div>
              <div className={styles.popupCalendarContainerStyle["right"]}>
                <div className={styles.popupCalendarHeaderStyle}>
                  <div className={styles.popupCalendarHeaderSpacerStyle} />
                  <span className={styles.popupCalendarMonthStyle}>
                    {`${rightCalendarDate.getFullYear()}年${
                      rightCalendarDate.getMonth() + 1
                    }月`}
                  </span>
                  <button
                    className={styles.popupCalendarHeaderButtonStyle}
                    onClick={() => moveCalendar("nextMonth")}
                    aria-label={ARIA_LABELS.MONTH_SELECTOR_NEXT}
                  >
                    <WizIcon
                      size="md"
                      color="inherit"
                      icon={WizIChevronRight}
                    />
                  </button>
                </div>
                <WizCalendar
                  currentMonth={rightCalendarDate}
                  activeDates={selectedDates}
                  onClickDate={onClickDate}
                />
              </div>
            </div>
          </div>
        </WizCard>
      </WizPopup>
    </>
  );
};

DateRangePicker.displayName = ComponentName.DateRangePicker;

export const WizDateRangePicker = DateRangePicker;
