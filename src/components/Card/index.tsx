import cn from 'classnames';

import styles from './styles.module.scss';

export function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.logoContainer}>
        <div>
          <img src="" alt="" width="120" height="50" />
        </div>
      </div>
      <div className={styles.wrap}>
        <div className={styles.latestResult}>
          <h4 className={styles.title}>Latest Result</h4>
          <span className={styles.date}>Monday | 11 July 2022</span>
          <ul className={styles.list}>
            <li className={styles.circle}>12</li>
            <li className={styles.circle}>12</li>
            <li className={styles.circle}>12</li>
            <li className={styles.circle}>12</li>
            <li className={cn(styles.circle, styles.circleBonus)}>7</li>
          </ul>
        </div>
        <div className={styles.bonus}>
          <h4 className={styles.title}>Bonus</h4>
          <ul className={styles.list}>
            <li className={cn(styles.circle, styles.circleBonus)}>7</li>
          </ul>
        </div>
        <div className={styles.nextDraw}>
          <h4 className={styles.title}>Next Draw</h4>
          <span className={styles.date}>Monday | 11 July 2022</span>
        </div>
        <div className={styles.nextJackpot}>
          <h4 className={styles.title}>Next jackpot</h4>
          <span className={styles.jackpot}>$240,000,000</span>
        </div>
        <div className={styles.container}>
          <div className={styles.item}>Ontario Encore: 0054158</div>
          <div className={styles.item}>Western Extra: 2721013</div>
          <div className={styles.item}>Atlantic Tag: 599656</div>
          <div className={styles.item}>Quebec Extra 8395297</div>
          <div className={styles.item}>Tag: 518275</div>
          <div className={styles.item}>Tag: 518275</div>
          <div className={styles.item}>Tag: 518275</div>
        </div>
      </div>
      <div className={styles.flag}>
        <img src="" alt="" width="32" height="32" />
      </div>
    </div>
  );
}
