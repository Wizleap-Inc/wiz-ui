import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import { FC, useMemo, useRef, useState } from "react";

import { WizHStack, WizISearch, WizPopup } from "@/components";

import { SearchPopupPanel } from "./search-popup-panel";
import { SearchInputOption } from "./types";

type Props = {
  options: SearchInputOption[];
  values: number[];
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  expand?: boolean;
  inputWidth?: string;
  popupWidth?: string;
  isDirectionFixed?: boolean;
  onChangeValues: (values: number[]) => void;
};

function filterOptions(
  options: SearchInputOption[],
  text: string
): SearchInputOption[] {
  return options.flatMap((option) => {
    const isMatched = option.label.includes(text);
    if (option.children.length === 0) {
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
  options,
  values,
  name,
  placeholder,
  disabled,
  expand,
  inputWidth = "10rem",
  popupWidth,
  isDirectionFixed = false,
  onChangeValues,
}) => {
  const [filteringText, setFilteringText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(
    () => filterOptions(options, filteringText),
    [filteringText, options]
  );

  return (
    <div
      className={styles.searchStyle}
      style={expand ? { width: "100%" } : undefined}
    >
      <input
        ref={inputRef}
        type="text"
        className={clsx(
          styles.searchInputStyle,
          disabled && styles.searchInputDisabledStyle,
          inputBorderStyle[isFocused ? "active" : "default"]
        )}
        style={{ width: expand ? "100%" : inputWidth }}
        value={filteringText}
        placeholder={placeholder}
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
      <div className={styles.searchInputIconStyle}>
        <WizISearch />
      </div>
      {filteredOptions.length > 0 && (
        <WizPopup
          anchorElement={inputRef}
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          isDirectionFixed={isDirectionFixed}
        >
          <WizHStack nowrap>
            <SearchPopupPanel
              options={filteredOptions}
              values={values}
              width={popupWidth}
              onChangeValues={(changed) => onChangeValues(changed)}
            />
          </WizHStack>
        </WizPopup>
      )}
    </div>
  );
};

SearchInput.displayName = ComponentName.SearchInput;

export const WizSearchInput = SearchInput;
