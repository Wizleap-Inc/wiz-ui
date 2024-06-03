import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  WizCheckBoxNew,
  WizDivider,
  WizHStack,
  WizIChevronRight,
  WizIcon,
  WizTag,
} from "@/components";
import { BaseProps } from "@/types";

import { SearchInputOption } from "./types";

type Props<T> = BaseProps & {
  options: SearchInputOption<T>[];
  values: T[];
  width?: string;
  emptyMessage: string;
  onChangeValues: (values: T[]) => void;
};

export const SearchPopupPanel = <T,>({
  className,
  style,
  options,
  values,
  width,
  emptyMessage,
  onChangeValues,
}: Props<T>) => {
  // TODO: value は number に固定
  const [activeValue, setActiveValue] = useState<T | null>(null);
  const activeOption = useMemo(
    () => options.find((option) => activeValue === option.value),
    [activeValue, options]
  );

  const activeOptionChildren = activeOption?.children;
  const isOpen = activeOptionChildren !== undefined;

  const handleChangeValues = useCallback(
    (selectedOptionValue: T, isChecked: boolean) => {
      const newValues = (() => {
        if (isChecked) {
          return [...values, selectedOptionValue];
        }
        return values.filter((value) => value !== selectedOptionValue);
      })();
      // Set を使って重複除去
      onChangeValues(Array.from(new Set(newValues)));
    },
    [onChangeValues, values]
  );

  useEffect(() => {
    // reset active
    setActiveValue(null);
  }, [options]);

  return (
    <>
      <div
        className={clsx(
          className,
          styles.searchBlockStyle,
          styles.searchBlockBorderRadiusStyle,
          isOpen && styles.searchBlockBorderStyle
        )}
        style={{ ...style, width }}
      >
        {options.length > 0 ? (
          options.map((option) => {
            const isActive =
              activeOption && activeOption.value === option.value;
            const optionTag = option.tag;
            return (
              <div key={`${option.label}-${option.value}`}>
                {option.children ? (
                  // Dropdown
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
                      <WizHStack
                        py="xs2"
                        width="100%"
                        justify="between"
                        align="center"
                        gap="xs2"
                        nowrap
                      >
                        <div className={styles.searchInputLabelStyle}>
                          {option.label}
                        </div>
                        <WizHStack gap="xs" nowrap>
                          {optionTag && (
                            <WizTag
                              label={optionTag.label}
                              variant="white"
                              width="20px"
                              fontSize="xs2"
                            />
                          )}
                          <WizIcon
                            size="xl2"
                            icon={WizIChevronRight}
                            color={isActive ? "green.800" : "gray.500"}
                          />
                        </WizHStack>
                      </WizHStack>
                    </div>
                  </div>
                ) : (
                  // CheckBox
                  <div className={styles.searchDropdownCheckboxItemStyle}>
                    <WizCheckBoxNew
                      style={{ width: "100%" }}
                      value={String(option.value)}
                      id={`${option.label}-${option.value}`}
                      checked={values.includes(option.value)}
                      onChange={(e) => {
                        handleChangeValues(option.value, e.target.checked);
                      }}
                    >
                      <WizHStack width="100%" align="center" gap="xs2" nowrap>
                        <div className={styles.searchInputLabelStyle}>
                          {option.label}
                        </div>
                        {optionTag && (
                          <WizTag
                            label={optionTag.label}
                            variant="white"
                            width="20px"
                            fontSize="xs2"
                          />
                        )}
                      </WizHStack>
                    </WizCheckBoxNew>
                  </div>
                )}
                <WizDivider color="gray.300" />
              </div>
            );
          })
        ) : (
          <div className={styles.searchDropdownEmptyMessageStyle}>
            {emptyMessage}
          </div>
        )}
      </div>
      {isOpen && (
        <SearchPopupPanel
          options={activeOptionChildren}
          values={values}
          width={width}
          emptyMessage={emptyMessage}
          onChangeValues={onChangeValues}
        />
      )}
    </>
  );
};
