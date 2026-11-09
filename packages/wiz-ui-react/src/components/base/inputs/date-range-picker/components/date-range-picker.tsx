import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/date-range-picker.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { parseDateInput } from "@wizleap-inc/wiz-ui-utils";
import clsx from "clsx";
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  ComponentPropsWithoutRef,
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

import { DateRange, DateRangePickerSelectBoxOption } from "../types";

type Props = Omit<ComponentPropsWithoutRef<"button">, "disabled"> & {
  dateRange: DateRange;
  /**
   * @deprecated このプロパティは将来のバージョンで削除される予定です。代わりに `width="100%"` を使用してください。
   */
  expand?: boolean;
  width?: string;
  disabled?: boolean;
  selectBoxOptions?: DateRangePickerSelectBoxOption[];
  selectBoxValue?: string;
  isDirectionFixed?: boolean;
  variant?: "regular" | "mini";
  error?: boolean;
  _today?: Date;
  onChangeDateRange?: (dateRange: DateRange) => void;
  onChangeSelectBoxValue?: (value: string) => void;
  disabledDate?: (date: Date) => boolean;
  /**
   * @description 日付の表示形式をカスタマイズします。
   * @default (date: Date) => `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
   */
  formatDate?: (date: Date) => string;
  /**
   * @description 開始日・終了日の入力欄に日付を直接入力できるようにします。`YYYY/MM/DD`・`YYYY-MM-DD`・`YYYY年M月D日`・区切りなし8桁を受け付け（後ろに時刻などが続いても日付部分を採用）、Enter またはフォーカスが外れたときに確定します。解釈できない値・無効な日付・開始日と終了日が前後する日付は元の値に戻ります。
   */
  allowInput?: boolean;
};

