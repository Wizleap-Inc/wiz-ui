import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";
import clsx from "clsx";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

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

type Props = BaseProps & {
  options: SearchInputOption[];
  values: number[];
  width?: string;
  emptyMessage: string;
  singleSelect?: boolean;
  onChangeValues: (values: number[]) => void;
  closePopup: () => void;
};

export const SearchPopupPanel: FC<Props> = ({
  className,
  style,
  options,
  values,
  width,
  emptyMessage,
  singleSelect,
  onChangeValues,
  closePopup,
}) => {
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const activeOption = useMemo(
    () => options.find((option) => activeValue === option.value),
    [activeValue, options]
  );

  const activeOptionChildren = activeOption?.children;
  const isOpen = activeOptionChildren !== undefined;

  const handleChangeValues = useCallback(
    (selectedOptionValue: number, isChecked: boolean) => {
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

  const handleClickButton = (value: number) => {
    onChangeValues([value]);
    closePopup();
  };

  useEffect(() => {
    // reset active
    setActiveValue(null);
  }, [options]);

  const allOptionsHaveChildren = options.every((option) => !!option.children);

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
          options.map((option, i) => {
            const isActive =
              activeOption && activeOption.value === option.value;
            const optionTag = option.tag;
            return (
              <div key={`${option.label}-${option.value}`}>
                {option.children ? (
                  // Dropdown
                  <div
                    className={
                      styles.searchDropdownItemStyle[
                        i === 0 ? "first" : "default"
                      ]
                    }
                    onMouseOver={() => setActiveValue(option.value)}
                  >
                    <div
                      className={clsx(
                        styles.searchDropdownLabelStyle,
                        isActive && styles.searchDropdownSelectingItemStyle
                      )}
                    >
                      <WizHStack
                        pl={
                          !allOptionsHaveChildren && !singleSelect ? "lg" : "no"
                        }
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
                  <>
                    {singleSelect ? (
                      <div className={styles.searchDropdownItemStyle}>
                        <button
                          id={`${option.label}-${option.value}`}
                          style={{ width: "100%" }}
                          type="button"
                          className={styles.searchDropdownSingleSelectItemStyle}
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
                      <div className={styles.searchDropdownCheckboxItemStyle}>
                        <WizCheckBoxNew
                          style={{ width: "100%" }}
                          value={option.value}
                          id={`${option.label}-${option.value}`}
                          checked={values.includes(option.value)}
                          onChange={(e) => {
                            handleChangeValues(option.value, e.target.checked);
                          }}
                        >
                          <WizHStack
                            width="100%"
                            align="center"
                            gap="xs2"
                            nowrap
                          >
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
