import styles from './TopBanner.module.scss';
import { BaseButton, BaseTitle, BaseWrapper } from '@/components';

interface card {
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

export function TopBanner() {
  // TODO Ссылки на кнопках!
  const cards: card[] = [
    {
      title: 'Learn more about gambling',
      description: 'Our articles & help resources to help you know more about gambling',
      buttonText: 'Raise a complaint',
      link: '/',
    },
    {
      title: 'Ways to stay safe when gambling',
      description:
        'Our guides offer help and information to keep yourself safe when gambling and how ' +
        'to get help if you need it.',
      buttonText: 'Raise a complaint',
      link: '/',
    },
  ];

  return (
    <div className={styles.topBanner}>
      <BaseWrapper className={styles.topBannerContainer}>
        <BaseTitle size="large">Safer gambling</BaseTitle>
        <div className={styles.topBannerDescription}>
          We’re here to help minimize risks caused by problem gambling and keep gambling fun
        </div>
        <div className={styles.topBannerInfo}>
          Responsible Gaming Network is an independent non-profit organization dedicated to problem
          gambling prevention and keep gambling fun
        </div>
        <div className={styles.topBannerCardContainer}>
          {cards.map(({ title, description, buttonText, link }, index) => (
            <div key={`bannerCard${index}`} className={styles.topBannerCard}>
              <div>
                <div className={styles.topBannerCardTitle}>{title}</div>
                <div className={styles.topBannerCardDescription}>{description}</div>
              </div>
              <BaseButton href={link} color="second" className={styles.topBannerCardButton}>
                {buttonText}
              </BaseButton>
            </div>
          ))}
        </div>
      </BaseWrapper>
    </div>
  );
}
