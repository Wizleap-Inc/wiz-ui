import { ARIA_LABELS, ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/pagination.css";
import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

import { WizIcon } from "@/components";
import { WizIChevronLeft, WizIChevronRight } from "@/components/icons";

import { DivButton } from "./private-div-button";

type Props = ComponentPropsWithoutRef<"nav"> & {
  currentPage: number;
  length: number;
  onChangePage?: (page: number) => void;
  /**
   * 表示ページ数を制御します。(`>=0`)
   * @default 2
   */
  sideLength: number;
};

const Pagination = ({
  className,
  currentPage,
  length,
  onChangePage,
  sideLength = 2,
  ...props
}: Props) => {
  const sideItemLength = Math.max(0, sideLength);
  const maxItemLength = 2 * sideItemLength + 1;
  const handleChangePage = (index: number) => {
    if (index < 1) return onChangePage?.(1);
    if (index > length) return onChangePage?.(length);
    onChangePage?.(index);
  };
  const getActuallyDisplayingPages = () => {
    if (length < maxItemLength) {
      return Array.from({ length }).map((_, index) => index + 1);
    }
    function getStartPage() {
      if (currentPage <= sideItemLength) {
        // (ex.)  1 [2] 3 4 5
        return 1;
      }
      if (currentPage > length - sideItemLength) {
        // (ex.)  6 7 8 [9] 10
        return length - 2 * sideItemLength;
      }
      // (ex.)  3 4 [5] 6 7
      return currentPage - sideItemLength;
    }
    return Array.from({ length: maxItemLength }).map(
      (_, index) => getStartPage() + index
    );
  };
  return (
    <nav
      {...props}
      className={clsx(
        className,
        styles.paginationStyle,
        currentPage <= 1 && styles.paginationGapStyle["left"],
        currentPage >= length && styles.paginationGapStyle["right"]
      )}
      aria-label={ARIA_LABELS.PAGINATION}
    >
      {currentPage > 1 && (
        <DivButton
          onClick={() => handleChangePage(currentPage - 1)}
          className={clsx(
            styles.paginationButtonStyle,
            styles.paginationButtonVariantStyle["default"]
          )}
          aria-label={ARIA_LABELS.PAGINATION_PREV}
        >
          <WizIcon icon={WizIChevronLeft} size={"xl2"} />
        </DivButton>
      )}
      {getActuallyDisplayingPages().map((page) => {
        const isCurrentPage = currentPage === page;
        return (
          <DivButton
            key={page}
            onClick={() => handleChangePage(page)}
            className={clsx(
              styles.paginationButtonStyle,
              styles.paginationButtonVariantStyle[
                isCurrentPage ? "active" : "default"
              ]
            )}
            aria-current={isCurrentPage ? "page" : undefined}
          >
            {page}
          </DivButton>
        );
      })}
      {currentPage < length && (
        <DivButton
          onClick={() => handleChangePage(currentPage + 1)}
          className={clsx(
            styles.paginationButtonStyle,
            styles.paginationButtonVariantStyle["default"]
          )}
          aria-label={ARIA_LABELS.PAGINATION_NEXT}
        >
          <WizIcon icon={WizIChevronRight} size={"xl2"} />
        </DivButton>
      )}
    </nav>
  );
};

Pagination.displayName = ComponentName.Pagination;

export const WizPagination = Pagination;
