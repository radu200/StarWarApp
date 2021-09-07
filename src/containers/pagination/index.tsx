import React, { useState, useEffect } from "react";
import { generatePages, computePageCount } from './helpers';
import styles from './styles.module.scss';
import Button from '../../components/inputs/Button';

interface IProps {
  itemsCount: number,
  itemsPerPage: number,
  currentPage: number,
  titleButtonPrev?: string,
  titleButtonNext?: string,
  handleChangePage: (value: number) => void;
}

interface IState {
  pageRange: Array<number>;
  pageCount: number;
}


export default function Pagination({
  itemsCount,
  itemsPerPage,
  currentPage,
  titleButtonPrev,
  titleButtonNext,
  handleChangePage
}: IProps) {

  const [state, setState] = useState<IState>({
    pageRange: [],
    pageCount: 0
  });

  useEffect(() => {
    const pageCount = computePageCount(itemsCount, itemsPerPage);
    const pageRange = generatePages(currentPage, pageCount);
    setState(state => ({ ...state, pageRange, pageCount }));
  }, [itemsCount, itemsPerPage, currentPage]);

  if (!itemsCount) {
    return null;
  }


  function renderPages(
    page: number,
    currentPage: number,
    pageCount: number,
    styles: Record<string, string>,
    handleChangePage: (value: number) => void): React.ReactNode {

    if (page === 0) return <div>{"..."}</div>;
    if (pageCount === 1) return <div className={styles.page_number}>{page}</div>;

    return <div
      onClick={() => handleChangePage(page)}
      className={page === currentPage ? styles.current_page_number : styles.page_number}>{page}</div>;
  }


  const isNextBtnDisabled = currentPage >= state.pageCount;
  const isPrevBtnDisabled = currentPage <= 1;

  return (
    <div className={styles.pages_container}>
      <Button
        type="button"
        className={isPrevBtnDisabled ? "btn_disabled" : "btn_primary"}
        disabled={isPrevBtnDisabled}
        onClick={() => handleChangePage(currentPage - 1)}
        title={titleButtonPrev ? titleButtonPrev : "prev"} />
      {
        state.pageRange.map((page, index) => (
          <div key={index}>
            {renderPages(
              page,
              currentPage,
              state.pageCount,
              styles,
              handleChangePage
            )}
          </div>
        ))
      }
      <Button
        type="button"
        className={isNextBtnDisabled ? "btn_disabled" : "btn_primary"}
        disabled={isNextBtnDisabled}
        onClick={() => handleChangePage(currentPage + 1)}
        title={titleButtonNext ? titleButtonNext : "next"} />
    </div>
  );
}