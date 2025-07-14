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

import { CheckboxOption, SearchInputOption } from "./types";

type Props<T extends CheckboxOption> = BaseProps & {
  options: SearchInputOption<T>[];
  values: T[];
  width?: string;
  emptyMessage: string;
  singleSelect?: boolean;
  onChangeValues: (values: T[]) => void;
  closePopup: () => void;
};

const getAllChildrenValues = <T extends CheckboxOption>(
  option: SearchInputOption<T>
): T[] => {
  if (!option.children) return [];

  const collectValues = (options: SearchInputOption<T>[]): T[] => {
    return options.reduce<T[]>((acc, opt) => {
      if (opt.children) {
        return [...acc, ...collectValues(opt.children)];
      }
      return [...acc, opt.value];
    }, []);
  };

  return collectValues(option.children);
};

const isAllChildrenSelected = <T extends CheckboxOption>(
  childrenValues: T[],
  selectedValues: T[]
): boolean => {
  return (
    childrenValues.length > 0 &&
    childrenValues.every((value) => selectedValues.includes(value))
  );
};

const getArrayDifference = <T,>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter((item) => !arr2.includes(item));
};

const mergeUniqueArrays = <T,>(...arrays: T[][]): T[] => {
  return Array.from(new Set(arrays.flat()));
};

export const SearchPopupPanel = <T extends CheckboxOption>({
  className,
  style,
  options,
  values,
  width,
  emptyMessage,
  singleSelect,
  onChangeValues,
  closePopup,
}: Props<T>) => {
  const [activeValue, setActiveValue] = useState<T | null>(null);

  const activeOption = useMemo(
    () => options.find((option) => activeValue === option.value),
    [activeValue, options]
  );

  const optionChildrenValuesMap = useMemo(() => {
    const map = new Map<T, T[]>();
    options.forEach((option) => {
      if (option.children) {
        map.set(option.value, getAllChildrenValues(option));
      }
    });
    return map;
  }, [options]);

  const optionSelectionStateMap = useMemo(() => {
    const map = new Map<T, boolean>();
    optionChildrenValuesMap.forEach((childrenValues, optionValue) => {
      if (childrenValues.length === 0) {
        map.set(optionValue, true);
      } else {
        map.set(optionValue, isAllChildrenSelected(childrenValues, values));
      }
    });
    return map;
  }, [optionChildrenValuesMap, values]);

  const activeOptionChildren = activeOption?.children;
  const isOpen = activeOptionChildren !== undefined;

  const handleChangeValues = useCallback(
    (selectedOptionValue: T, isChecked: boolean) => {
      const newValues = isChecked
        ? mergeUniqueArrays(values, [selectedOptionValue])
        : values.filter((value) => value !== selectedOptionValue);

      onChangeValues(newValues);
    },
    [onChangeValues, values]
  );

  const handleParentCheckboxChange = useCallback(
    (option: SearchInputOption<T>, isChecked: boolean) => {
      const childrenValues = optionChildrenValuesMap.get(option.value) || [];

      const newValues = isChecked
        ? mergeUniqueArrays(values, childrenValues)
        : getArrayDifference(values, childrenValues);

      onChangeValues(newValues);
    },
    [onChangeValues, values, optionChildrenValuesMap]
  );

  const handleClickButton = useCallback(
    (value: T) => {
      onChangeValues([value]);
      closePopup();
    },
    [onChangeValues, closePopup]
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
            const hasChildren = !!option.children;
            const allChildrenSelected = hasChildren
              ? optionSelectionStateMap.get(option.value) || false
              : false;

            return (
              <div key={`${option.label}-${option.value}`}>
                {option.children ? (
                  // MARK: 親要素
                  <div
                    className={styles.searchDropdownItemStyle}
                    onMouseOver={() => setActiveValue(option.value)}
                  >
                    {!singleSelect ? (
                      // MARK: Checkbox + Dropdown
                      // Checkboxの状態（On/Off）は、すべての子要素が選択されているかどうかでかで決定される。
                      // ex. ある子要素のCheckboxをOffにした時、その親にあたる要素のCheckboxは全てOffでなければならない。
                      <div
                        className={clsx(
                          styles.searchDropdownLabelStyle,
                          isActive && styles.searchDropdownSelectingItemStyle
                        )}
                      >
                        <WizHStack
                          py="xs2"
                          width="100%"
                          align="center"
                          justify="between"
                          gap="xs2"
                          nowrap
                        >
                          <WizHStack align="center" gap="xs2" nowrap>
                            {/* Checkboxが押下された場合、すべての子要素は親要素の状態に従う。（再帰的に状態を更新する） */}
                            <WizCheckBoxNew
                              value={option.value}
                              id={`parent-${option.label}-${option.value}`}
                              checked={allChildrenSelected}
                              aria-label={`${option.label}の全選択`}
                              onChange={(e) => {
                                handleParentCheckboxChange(
                                  option,
                                  e.target.checked
                                );
                              }}
                            />
                            <div className={styles.searchInputLabelStyle}>
                              {option.label}
                            </div>
                          </WizHStack>
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
                    ) : (
                      // MARK: Dropdown
                      <div
                        className={clsx(
                          styles.searchDropdownLabelStyle,
                          isActive && styles.searchDropdownSelectingItemStyle
                        )}
                        onMouseOver={() => setActiveValue(option.value)}
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
                    )}
                  </div>
                ) : (
                  // MARK: 子要素(No checkbox)
                  <>
                    {singleSelect ? (
                      // MARK: No checkbox
                      <div className={styles.searchDropdownItemStyle}>
                        <button
                          id={`${option.label}-${option.value}`}
                          style={{ width: "100%" }}
                          type="button"
                          className={styles.searchDropdownSingleSelectItemStyle}
                          aria-label={`${option.label}-${option.value}`}
                          onClick={() => handleClickButton(option.value)}
                        >
                          <div className={styles.searchInputLabelStyle}>
                            {option.label}
                          </div>
                          {optionTag ? (
                            <WizTag
                              label={optionTag.label}
                              variant="white"
                              width="20px"
                              fontSize="xs2"
                            />
                          ) : (
                            <div style={{ width: "1.5rem" }} />
                          )}
                        </button>
                      </div>
                    ) : (
                      // MARK: Checkbox
                      <div className={styles.searchDropdownItemStyle}>
                        <div
                          className={clsx(
                            styles.searchDropdownLabelStyle,
                            values.includes(option.value) &&
                              styles.searchDropdownSelectingItemStyle
                          )}
                        >
                          <WizHStack
                            py="xs2"
                            width="100%"
                            align="center"
                            gap="xs2"
                            nowrap
                          >
                            <WizHStack align="center" gap="xs2" nowrap>
                              <WizCheckBoxNew
                                value={option.value}
                                id={`${option.label}-${option.value}`}
                                checked={values.includes(option.value)}
                                aria-label={`${option.label}-${option.value}`}
                                onChange={(e) => {
                                  handleChangeValues(
                                    option.value,
                                    e.target.checked
                                  );
                                }}
                              />
                              <div className={styles.searchInputLabelStyle}>
                                {option.label}
                              </div>
                            </WizHStack>
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
                      </div>
                    )}
                  </>
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
          closePopup={closePopup}
          singleSelect={singleSelect}
          emptyMessage={emptyMessage}
          onChangeValues={onChangeValues}
        />
      )}
    </>
  );
};
