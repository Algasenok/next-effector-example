import styles from './NewsSidebar.module.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { BaseButton } from '@/components';
import cn from 'classnames';
import { useStore, useEvent } from 'effector-react/scope';
import { useEffect, useState } from 'react';
import { LinkProps } from '@/types/types';
import { setSidebarActiveTab, $sidebarActiveTab } from '@/models/menu';
import { useRouter } from 'next/router';

interface Props {
  className: string;
  place: string;
  categories: LinkProps[];
}

export function NewsSidebar({ className = '', place = 'news', categories = [] }: Props) {
  const activeTab = useStore($sidebarActiveTab);
  const router = useRouter();
  const [title, setTitle] = useState<string>('Topics');
  const [changeSidebarActiveTab] = useEvent([setSidebarActiveTab]);

  useEffect(() => {
    if (place === 'about') {
      const path = router.asPath;
      const tabNameActive = categories.find(item => item.link === path)?.text;
      changeSidebarActiveTab(tabNameActive || '');
      setTitle('About Us');
    } else {
      setTitle('Topics');
      const tag = router.query.tag || '';
      const tabNameActive = categories.find(item => item.sysname === tag)?.text;
      changeSidebarActiveTab(tabNameActive);
    }
  }, [categories]);

  const hangleClick = ({ text, link, sysname }: any) => {
    changeSidebarActiveTab(text);
    const routeParams = {
      pathname: link,
    };
    if (place !== 'about') {
      const query = router.query || {};
      routeParams.query = { ...query, tag: sysname };
    }
    router.push(routeParams, undefined, { scroll: false });
  };

  return (
    <div className={cn(styles.sidebar, className, styles[`sidebar_${place}`])}>
      <div className={styles.sidebarTitle}>{title}</div>
      <Swiper
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
          categories.map(({ text, link, sysname }, index) => (
            <SwiperSlide key={`category${index}`} className={styles.sidebarItem}>
              <BaseButton
                className={cn(
                  styles.sidebarLink,
                  activeTab === text ? styles.sidebarLinkActive : '',
                )}
                onClickHandler={() => hangleClick({ text, link, sysname })}
              >
                {text}
              </BaseButton>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
