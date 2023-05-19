import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/pagination.css";
import clsx from "clsx";

import { WizIcon } from "@/components";
import { WizIChevronLeft, WizIChevronRight } from "@/components/icons";

import { DivButton } from "./private-div-button";

const PREV_ITEM_LENGTH = 2;
const NEXT_ITEM_LENGTH = 2;
const MAX_ITEM_LENGTH = PREV_ITEM_LENGTH + NEXT_ITEM_LENGTH + 1;

type Props = {
  currentPage: number;
  length: number;
  onChangePage: (page: number) => void;
};

const Pagination = ({ currentPage, length, onChangePage }: Props) => {
  const handleChangePage = (index: number) => {
    if (index < 1) return onChangePage(1);
    if (index > length) return onChangePage(length);
    onChangePage(index);
  };
  const getActuallyDisplayingPages = () => {
    if (length < MAX_ITEM_LENGTH) {
      return Array.from({ length }).map((_, index) => index + 1);
    }
    function getStartPage() {
      if (currentPage <= PREV_ITEM_LENGTH) {
        // (ex.)  1 [2] 3 4 5
        return 1;
      }
      if (currentPage > length - NEXT_ITEM_LENGTH) {
        // (ex.)  6 7 8 [9] 10
        return length - (PREV_ITEM_LENGTH + NEXT_ITEM_LENGTH);
      }
      // (ex.)  3 4 [5] 6 7
      return currentPage - PREV_ITEM_LENGTH;
    }
    return Array.from({ length: MAX_ITEM_LENGTH }).map(
      (_, index) => getStartPage() + index
    );
  };
  return (
    <nav
      className={clsx(
        styles.paginationStyle,
        currentPage <= 1 && styles.paginationGapStyle["left"],
        currentPage >= length && styles.paginationGapStyle["right"]
      )}
      aria-label="pagination"
    >
      {currentPage > 1 && (
        <DivButton
          onClick={() => handleChangePage(currentPage - 1)}
          className={clsx(
            styles.paginationButtonStyle,
            styles.paginationButtonVariantStyle["default"]
          )}
          aria-label="previous"
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
          aria-label="next"
        >
          <WizIcon icon={WizIChevronRight} size={"xl2"} />
        </DivButton>
      )}
    </nav>
  );
};

Pagination.displayName = ComponentName.Pagination;

export const WizPagination = Pagination;
