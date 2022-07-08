import styles from './Statistics.module.scss';
import { BaseButton, BaseTitle, BaseWrapper } from '@/components';

interface card {
  value: string;
  description: string;
}

export function Statistics() {
  const handleClick = () => {
    console.log('Статистика кнопка');
  };

  const cards: card[] = [
    {
      value: '17,3M $',
      description: 'Returned to the players',
    },
    {
      value: '47,1K',
      description: 'Total requests for adjudication',
    },
    {
      value: '410',
      description: 'Ranked companies',
    },
  ];

  return (
    <div className={styles.statistics}>
      <BaseWrapper className={styles.statisticsContainer}>
        <div className={styles.statisticsContent}>
          <BaseTitle>Professional ADR Service</BaseTitle>
          <div className={styles.statisticsDescription}>
            We set the standard for best practices for ADR in Canada and provide leadership, value
            and support to our individual and corporate members and to our clients.
          </div>
          <div className={styles.statisticsInfo}>
            We promote ethical standards and professional competency, and advocate for all forms of
            ADR for commercial, personal and international disputes. With almost 2500 members we
            have the neutrals to assist in any dispute in every province and territory.
          </div>
        </div>
        <div className={styles.statisticsCardContainer}>
          {cards.map(({ value, description }, index) => (
            <div key={`statistics${index}`} className={styles.statisticsCardWrapper}>
              <div className={styles.statisticsCard}>
                <div className={styles.statisticsCardValue}>{value}</div>
                <div className={styles.statisticsCardDescription}>{description}</div>
              </div>
            </div>
          ))}
        </div>
        <BaseButton
          color="accent"
          size="middle"
          onClickHandler={() => handleClick()}
          className={styles.statisticsButton}
        >
          Raise a complaint
        </BaseButton>
      </BaseWrapper>
    </div>
  );
}
