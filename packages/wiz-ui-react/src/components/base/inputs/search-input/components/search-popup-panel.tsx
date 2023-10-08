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
  emptyMessage: string;
  onChangeValues: (values: number[]) => void;
};

export const SearchPopupPanel: FC<Props> = ({
  options,
  values,
  width,
  emptyMessage,
  onChangeValues,
}) => {
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const activeOption = useMemo(
    () => options.find((option) => activeValue === option.value),
    [activeValue, options]
  );

  const activeOptionChildren = activeOption?.children;
  const isOpen = activeOptionChildren !== undefined;

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
        {options.length > 0 ? (
          options.map((option, i) => {
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
                    <WizHStack width="100%" align="center" gap="xs2" nowrap>
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
                          className={styles.searchInputCheckboxStyle}
                        />
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
