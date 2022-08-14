import { LotteryCardItem } from '@/types/types';
import React from 'react';
import styles from './LotteryWinnersTable.module.scss';
import ReactHtmlParser from 'react-html-parser';
import { getDateForLottery } from '@/utils';

interface Props {
  lotteryInfo: LotteryCardItem;
}

export const LotteryWinnersTable: React.FC<Props> = ({ lotteryInfo }) => {
  return (
    <div>
      <h2>Latest Winning Numbers</h2>
      <div className={styles.winnerTable}>
        <div className={styles.winnerTableHeader}>{`${lotteryInfo.name} History Results`}</div>
        {lotteryInfo.history.map(item => (
          <div key={`historyId-${item.id}`} className={styles.winnerTableRow}>
            <div className={styles.winnerDate}>{ReactHtmlParser(getDateForLottery(item.date))}</div>
            <div className={styles.winnerContent}>
              {item.maindraw.map((v: string, index: number) => (
                <div key={`id-${item.id}-maindraw-${index}`}>{v}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
