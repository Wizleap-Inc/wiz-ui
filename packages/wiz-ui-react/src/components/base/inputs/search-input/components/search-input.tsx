import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { KeyboardEventHandler, useMemo, useRef, useState } from "react";

import {
  TIcon,
  WizHStack,
  WizIClose,
  WizISearch,
  WizIcon,
  WizPopup,
} from "@/components";
import { BaseProps } from "@/types";

import { SearchPopupPanel } from "./search-popup-panel";
import { CheckboxOption, SearchInputOption } from "./types";

type Props<T extends CheckboxOption> = BaseProps & {
  options: SearchInputOption<T>[];
  values: T[];
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  singleSelect?: boolean;
  inputWidth?: string;
  popupWidth?: string;
  isDirectionFixed?: boolean;
  emptyMessage?: string;
  icon?: TIcon;
  showSelectedItem?: boolean;
  showParentLabel?: boolean;
  onChangeValues: (values: T[]) => void;
};

function filterOptions<T extends CheckboxOption>(
  options: SearchInputOption<T>[],
  text: string
): SearchInputOption<T>[] {
  return options.flatMap((option) => {
    const isMatched = option.label.includes(text);
    if (!option.children || option.children.length === 0) {
      return isMatched ? [option] : [];
    }
    if (isMatched) return [option];
    const children = filterOptions(option.children, text);
    if (children.length === 0) return [];
    return [
      {
        ...option,
        children,
      },
    ];
  });
}

const SearchInput = <T extends CheckboxOption>({
  className,
  style,
  options,
  values,
  name,
  placeholder,
  disabled,
  expand,
  singleSelect,
  inputWidth = "10rem",
  popupWidth,
  isDirectionFixed = false,
  emptyMessage = "選択肢がありません。",
  showSelectedItem = false,
  onChangeValues,
  showParentLabel,
  icon = WizISearch,
}: Props<T>) => {
  const [filteringText, setFilteringText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(
    () => filterOptions<T>(options, filteringText),
    [filteringText, options]
  );

  const valueToOptions = useMemo(() => {
    const map = new Map<T, SearchInputOption<T>>();

    const flatten = (
      options: SearchInputOption<T>[]
    ): SearchInputOption<T>[] => {
      return options.flatMap((option) => {
        if (!option.children) return [option];

        if (!showParentLabel) return [option, ...flatten(option.children)];

        const children = option.children.map((child) => ({
          ...child,
          // 要件上、全角空白のため無視
          // eslint-disable-next-line no-irregular-whitespace
          label: `${option.label}　${child.label}`,
        }));
        return [option, ...flatten(children)];
      });
    };

    flatten(options).forEach((option) => {
      map.set(option.value, option);
    });

    return map;
  }, [options, showParentLabel]);

  const onClear = (value: T) => {
    const newValues = values.filter((v) => v !== value);
    onChangeValues(newValues);
  };

  const handleKeyDown = (value: T): KeyboardEventHandler => {
    return (e) => {
      if (e.key === "Backspace") {
        onClear(value);
      }
    };
  };

  const displayingSelectedItems = showSelectedItem && values.length > 0;

  const handleClickPanelItem = (value: T[]) => {
    onChangeValues(value);
    setFilteringText("");
  };

  return (
    <>
      <div
        ref={inputRef}
        className={clsx(
          className,
          styles.searchStyle,
          styles.searchInputSelectedItemStyle,
          disabled && styles.searchInputDisabledStyle,
          inputBorderStyle[isFocused ? "active" : "default"]
        )}
        style={{ ...style, width: expand ? "100%" : inputWidth }}
      >
        <div className={styles.searchInputInnerBoxStyle}>
          <WizHStack align="center" nowrap gap="xs">
            <div className={styles.searchInputIconStyle}>
              <WizIcon
                // className={styles.searchInputIconStyle}
                style={{ flexShrink: 0 }}
                icon={icon}
                color={"gray.500"}
              />
            </div>
            <WizHStack
              align="center"
              height="100%"
              width="100%"
              gap="xs"
              overflow="hidden"
            >
              {showSelectedItem &&
                values.map((value) => (
                  <span
                    key={value.toString()}
                    className={styles.searchInputInnerBoxSelectedItemStyle}
                  >
                    <span
                      className={styles.searchInputInnerBoxSelectedLabelStyle}
                    >
                      {valueToOptions.get(value)?.label}
                    </span>
                    <button
                      type="button"
                      className={styles.searchInputInnerBoxCloseButtonStyle}
                      aria-label={ARIA_LABELS.SEARCH_SELECTOR.UNSELECT}
                      onClick={() => onClear(value)}
                      onKeyDown={handleKeyDown(value)}
                      disabled={disabled}
                    >
                      <WizIcon icon={WizIClose} size="xs" color="gray.700" />
                    </button>
                  </span>
                ))}

              <input
                type="text"
                className={styles.searchInputInnerInputStyle}
                value={filteringText}
                placeholder={!displayingSelectedItems ? placeholder : undefined}
                name={name}
                disabled={disabled}
                onChange={(e) => {
                  setFilteringText(e.target.value);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onClick={() => setIsPopupOpen(true)}
                autoComplete="off"
              />
            </WizHStack>
          </WizHStack>
        </div>
      </div>
      <WizPopup
        anchorElement={inputRef}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        isDirectionFixed={isDirectionFixed}
      >
        <WizHStack nowrap>
          <SearchPopupPanel
            options={filteredOptions}
            closePopup={() => setIsPopupOpen(false)}
            values={values}
            width={popupWidth}
            emptyMessage={emptyMessage}
            singleSelect={singleSelect}
            onChangeValues={handleClickPanelItem}
          />
        </WizHStack>
      </WizPopup>
    </>
  );
};

SearchInput.displayName = ComponentName.SearchInput;

export const WizSearchInput = SearchInput;
