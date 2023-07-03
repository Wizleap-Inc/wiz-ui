import { THEME } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import clsx from "clsx";
import { FC, useCallback, useMemo, useState } from "react";

import {
  WizCheckBox,
  WizDivider,
  WizIChevronRight,
  WizIcon,
} from "@/components";

import { SearchInputOption } from "./types";

type Props = {
  options: SearchInputOption[];
  values: number[];
  width?: string;
  onChangeValues: (values: number[]) => void;
};

export const SearchPopupPanel: FC<Props> = ({
  options,
  values,
  width,
  onChangeValues,
}) => {
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const activeOption = useMemo(
    () => options.find((option) => activeValue === option.value),
    [activeValue, options]
  );
  const isOpen = activeOption !== undefined && activeOption.children.length > 0;

  const handleChangeValue = useCallback(
    (selectedValues: number[]) => {
      const allValues = options.map((option) => option.value);
      const unselectedValues = allValues.filter(
        (value) => !selectedValues.includes(value)
      );
      const newValues = [...values, ...selectedValues].filter(
        (value) => !unselectedValues.includes(value)
      );
      // Set を使って重複除去
      onChangeValues(Array.from(new Set(newValues)));
    },
    [onChangeValues, options, values]
  );

  return (
    <>
      <div
        className={clsx(
          styles.searchBlockStyle,
          styles.searchBlockBorderRadiusStyle,
          isOpen && styles.searchBlockBorderStyle
        )}
        style={{ width }}
      >
        {options.map((option, i) => {
          const isActive = activeOption && activeOption.value === option.value;
          return (
            <div key={`${option.label}-${option.value}`}>
              {option.children.length > 0 ? (
                <div
                  className={styles.searchDropdownItemStyle}
                  onMouseOver={() => setActiveValue(option.value)}
                >
                  <div
                    className={clsx(
                      styles.searchDropdownLabelStyle,
                      isActive && styles.searchDropdownSelectingItemStyle
                    )}
                  >
                    {option.label}
                    <WizIcon
                      size="xl2"
                      icon={WizIChevronRight}
                      color={isActive ? "green.800" : "gray.500"}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={styles.searchDropdownCheckboxItemStyle}
                  style={{ lineHeight: THEME.fontSize.xl3 }}
                >
                  <WizCheckBox
                    options={[
                      {
                        label: option.label,
                        value: option.value,
                        key: `${option.label}-${option.value}`,
                      },
                    ]}
                    values={values}
                    onChange={handleChangeValue}
                  />
                </div>
              )}
              {i !== options.length - 1 && <WizDivider color="gray.300" />}
            </div>
          );
        })}
      </div>
      {isOpen && (
        <SearchPopupPanel
          options={activeOption.children}
          values={values}
          width={width}
          onChangeValues={onChangeValues}
        />
      )}
    </>
  );
};
