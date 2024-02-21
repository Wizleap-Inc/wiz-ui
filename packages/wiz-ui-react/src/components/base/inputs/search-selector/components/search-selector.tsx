import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-selector.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  FC,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  WizHStack,
  WizIAddCircle,
  WizIClose,
  WizIExpandLess,
  WizIExpandMore,
  WizIcon,
  WizPopup,
  WizPopupButtonGroup,
} from "@/components";
import { ButtonGroupItem } from "@/components/base/popup-button-group/types";
import { FormControlContext } from "@/components/custom/form/components/form-control-context";
import { BaseProps } from "@/types";

import { filterOptions } from "./search-selector-helper";
import { SearchSelectorOption } from "./types";

type Props<T> = BaseProps & {
  options: SearchSelectorOption<T>[];
  values: T[];
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  expand?: boolean;
  multiSelectable?: boolean;
  addable?: boolean;
  error?: boolean;
  isDirectionFixed?: boolean;
  showExLabel?: boolean;
  dropdownMaxHeight?: string;
  onChangeValues: (values: T[]) => void;
  onCreate?: (label: string) => void;
  onInputSearchText?: (text: string) => void;
};

const SearchSelector: FC<Props<unknown>> = ({
  className,
  style,
  options,
  values,
  placeholder = "選択してください",
  width = "10rem",
  disabled = false,
  expand,
  multiSelectable = false,
  addable = false,
  error,
  isDirectionFixed = false,
  showExLabel = false,
  dropdownMaxHeight,
  onChangeValues,
  onCreate,
  onInputSearchText,
}) => {
  const [searchText, setSearchText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchTextboxRef = useRef<HTMLInputElement>(null);
  const clearButtonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const popupRef = useRef<HTMLDivElement>(null);
  const formControl = useContext(FormControlContext);

  const isError = error || formControl.error;

  const selectedOptions = useMemo(
    () => options.filter((option) => values.includes(option.value)),
    [options, values]
  );

  useEffect(() => {
    // 選択解除ボタンの ref の数を補正
    clearButtonsRef.current = clearButtonsRef.current.slice(
      0,
      selectedOptions.length
    );
  }, [selectedOptions.length]);

  const buttonGroupOptions: ButtonGroupItem<unknown>[] = useMemo(() => {
    const filteredOptions = filterOptions(options, searchText).filter(
      (matchedOption) => {
        return !values.some((value) => matchedOption.value === value);
      }
    );
    const buttonGroupOptions: ButtonGroupItem<unknown>[] = filteredOptions.map(
      (option) => {
        return {
          kind: "button",
          option: {
            label: option.label,
            value: option.value,
            exLabel: option.exLabel,
            onClick: () => {
              setSearchText("");
              if (multiSelectable) {
                onChangeValues([...values, option.value]);
                searchTextboxRef.current?.focus();
              } else {
                onChangeValues([option.value]);
                setIsPopupOpen(false);
              }
            },
          },
        };
      }
    );
    const shouldShowAddButton =
      addable &&
      searchText !== "" &&
      options.every((option) => option.label !== searchText);
    return shouldShowAddButton
      ? [
          {
            kind: "button",
            option: {
              label: searchText,
              icon: WizIAddCircle,
              iconDefaultColor: "green.800",
              value: -1,
              onClick: () => onCreate?.(searchText),
            },
          },
          ...buttonGroupOptions,
        ]
      : buttonGroupOptions;
  }, [
    addable,
    multiSelectable,
    onChangeValues,
    onCreate,
    options,
    searchText,
    values,
  ]);

  const unselectOption = (option: SearchSelectorOption<unknown>) => {
    onChangeValues(values.filter((value) => value !== option.value));
    setTimeout(() => {
      // input 要素が描画されるのを待ってフォーカス
      searchTextboxRef.current?.focus();
    });
  };

  const handleClickClearButton = (
    option: SearchSelectorOption<unknown>
  ): MouseEventHandler => {
    return (e) => {
      e.stopPropagation();
      unselectOption(option);
      setIsPopupOpen(true);
    };
  };

  const handleClickWrapper = () => {
    if (disabled) {
      return;
    }
    if (searchTextboxRef.current) {
      searchTextboxRef.current.focus();
    } else {
      setIsFocused(true);
      setIsPopupOpen(true);
    }
  };

  const keyDownHandlers = {
    clearButton: (
      option: SearchSelectorOption<unknown>
    ): KeyboardEventHandler => {
      return (e) => {
        if (e.key === "Backspace") {
          unselectOption(option);
        }
      };
    },
    input: (e: KeyboardEvent) => {
      if (
        e.key === "Backspace" &&
        searchText === "" &&
        clearButtonsRef.current.length > 0
      ) {
        clearButtonsRef.current.at(-1)?.focus();
      }
    },
  };

  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const inputBorderStyleKey = () => {
    if (isError) return "error";
    if (isPopupOpen || isFocused) return "active";
    return "default";
  };

  const cursorStyleKey = () => {
    if (disabled) return "disabled";
    if (!multiSelectable && values.length > 0) return "singleSelected";
    return "default";
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className={clsx(
          className,
          styles.selectBoxStyle,
          inputBorderStyle[inputBorderStyleKey()],
          disabled && styles.selectBoxDisabledStyle,
          styles.selectBoxCursorStyle[cursorStyleKey()]
        )}
        style={{ ...style, width: expand ? "100%" : width }}
        role="group"
        onClick={handleClickWrapper}
        onFocus={() => {
          setIsFocused(true);
          setIsPopupOpen(true);
        }}
        onBlur={() => setIsFocused(false)}
      >
        <div className={styles.selectBoxInnerBoxStyle}>
          <WizHStack align="center" height="100%" gap="xs" pr="xl">
            {selectedOptions.map((selectedOption, i) => (
              <span
                key={`${selectedOption.label}-${selectedOption.value}`}
                className={styles.selectBoxInnerBoxSelectedItemStyle}
              >
                <span className={styles.selectBoxInnerBoxSelectedLabelStyle}>
                  {selectedOption.label}
                  {showExLabel &&
                    selectedOption.exLabel &&
                    ` (${selectedOption.exLabel})`}
                </span>
                <button
                  type="button"
                  ref={(ref) => (clearButtonsRef.current[i] = ref)}
                  className={styles.selectBoxInnerBoxCloseButtonStyle}
                  disabled={disabled}
                  onClick={handleClickClearButton(selectedOption)}
                  onKeyDown={keyDownHandlers.clearButton(selectedOption)}
                >
                  <span className={styles.selectBoxInnerBoxCloseStyle}>
                    <WizIcon icon={WizIClose} size="xs" color="gray.500" />
                  </span>
                </button>
              </span>
            ))}
            {(multiSelectable ||
              values.length === 0 ||
              selectedOptions.length === 0) && (
              <input
                ref={searchTextboxRef}
                className={styles.selectBoxSearchInputStyle}
                value={searchText}
                placeholder={
                  selectedOptions.length === 0 ? placeholder : undefined
                }
                disabled={disabled}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  if (onInputSearchText) onInputSearchText(e.target.value);
                  setIsPopupOpen(true);
                }}
                onKeyDown={keyDownHandlers.input}
              />
            )}
          </WizHStack>
        </div>
        <div className={styles.selectBoxExpandIconStyle}>
          {isPopupOpen ? (
            <div className={styles.selectBoxInnerBoxLessStyle}>
              <WizIcon icon={WizIExpandLess} color="inherit" />
            </div>
          ) : (
            <div className={styles.selectBoxInnerBoxMoreStyle}>
              <WizIcon icon={WizIExpandMore} color="inherit" />
            </div>
          )}
        </div>
      </div>
      {buttonGroupOptions.length > 0 && (
        <WizPopup
          anchorElement={wrapperRef}
          isOpen={isPopupOpen}
          layer="popover"
          isDirectionFixed={isDirectionFixed}
          onClose={() => {
            setIsFocused(false);
            setIsPopupOpen(false);
          }}
        >
          <div
            ref={popupRef}
            className={styles.selectBoxSelectorStyle}
            style={{ minWidth: width, maxHeight: dropdownMaxHeight }}
          >
            <WizPopupButtonGroup options={buttonGroupOptions} />
          </div>
        </WizPopup>
      )}
    </>
  );
};

SearchSelector.displayName = ComponentName.SearchSelector;

export const WizSearchSelector = SearchSelector;
