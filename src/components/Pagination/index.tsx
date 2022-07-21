import styles from './Pagination.module.scss';
import cn from 'classnames';

export function Pagination({ onClickHandler = () => {} }) {
  const paginationStart = 1;
  const paginationEnd = 6;
  const paginationActive = 4;

  const paginationItems = () => {
    const paginationsList = [];
    for (let item = paginationStart; item <= paginationEnd; item++) {
      paginationsList.push(
        <button
          className={cn(
            styles.paginationItem,
            item === paginationActive ? styles.paginationItemActive : '',
          )}
          onClick={item => onClickHandler(item)}
        >
          {item}
        </button>,
      );
    }
    return paginationsList;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationArrowLeft}
        onClick={() => onClickHandler(paginationActive - 1)}
      >
        <img src="/images/icons/arrow-small-left.svg" alt="" />
      </button>
      <div className={styles.paginationList}>{paginationItems()}</div>
      <button
        className={styles.paginationArrowRight}
        onClick={() => onClickHandler(paginationActive + 1)}
      >
        <img src="/images/icons/arrow-small-left.svg" alt="" />
      </button>
    </div>
  );
}
