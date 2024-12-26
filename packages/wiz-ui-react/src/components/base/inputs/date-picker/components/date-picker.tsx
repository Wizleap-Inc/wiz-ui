import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/date-picker-input.css";
import {
  fillStyle,
  fontSizeStyle,
  inputBorderStyle,
} from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  FC,
  KeyboardEvent,
  MouseEvent,
  useContext,
  useRef,
  useState,
} from "react";

import {
  WizCalendar,
  WizDivider,
  WizPopup,
  WizText,
  WizTextButton,
} from "@/components";
import { WizIcon } from "@/components/base/icon";
import { WizHStack, WizVStack } from "@/components/base/stack";
import { FormControlContext } from "@/components/custom/form/components/form-control-context";
import {
  WizICalendar,
  WizICancel,
  WizIChevronLeft,
  WizIChevronRight,
} from "@/components/icons";
import { BaseProps } from "@/types";
type Props = BaseProps & {
  date: Date | null;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  error?: boolean;
  isDirectionFixed?: boolean;
  _today?: Date;
  onChangeDate?: (selectedValue: Date | null) => void;
  /**
   * @description 日付が無効かどうかを判定する関数です。無効な日付はクリック不可になります。
   * @param date
   * @returns {boolean} `true`: 無効な日付, `false`: 有効な日付
   */
  disabledDate?: (date: Date) => boolean;
  /**
   * @description 年の表示形式をカスタマイズします。
   * @default (year) => `${year}年`
   */
  formatYear?: (year: number) => string;

  /**
   * @description 日付の表示形式をカスタマイズします。
   * @default (date) => `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
   */
  formatDate?: (date: Date) => string;
};

