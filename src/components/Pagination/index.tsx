import styles from './Pagination.module.scss';
import cn from 'classnames';

interface Props {
  pagination: any;
  onClickHandler: (value: number) => void;
}

export function Pagination({ pagination, onClickHandler = () => {} }: Props) {
  const paginationActive = pagination.page;
  const paginationStart =
    pagination.page - 3 >= 1 && pagination.page + 2 <= pagination.pageCount
      ? pagination.page - 3
      : pagination.pageCount - 5 >= 1
      ? pagination.pageCount - 5
      : 1;
  const paginationEnd =
    paginationStart + 5 <= pagination.pageCount ? paginationStart + 5 : pagination.pageCount;

  const handleClick = (value: string | number) => {
    switch (value) {
      case 'prev': {
        if (paginationActive - 1 >= 1) {
          onClickHandler(paginationActive - 1);
        }
        break;
      }
      case 'next': {
        if (paginationActive + 1 <= pagination.pageCount) {
          onClickHandler(paginationActive + 1);
        }
        break;
      }
      default:
        break;
    }
  };

  const paginationItems = () => {
    const paginationsList = [];
    for (let item = paginationStart; item <= paginationEnd; item++) {
      paginationsList.push(
        <button
          key={`paginationItem${item}`}
          className={cn(
            styles.paginationItem,
            item === paginationActive ? styles.paginationItemActive : '',
          )}
          onClick={() => onClickHandler(item)}
        >
          {item}
        </button>,
      );
    }
    return paginationsList;
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.paginationArrowLeft} onClick={() => handleClick('prev')}>
        <img src="/images/icons/arrow-small-left.svg" alt="" />
      </button>
      <div className={styles.paginationList}>{paginationItems()}</div>
      <button className={styles.paginationArrowRight} onClick={() => handleClick('next')}>
        <img src="/images/icons/arrow-small-left.svg" alt="" />
      </button>
    </div>
  );
}
