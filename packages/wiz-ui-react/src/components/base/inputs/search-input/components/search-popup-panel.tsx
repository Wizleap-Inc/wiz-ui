import { THEME } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import clsx from "clsx";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

import {
  WizCheckBox,
  WizDivider,
  WizHStack,
  WizIChevronRight,
  WizIcon,
  WizTag,
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
  const isOpen = activeOption && activeOption.children.length > 0;

  const handleChangeValues = useCallback(
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

  useEffect(() => {
    // reset active
    setActiveValue(null);
  }, [options]);

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
        {options.map((option) => {
          const isActive = activeOption && activeOption.value === option.value;
          const optionTag = option.tag;
          return (
            <div key={`${option.label}-${option.value}`}>
              {option.children.length > 0 ? (
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
                          <div style={{ lineHeight: THEME.fontSize.sm }}>
                            <WizTag
                              label={optionTag.label}
                              variant="white"
                              width="20px"
                              fontSize="xs2"
                            />
                          </div>
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
                  <WizHStack
                    width="100%"
                    justify="between"
                    align="center"
                    gap="xs2"
                    nowrap
                  >
                    <div className={styles.searchInputLabelStyle}>
                      <WizCheckBox
                        options={[
                          {
                            label: option.label,
                            value: option.value,
                            key: `${option.label}-${option.value}`,
                          },
                        ]}
                        values={values}
                        onChange={handleChangeValues}
                      />
                    </div>
                    {optionTag && (
                      <div className={styles.searchInputTagStyle}>
                        <WizTag
                          label={optionTag.label}
                          variant="white"
                          width="20px"
                          fontSize="xs2"
                        />
                      </div>
                    )}
                  </WizHStack>
                </div>
              )}
              <WizDivider color="gray.300" />
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
