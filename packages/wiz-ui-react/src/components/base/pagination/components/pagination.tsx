import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/pagination.css";
import clsx from "clsx";

import { WizIcon } from "@/components";
import { WizIChevronLeft, WizIChevronRight } from "@/components/icons";

type Props = {
  activeValue: number;
  length: number;
  setActiveValue: (value: number) => void;
};

const Pagination = ({ activeValue, length, setActiveValue }: Props) => {
  const onUpdatePage = (index: number) => {
    if (index < 1) return setActiveValue(1);
    if (index > length) return setActiveValue(length);
    setActiveValue(index);
  };
  const displayIndex = (() => {
    if (length < 5) return [...Array(length)].map((_, index) => index + 1);
    let from = activeValue - 2;
    if (activeValue < 3) from = 1;
    if (activeValue > length - 2) from = length - 4;
    return [...Array(5)].map((_, index) => from + index);
  })();
  return (
    <div
      className={clsx(
        styles.paginationStyle,
        activeValue <= 1 && styles.paginationGapStyle["left"],
        activeValue >= length && styles.paginationGapStyle["right"]
      )}
    >
      {activeValue > 1 && (
        <div
          onClick={() => onUpdatePage(activeValue - 1)}
          onKeyDown={(e) => {
            if (e.key === " ") onUpdatePage(activeValue - 1);
          }}
          className={clsx(
            styles.paginationButtonStyle,
            styles.paginationButtonVariantStyle["default"]
          )}
          tabIndex={displayIndex[0] - 1}
        >
          <WizIcon icon={WizIChevronLeft} size={"xl2"} />
        </div>
      )}
      {displayIndex.map((index) => (
        <div
          key={index}
          onClick={() => onUpdatePage(index)}
          onKeyDown={(e) => {
            if (e.key === " ") onUpdatePage(e.currentTarget.tabIndex);
          }}
          className={clsx(
            styles.paginationButtonStyle,
            styles.paginationButtonVariantStyle[
              activeValue === index ? "active" : "default"
            ]
          )}
          tabIndex={index}
        >
          {index}
        </div>
      ))}
      {activeValue < length && (
        <div
          onClick={() => onUpdatePage(activeValue + 1)}
          onKeyDown={(e) => {
            if (e.key === " ") onUpdatePage(activeValue + 1);
          }}
          className={clsx(
            styles.paginationButtonStyle,
            styles.paginationButtonVariantStyle["default"]
          )}
          tabIndex={displayIndex[displayIndex.length - 1] + 1}
        >
          <WizIcon icon={WizIChevronRight} size={"xl2"} />
        </div>
      )}
    </div>
  );
};

Pagination.displayName = ComponentName.Pagination;

export const WizPagination = Pagination;
