import styles from './NewsSidebar.module.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { BaseLink } from '@/components';
import { $aboutPagesList } from '@/models/about';
import { $tagsListForCategory } from '@/models/menu';
import cn from 'classnames';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { LinkProps } from '@/types/types';
import { setSidebarActiveTab, $sidebarActiveTab } from '@/models/menu';

export function NewsSidebar({ className = '', place = 'news' }) {
  const { data: aboutPages } = useStore($aboutPagesList);
  const tags = useStore($tagsListForCategory);
  const activeTab = useStore($sidebarActiveTab);
  const [categories, setCategories] = useState<LinkProps[]>([]);
  const [title, setTitle] = useState<string>('Topics');

  useEffect(() => {
    if (place === 'about') {
      setCategories(aboutPages);
      setTitle('About Us');
    } else {
      setTitle('Topics');
      const links = tags.map(tag => ({ text: tag.tagName, link: tag.link, sysname: tag.sysname}));
      setCategories(links);
    }
  }, []);

  const changeTab = (tabName: string) => {
    setSidebarActiveTab(tabName);
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
          categories.map(({ text, link }, index) => (
            <SwiperSlide key={`category${index}`} className={styles.sidebarItem}>
              <BaseLink
                href={link || ''}
                className={cn(
                  styles.sidebarLink,
                  activeTab === text ? styles.sidebarLinkActive : '',
                )}
                onClickHandler={() => changeTab(text)}
              >
                {text}
              </BaseLink>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
