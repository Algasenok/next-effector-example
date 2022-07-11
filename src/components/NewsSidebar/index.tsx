import styles from './NewsSidebar.module.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { BaseLink } from '@/components';
import cn from 'classnames';

export function NewsSidebar({ className = '' }) {
  const categories = [
    {
      name: 'Affected others',
      url: '/affected_others',
    },
    {
      name: 'Finances',
      url: '/Finances',
    },
    {
      name: 'Gambling',
      url: '/Gambling',
    },
    {
      name: 'Sports',
      url: '/Sports',
    },
  ];

  return (
    <div className={cn(styles.sidebar, className)}>
      <div className={styles.sidebarTitle}>Topics</div>
      <Swiper
        spaceBetween={24}
        mousewheel
        slidesPerView="auto"
        breakpoints={{
          1024: {
            allowTouchMove: false,
            direction: 'vertical',
            spaceBetween: 12,
          },
        }}
      >
        {categories.length &&
          categories.map(({ name, url }, index) => (
            <SwiperSlide key={`category${index}`} className={styles.sidebarItem}>
              <BaseLink href={url} className={styles.sidebarLink}>
                {name}
              </BaseLink>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
