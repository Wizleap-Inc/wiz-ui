import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { FC, KeyboardEventHandler, useMemo, useRef, useState } from "react";

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
import { SearchInputOption } from "./types";

type Props = BaseProps & {
  options: SearchInputOption[];
  values: number[];
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
  onChangeValues: (values: number[]) => void;
};

function filterOptions(
  options: SearchInputOption[],
  text: string
): SearchInputOption[] {
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

const SearchInput: FC<Props> = ({
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
  icon = WizISearch,
}) => {
  const [filteringText, setFilteringText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(
    () => filterOptions(options, filteringText),
    [filteringText, options]
  );

  const valueToOptions = useMemo(() => {
    const map = new Map<number, SearchInputOption>();

    const flatten = (options: SearchInputOption[]): SearchInputOption[] => {
      return options.flatMap((option) => {
        if (!option.children) return [option];

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
  }, [options]);

  const IconComponent = icon;

  const onClear = (value: number) => {
    const newValues = values.filter((v) => v !== value);
    onChangeValues(newValues);
  };

  const handleKeyDown = (value: number): KeyboardEventHandler => {
    return (e) => {
      if (e.key === "Backspace") {
        onClear(value);
      }
    };
  };

  const displayingSelectedItems = showSelectedItem && values.length > 0;

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
          <WizHStack align="center" height="100%" gap="xs">
            {showSelectedItem &&
              values.map((value) => (
                <span
                  key={value}
                  className={styles.searchInputInnerBoxSelectedItemStyle}
                >
                  <span
                    className={styles.searchInputInnerBoxSelectedLabelStyle}
                  >
                    {valueToOptions.get(value)?.selectedItemLabel
                      ? valueToOptions.get(value)?.selectedItemLabel
                      : valueToOptions.get(value)?.label}
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

            {!displayingSelectedItems && (
              <div className={styles.searchInputIconStyle}>
                <IconComponent />
              </div>
            )}
            <input
              type="text"
              className={styles.searchInputInnerInputStyle}
              value={filteringText}
              placeholder={!displayingSelectedItems ? placeholder : undefined}
              name={name}
              disabled={disabled}
              onChange={(e) => {
                setIsPopupOpen(true);
                setFilteringText(e.target.value);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onClick={() => setIsPopupOpen(!isPopupOpen)}
              autoComplete="off"
            />
          </WizHStack>
        </div>
      </div>
      {filteredOptions.length > 0 && !disabled && (
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
              onChangeValues={(changed) => onChangeValues(changed)}
            />
          </WizHStack>
        </WizPopup>
      )}
    </>
  );
};

SearchInput.displayName = ComponentName.SearchInput;

export const WizSearchInput = SearchInput;
