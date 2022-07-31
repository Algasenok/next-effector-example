import styles from './NewsSidebar.module.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { BaseButton } from '@/components';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { LinkProps } from '@/types/types';
import { setSidebarActiveTab, $sidebarActiveTab } from '@/models/menu';
import { useRouter } from 'next/router';
import { changeCurrentTag } from '@/models/newsPage';

interface Props {
  className: string;
  place: string;
  categories: LinkProps[];
}

export function NewsSidebar({ className = '', place = 'news', categories = [] }: Props) {
  const activeTab = useStore($sidebarActiveTab);
  const router = useRouter();
  const [title, setTitle] = useState<string>('Topics');

  useEffect(() => {
    if (place === 'about') {
      const path = router.asPath;
      const tabNameActive = categories.find(item => item.link === path)?.text;
      setSidebarActiveTab(tabNameActive || '');
      setTitle('About Us');
    } else {
      setTitle('Topics');
      setSidebarActiveTab('');
    }
  }, []);

  const hangleClick = ({ text, link, sysname }: any) => {
    setSidebarActiveTab(text);
    if (place !== 'about') {
      console.log('changeCurrentTag', sysname);
      changeCurrentTag(sysname);
    }
    router.push(link, '', {
      scroll: false,
    });
  };

  return (
    <div className={cn(styles.sidebar, className)}>
      <div className={styles.sidebarTitle}>{title}</div>
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
