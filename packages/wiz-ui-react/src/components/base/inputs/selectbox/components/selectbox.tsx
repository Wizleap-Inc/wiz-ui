import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/selectbox-input.css";
import { inputBorderStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import clsx from "clsx";
import {
  FC,
  KeyboardEventHandler,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  WizHStack,
  WizIExpandLess,
  WizIExpandMore,
  WizPopup,
  WizVStack,
} from "@/components";
import { FormControlContext } from "@/components/custom/form/components/form-control-context";

type SelectBoxOption = {
  label: string;
  exLabel?: string;
  value: number;
};

type Props = {
  options: SelectBoxOption[];
  value: number | null;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  expand?: boolean;
  error?: boolean;
  isDirectionFixed?: boolean;
  showExLabel?: boolean;
  onChange: (value: number | null) => void;
};

const SelectBox: FC<Props> = ({
  options,
  value,
  placeholder = "選択してください",
  width = "10rem",
  disabled = false,
  expand,
  error,
  isDirectionFixed = false,
  showExLabel = false,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const formControl = useContext(FormControlContext);

  useEffect(() => {
    if (disabled && isOpen) {
      setIsOpen(false);
    }
  }, [disabled, isOpen]);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  const toggleOpen = () => {
    if (disabled) {
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleClickOption = (option: SelectBoxOption) => {
    setIsOpen(false);
    onChange(option.value);
  };

  const getInputBorderStyleKey = () => {
    if (error || formControl.error) return "error";
    if (isOpen) return "active";
    return "default";
  };

  const handleKeyDown: KeyboardEventHandler = (e) => {
    switch (e.key) {
      case " ":
        if (isOpen) {
          // TODO: キーボード操作で option を選択可能にする
        } else {
          setIsOpen(true);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <>
      <div
        ref={anchorRef}
        className={clsx(
          styles.selectBoxStyle,
          inputBorderStyle[getInputBorderStyleKey()],
          disabled && styles.selectBoxDisabledStyle,
          styles.selectBoxCursorStyle[disabled ? "disabled" : "default"]
        )}
        style={{
          width: expand ? "100%" : width,
        }}
        onClick={toggleOpen}
        role="combobox"
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? undefined : 0}
      >
        <div className={styles.selectBoxInnerBoxStyle}>
          <WizHStack align="center" justify="between" height="100%" nowrap>
            {selectedOption ? (
              <span className={styles.selectBoxInnerBoxSelectedValueStyle}>
                {selectedOption.label}
                {showExLabel &&
                  selectedOption.exLabel &&
                  " " + selectedOption.exLabel}
              </span>
            ) : (
              <span className={styles.selectBoxPlaceholderStyle}>
                {placeholder}
              </span>
            )}
            {isOpen ? (
              <div
                className={styles.selectBoxInnerBoxLessStyle}
                style={{ display: "flex" }}
              >
                <WizIExpandLess />
              </div>
            ) : (
              <div
                className={styles.selectBoxInnerBoxMoreStyle}
                style={{ display: "flex" }}
              >
                <WizIExpandMore />
              </div>
            )}
          </WizHStack>
        </div>
      </div>
      <WizPopup
        isOpen={isOpen}
        onClose={useCallback(() => setIsOpen(false), [])}
        anchorElement={anchorRef}
        isDirectionFixed={isDirectionFixed}
      >
        <div
          className={styles.selectBoxSelectorStyle}
          style={{ minWidth: width }}
        >
          <WizVStack gap="xs2">
            {options.map((option) => (
              <div
                key={`${option.value}-${option.label}`}
                className={styles.selectBoxSelectorOptionStyle}
                onClick={() => handleClickOption(option)}
              >
                <span>{option.label}</span>
                {option.exLabel && <span>{option.exLabel}</span>}
              </div>
            ))}
          </WizVStack>
        </div>
      </WizPopup>
    </>
  );
};

SelectBox.displayName = ComponentName.SelectBox;

export const WizSelectBox = SelectBox;
