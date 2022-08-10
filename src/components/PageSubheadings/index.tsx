import styles from './PageSubheadings.module.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { BaseButton } from '@/components';

interface Props {
  links: any;
  // eslint-disable-next-line no-unused-vars
  onClickHandler: (value: any) => void;
}

export function PageSubheadings({ links = [], onClickHandler }: Props) {
  return (
    <div className={styles.pageSubheadings}>
      <div className={styles.pageSubheadingsTitle}>Contents</div>
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
        {links.length &&
          links.map((item: any, index: number) => (
            <SwiperSlide key={`pageLink${index}`} className={styles.pageSubheadingsItem}>
              <BaseButton
                className={styles.pageSubheadingsLink}
                onClickHandler={() => onClickHandler(item)}
              >
                {item.textContent}
              </BaseButton>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
