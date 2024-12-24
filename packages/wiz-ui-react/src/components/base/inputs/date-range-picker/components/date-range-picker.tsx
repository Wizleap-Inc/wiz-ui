import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/date-range-picker.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  FC,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  WizCalendar,
  WizCard,
  WizDivider,
  WizHStack,
  WizICalendar,
  WizICancel,
  WizIChevronLeft,
  WizIChevronRight,
  WizIExpandLess,
  WizIExpandMore,
  WizIcon,
  WizPopup,
  WizTextButton,
} from "@/components";
import { DateStatus } from "@/components/base/calendar/components/types";
import { FormControlContext } from "@/components/custom/form/components/form-control-context";
import { useClickOutside } from "@/hooks/use-click-outside";
import { BaseProps } from "@/types";

import { DateRange, DateRangePickerSelectBoxOption } from "../types";

type Props = BaseProps & {
  dateRange: DateRange;
  expand?: boolean;
  disabled?: boolean;
  selectBoxOptions?: DateRangePickerSelectBoxOption[];
  selectBoxValue?: string;
  isDirectionFixed?: boolean;
  error?: boolean;
  _today?: Date;
  onChangeDateRange: (dateRange: DateRange) => void;
  onChangeSelectBoxValue?: (value: string) => void;
  disabledDate?: (date: Date) => boolean;
  /**
   * @description 日付の表示形式をカスタマイズします。
   * @default (date: Date) => `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
   */
  formatDate?: (date: Date) => string;
};

const DateRangePicker: FC<Props> = ({
  className,
  style,
  dateRange,
  expand = false,
  disabled = false,
  selectBoxOptions,
  selectBoxValue,
  isDirectionFixed = false,
  error,
  _today,
  onChangeDateRange,
  onChangeSelectBoxValue,
  disabledDate = () => false,
  formatDate = (date: Date) =>
    `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [tempDateRange, setTempDateRange] = useState(dateRange);
  const cancelButtonVisible = !disabled && !!dateRange.start;
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

  const initiaizeRightCalendarDate = () => {
    const [start, end] = [dateRange.start, dateRange.end];
    if (end) {
      setRightCalendarDate(new Date(end));
    } else if (start) {
      setRightCalendarDate(
        new Date(start.getFullYear(), start.getMonth() + 1, 1)
      );
    } else {
      setRightCalendarDate(new Date());
    }
  };

  const selectedDates = useMemo(() => {
    const getDateStatus = (
      date: Date,
      state: DateStatus["state"]
    ): DateStatus => ({
      date,
      state,
    });
    const [start, end] = [tempDateRange.start, tempDateRange.end];
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
  }, [tempDateRange]);

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
      const [start, end] = [tempDateRange.start, tempDateRange.end];
      if (start && end) {
        setTempDateRange({ start: date, end: null });
      } else if (start) {
        const [nextStart, nextEnd] =
          start > date ? [date, start] : [start, date];
        setTempDateRange({ start: nextStart, end: nextEnd });
      } else {
        setTempDateRange({ start: date, end: null });
      }
    },
    [tempDateRange]
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

  const onClickCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    initiaizeRightCalendarDate();
    setTempDateRange({ start: null, end: null });
    onChangeDateRange({ start: null, end: null });
    setIsOpen(false);
  };

  const onClose = () => {
    initiaizeRightCalendarDate();
    setTempDateRange(dateRange);
    setIsOpen(false);
  };

  const onSubmit = () => {
    onChangeDateRange(tempDateRange);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        ref={anchor}
        aria-label={ARIA_LABELS.RANGE_DATE_PICKER_INPUT}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        style={style}
        className={clsx(
          className,
          styles.bodyStyle[disabled ? "disabled" : "active"],
          styles.widthStyle[expand ? "expanded" : "default"],
          inputBorderStyle[borderStyle]
        )}
      >
        <WizHStack
          gap="xs"
          align="center"
          height="100%"
          nowrap
          overflow="hidden"
        >
          <div className={styles.popupCalendarCancelIconStyle}>
            <WizIcon size="xl2" color="gray.500" icon={WizICalendar} />
          </div>

          <span
            className={
              styles.inputTextStyle[
                (disabled && "disabled") ||
                  (dateRange.start && "selected") ||
                  "default"
              ]
            }
          >
            {dateRange.start ? formatDate(dateRange.start) : "開始日"}
          </span>
          <span className={styles.separatorStyle}>-</span>
          <span
            className={
              styles.inputTextStyle[
                (disabled && "disabled") ||
                  (dateRange.end && "selected") ||
                  "default"
              ]
            }
          >
            {dateRange.end ? formatDate(dateRange.end) : "終了日"}
          </span>
        </WizHStack>

        {cancelButtonVisible && (
          <button
            type="button"
            className={styles.popupCalendarCancelIconStyle}
            disabled={disabled}
            onClick={onClickCancel}
            aria-label={ARIA_LABELS.DATE_PICKER_CANCEL}
          >
            <WizIcon size="xl2" color="inherit" icon={WizICancel} />
          </button>
        )}
      </button>
      <WizPopup
        isOpen={!disabled && isOpen}
        onClose={onClose}
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
                    type="button"
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
                            type="button"
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
                    type="button"
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
                  disabledDate={disabledDate}
                  filledWeeks={true}
                  _today={_today || new Date()}
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
                    type="button"
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
                  disabledDate={disabledDate}
                  filledWeeks={true}
                  _today={_today || new Date()}
                />
              </div>
            </div>
            <WizDivider color="gray.300" />
            <WizHStack p="sm" gap="sm" justify="end">
              <WizTextButton onClick={onClose} variant="sub">
                {ARIA_LABELS.CANCEL}
              </WizTextButton>
              <WizTextButton onClick={onSubmit}>
                {ARIA_LABELS.APPLY}
              </WizTextButton>
            </WizHStack>
          </div>
        </WizCard>
      </WizPopup>
    </>
  );
};

DateRangePicker.displayName = ComponentName.DateRangePicker;

export const WizDateRangePicker = DateRangePicker;
