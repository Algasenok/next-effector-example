import styles from './Support.module.scss';
import { BaseTitle, BaseWrapper, SupportCard } from '@/components';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { SupportCardProps } from '@/types/types';

export function Support() {
  const cards: SupportCardProps[] = [
    {
      title: 'Advice & Support',
      text: 'Try our quick self-assessment quiz to work out the impact gambling is having on your life.',
      link: '/',
    },
    {
      title: 'Self-Guided Workbook',
      text: 'Try our quick self-assessment quiz to work out the impact gambling is having on your life.',
      link: '/',
    },
    {
      title: 'Blocking software',
      text: 'Try our quick self-assessment quiz to work out the impact gambling is having on your life.',
      link: '/',
    },
    {
      title: 'Blocking software',
      text: 'Try our quick self-assessment quiz to work out the impact gambling is having on your life.',
      link: '/',
    },
  ];

  return (
    <div className={styles.support}>
      <BaseWrapper className={styles.supportContainer}>
        <BaseTitle>Advice & support</BaseTitle>
        <div className={styles.supportDescription}>
          We’re here to help minimize risks caused by problem gambling and keep gambling fun.
          Responsible Gaming Network is an independent non-profit organization dedicated to problem
          gambling prevention and keep gambling fun.
        </div>
        <Swiper
          spaceBetween={16}
          mousewheel
          slidesPerColumn={1}
          slidesPerView="auto"
          className={styles.supportCardsList}
        >
          {cards.length &&
            cards.map((item, index) => (
              <SwiperSlide key={`sitemap${index}`} className={styles.supportItem}>
                <SupportCard title={item.title} text={item.text} link={item.link} />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className={styles.supportCardsListDesk}>
          {cards.length &&
            cards.map((item, index) => (
              <SupportCard
                key={`sitemap${index}`}
                title={item.title}
                text={item.text}
                link={item.link}
              />
            ))}
        </div>
      </BaseWrapper>
    </div>
  );
}