const toDayTime = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const DateRangePicker: FC<Props> = ({
  className,
  style,
  dateRange,
  expand = false,
  // width = '20rem',
  width,
  disabled = false,
  selectBoxOptions,
  selectBoxValue,
  isDirectionFixed = false,
  variant = "regular",
  error,
  _today,
  onChangeDateRange,
  onChangeSelectBoxValue,
  disabledDate = () => false,
  formatDate = (date: Date) =>
    `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
  allowInput = false,
  ...props
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

  const computedWidth = width || (expand ? "100%" : "20rem");

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

  const wrapperDivRef = useRef<HTMLDivElement | null>(null);
  const startInputRef = useRef<HTMLInputElement | null>(null);
  const [focusedInput, setFocusedInput] = useState<"start" | "end" | null>(
    null
  );
  const [editingText, setEditingText] = useState("");
  const formatInputDate = (date: Date | null) => (date ? formatDate(date) : "");
  const startInputText =
    focusedInput === "start" ? editingText : formatInputDate(dateRange.start);
  const endInputText =
    focusedInput === "end" ? editingText : formatInputDate(dateRange.end);

  const showDateOnCalendar = (field: "start" | "end", date: Date) => {
    const monthOffset = field === "start" ? 1 : 0;
    setRightCalendarDate(
      new Date(date.getFullYear(), date.getMonth() + monthOffset, 1)
    );
  };

  const onClickInputWrapper = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (!(e.target instanceof HTMLInputElement)) startInputRef.current?.focus();
    setIsOpen(true);
  };

  const onFocusInput = (field: "start" | "end") => {
    setEditingText(formatInputDate(dateRange[field]));
    setFocusedInput(field);
  };

  const onChangeInput = (
    field: "start" | "end",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setEditingText(e.target.value);
    const parsed = parseDateInput(e.target.value);
    if (parsed) showDateOnCalendar(field, parsed);
  };

  const applyInputRange = (range: DateRange) => {
    setTempDateRange(range);
    onChangeDateRange?.(range);
  };

  const commitInput = (field: "start" | "end") => {
    const { start, end } = dateRange;
    const current = field === "start" ? start : end;
    const formatted = formatInputDate(current);
    if (editingText === formatted) return;
    if (editingText.trim() === "") {
      if (field === "start") {
        applyInputRange({ start: null, end: null });
      } else if (start) {
        applyInputRange({ start, end: null });
      }
      return;
    }
    const parsed = parseDateInput(editingText);
    const isInvalid =
      !parsed ||
      disabledDate(parsed) ||
      (field === "start" && !!end && toDayTime(parsed) > toDayTime(end)) ||
      (field === "end" && (!start || toDayTime(parsed) < toDayTime(start)));
    if (isInvalid) {
      setEditingText(formatted);
      initiaizeRightCalendarDate();
      return;
    }
    setEditingText(formatDate(parsed));
    showDateOnCalendar(field, parsed);
    if (current && toDayTime(parsed) === toDayTime(current)) return;
    if (field === "start") {
      applyInputRange(
        end ? { start: parsed, end } : { start: parsed, end: null }
      );
    } else if (start) {
      applyInputRange({ start, end: parsed });
    }
  };

  const onBlurInput = (field: "start" | "end") => {
    commitInput(field);
    setFocusedInput(null);
  };

  const onKeyDownInput = (
    field: "start" | "end",
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    e.preventDefault();
    commitInput(field);
    setIsOpen(false);
  };

  const onClickCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setEditingText("");
    initiaizeRightCalendarDate();
    setTempDateRange({ start: null, end: null });
    onChangeDateRange?.({ start: null, end: null });
    setIsOpen(false);
  };

  const onClose = () => {
    initiaizeRightCalendarDate();
    setTempDateRange(dateRange);
    setIsOpen(false);
  };

  const onSubmit = () => {
    onChangeDateRange?.(tempDateRange);
    setIsOpen(false);
  };

  const { id } = props;

  const triggerContent = (
    <>
      <WizHStack gap="xs" align="center" height="100%" nowrap overflow="hidden">
        <div className={styles.popupCalendarCancelIconStyle}>
          <WizIcon size="xl2" color="gray.500" icon={WizICalendar} />
        </div>

        {allowInput ? (
          <input
            ref={startInputRef}
            type="text"
            className={clsx(
              styles.textInputStyle,
              styles.inputTextStyle[
                (disabled && "disabled") ||
                  (dateRange.start && "selected") ||
                  "default"
              ]
            )}
            value={startInputText}
            placeholder="開始日"
            disabled={disabled}
            aria-label={ARIA_LABELS.RANGE_DATE_PICKER_START_INPUT}
            onFocus={() => onFocusInput("start")}
            onChange={(e) => onChangeInput("start", e)}
            onBlur={() => onBlurInput("start")}
            onKeyDown={(e) => onKeyDownInput("start", e)}
          />
        ) : (
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
        )}
        <span className={styles.separatorStyle}>-</span>
        {allowInput ? (
          <input
            type="text"
            className={clsx(
              styles.textInputStyle,
              styles.inputTextStyle[
                (disabled && "disabled") ||
                  (dateRange.end && "selected") ||
                  "default"
              ]
            )}
            value={endInputText}
            placeholder="終了日"
            disabled={disabled}
            aria-label={ARIA_LABELS.RANGE_DATE_PICKER_END_INPUT}
            onFocus={() => onFocusInput("end")}
            onChange={(e) => onChangeInput("end", e)}
            onBlur={() => onBlurInput("end")}
            onKeyDown={(e) => onKeyDownInput("end", e)}
          />
        ) : (
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
        )}
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
    </>
  );

  const triggerClassName = clsx(
    className,
    styles.bodyStyle[disabled ? "disabled" : "active"],
    styles.variantStyles[variant],
    inputBorderStyle[borderStyle]
  );

  return (
    <>
      {allowInput ? (
        <div
          {...(props as ComponentPropsWithoutRef<"div">)}
          ref={wrapperDivRef}
          onClick={onClickInputWrapper}
          style={{ ...style, width: computedWidth }}
          className={triggerClassName}
        >
          {triggerContent}
        </div>
      ) : (
        <button
          {...props}
          type="button"
          ref={anchor}
          aria-label={ARIA_LABELS.RANGE_DATE_PICKER_INPUT}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          style={{ ...style, width: computedWidth }}
          className={triggerClassName}
        >
          {triggerContent}
        </button>
      )}
      <WizPopup
        isOpen={!disabled && isOpen}
        onClose={onClose}
        isDirectionFixed={isDirectionFixed}
        anchorElement={allowInput ? wrapperDivRef : anchor}
      >
        <WizCard p="no" id={id ? `date-range-picker-popup-${id}` : undefined}>
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