const DatePicker: FC<Props> = ({
  className,
  style,
  date,
  placeholder = "日付を選択",
  width = "12rem",
  disabled = false,
  isDirectionFixed = false,
  onChangeDate,
  error,
  disabledDate = () => false,
  formatYear = (year) => `${year}`,
  formatDate = (date) =>
    `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
  _today,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelButtonVisible = !disabled && !!date;
  const [currentMonth, setCurrentMonth] = useState(date || new Date());
  const moveCalendar = (deltaYear: number, deltaMonth: number) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear() + deltaYear,
        currentMonth.getMonth() + deltaMonth,
        1
      )
    );
  };
  const [tempDate, setTempDate] = useState(date);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    switch (e.key) {
      case "ArrowUp":
        return moveCalendar(1, 0);
      case "ArrowDown":
        return moveCalendar(-1, 0);
      case "ArrowRight":
        return moveCalendar(0, 1);
      case "ArrowLeft":
        return moveCalendar(0, -1);
      case "Enter":
        return setIsOpen((prev) => !prev);
    }
  };

  const calendar = {
    title: `${currentMonth.getMonth() + 1}月`,
    year: currentMonth.getFullYear(),
    month: currentMonth.getMonth(),
    date: currentMonth.getDate(),
  };
  const formControl = useContext(FormControlContext);
  const borderStyle = (() => {
    if (error || formControl.error) return "error";
    if (isOpen && !disabled) return "active";
    return "default";
  })();
  const variant = (() => {
    if (disabled) return "disabled";
    if (date) return "selected";
    return "default";
  })();
  const wrapperButtonRef = useRef<HTMLButtonElement | null>(null);

  const onCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setTempDate(null);
    setCurrentMonth(new Date());
    onChangeDate?.(null);
    setIsOpen(false);
  };

  const onClose = () => {
    setTempDate(date);
    setCurrentMonth(date || new Date());
    setIsOpen(false);
  };

  const onSubmit = () => {
    onChangeDate?.(tempDate);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        ref={wrapperButtonRef}
        className={clsx(
          className,
          styles.datePickerStyle,
          styles.datePickerVariantStyle[variant],
          inputBorderStyle[borderStyle]
        )}
        style={{ ...style, width }}
        aria-label={ARIA_LABELS.DATE_PICKER_INPUT}
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        <WizHStack align="center" height="100%" justify="between" nowrap>
          <WizHStack gap="xs" align="center" height="100%" nowrap>
            <span className={styles.datePickerCancelIconStyle}>
              <WizIcon size="xl2" color="gray.500" icon={WizICalendar} />
            </span>
            <span style={{ whiteSpace: "nowrap" }}>
              {(date && formatDate(date)) || placeholder}
            </span>
          </WizHStack>
          {cancelButtonVisible && (
            <button
              type="button"
              className={styles.datePickerCancelIconStyle}
              disabled={disabled}
              onClick={onCancel}
              aria-label={ARIA_LABELS.DATE_PICKER_CANCEL}
            >
              <WizIcon size="xl2" color="inherit" icon={WizICancel} />
            </button>
          )}
        </WizHStack>
      </button>
      <WizPopup
        isOpen={!disabled && isOpen}
        onClose={onClose}
        direction="bottomLeft"
        isDirectionFixed={isDirectionFixed}
        anchorElement={wrapperButtonRef}
      >
        <div className={styles.datePickerSelectorStyle}>
          <WizHStack align="center" my="xs2" justify="between">
            <WizHStack align="center" pl="xs" gap="xs">
              <WizHStack align="center" gap="xs2">
                <WizText
                  as="span"
                  fontSize="xs"
                  line-height="lg"
                  color="gray.800"
                >
                  {formatYear(calendar.year)}
                </WizText>
                <WizVStack>
                  <button
                    type="button"
                    onClick={() => moveCalendar(1, 0)}
                    className={styles.datePickerYearSelectorItemStyle}
                    aria-label={ARIA_LABELS.YEAR_SELECTOR_NEXT}
                  >
                    {/* FIXME: https://github.com/Wizleap-Inc/wiz-ui/issues/758 */}
                    {/* <WizIArrowDropUp /> */}
                    <svg
                      className={clsx(
                        fillStyle["gray.800"],
                        fontSizeStyle["xs2"],
                        styles.datePickerArrowIconStyle
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      width="1em"
                      viewBox="0 96 960 960"
                    >
                      <path d="M406.231 636q-21.616 0-29.808-19.885-8.192-19.884 6.961-35.038l74.77-74.769q5.231-5.231 10.692-7.462 5.462-2.231 11.923-2.231 6.462 0 11.923 2.231 5.462 2.231 10.693 7.462l74.769 74.769q15.154 15.154 6.962 35.038Q576.923 636 555.308 636H406.231Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveCalendar(-1, 0)}
                    className={styles.datePickerYearSelectorItemStyle}
                    aria-label={ARIA_LABELS.YEAR_SELECTOR_PREV}
                  >
                    {/* FIXME: https://github.com/Wizleap-Inc/wiz-ui/issues/758 */}
                    {/* <WizIArrowDropDown /> */}
                    <svg
                      className={clsx(
                        fillStyle["gray.800"],
                        fontSizeStyle["xs2"],
                        styles.datePickerArrowIconStyle
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 96 960 960"
                      height="1em"
                      width="1em"
                    >
                      <path d="m458.154 645.692-74.77-74.769q-15.153-15.154-6.961-35.038Q384.615 516 406.231 516h149.077q21.615 0 29.808 19.885 8.192 19.884-6.962 35.038l-74.769 74.769q-5.231 5.231-10.693 7.462-5.461 2.231-11.923 2.231-6.461 0-11.923-2.231-5.461-2.231-10.692-7.462Z" />
                    </svg>
                  </button>
                </WizVStack>
              </WizHStack>
              <WizText as="span" fontSize="xs" color="gray.800">
                {calendar.title}
              </WizText>
            </WizHStack>
            <div className={styles.datePickerMonthSelectorStyle}>
              <button
                type="button"
                aria-label={ARIA_LABELS.MONTH_SELECTOR_PREV}
                onClick={() => moveCalendar(0, -1)}
                className={styles.datePickerMonthSelectorItemStyle}
              >
                <WizIcon size="md" color="inherit" icon={WizIChevronLeft} />
              </button>
              <button
                type="button"
                aria-label={ARIA_LABELS.MONTH_SELECTOR_NEXT}
                onClick={() => moveCalendar(0, 1)}
                className={styles.datePickerMonthSelectorItemStyle}
              >
                <WizIcon size="md" color="inherit" icon={WizIChevronRight} />
              </button>
            </div>
          </WizHStack>
          <WizCalendar
            activeDates={
              (tempDate && [{ date: tempDate, state: "primary" }]) || undefined
            }
            onClickDate={(date) => setTempDate(date)}
            currentMonth={currentMonth}
            filledWeeks
            _today={_today || new Date()}
            disabledDate={disabledDate}
          />
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
      </WizPopup>
    </>
  );
};

DatePicker.displayName = ComponentName.DatePicker;

export const WizDatePicker = DatePicker;
