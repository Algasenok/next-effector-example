import cn from 'classnames';
import { getDateForLottery } from '@/utils';
import styles from './LotteryCard.module.scss';
import { LotteryCardItem } from '@/types/types';
import ReactHtmlParser from 'react-html-parser';
import { NATIONAL_LOTTERIES, REGION_NAMES } from '@/utils/const';

interface Props {
  cardInfo: LotteryCardItem;
}

export function LotteryCard({ cardInfo }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.logoContainer}>
        <div className={styles.logoContainerImg}>
          <img src={cardInfo.logo} alt={cardInfo.name} width="120" />
        </div>
      </div>
      <div className={styles.wrap}>
        <div className={styles.latestResult}>
          <h4 className={styles.title}>Latest Result</h4>
          <span className={styles.date}>
            {ReactHtmlParser(getDateForLottery(cardInfo.datemodified))}
          </span>
          <ul className={cn(styles.list, cardInfo.maindraw.length > 8 ? styles.noCircle : '')}>
            {cardInfo.maindraw.map((number, index) => (
              <li key={`number-${index}`} className={styles.circle}>
                {number}
              </li>
            ))}
            {cardInfo.bonusorgrand ? (
              <li key="bonusogrand" className={cn(styles.circle, styles.circleBonusMobile)}>
                {cardInfo.bonusorgrand}
              </li>
            ) : null}
          </ul>
        </div>
        {cardInfo.bonusorgrand ? (
          <div className={styles.bonus}>
            <h4 className={styles.title}>Bonus</h4>
            <ul className={styles.list}>
              <li className={cn(styles.circle, styles.circleBonus)}>{cardInfo.bonusorgrand}</li>
            </ul>
          </div>
        ) : null}
        <div className={styles.nextDraw}>
          <h4 className={styles.title}>Next Draw</h4>
          <span className={styles.date}>
            {ReactHtmlParser(getDateForLottery(cardInfo.nextdraw))}
          </span>
        </div>
        <div className={styles.nextJackpot}>
          <h4 className={styles.title}>Next jackpot</h4>
          <span className={styles.jackpot}>{`$${Number(cardInfo.jackpot).toLocaleString()}`}</span>
        </div>
        {Object.keys(cardInfo.tags).length ? (
          <div className={styles.container}>
            {Object.keys(cardInfo.tags).map(tagSysname => (
              <div key={`tag${tagSysname}`} className={styles.item}>{`${
                REGION_NAMES[tagSysname] || tagSysname
              }: ${cardInfo.tags[tagSysname]}`}</div>
            ))}
          </div>
        ) : null}
      </div>
      {NATIONAL_LOTTERIES.findIndex(item => item === cardInfo.key) >= 0 ? (
        <div className={styles.flag}>
          <img src="/images/icons/canada-flag.png" alt="" width="32" height="32" />
        </div>
      ) : null}
    </div>
  );
}
