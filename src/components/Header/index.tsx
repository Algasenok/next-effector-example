import styles from './Header.module.scss';
import { useState } from 'react';
import { BaseButton, BaseLink, BaseWrapper, Menu } from '@/components';

export function Header() {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const showMenu = () => {
    console.log('mouseenter');
    setIsShowMenu(true);
  };

  const closeMenu = () => {
    console.log('mouseOut');
    setIsShowMenu(false);
  };

  const handleClickButton = () => {
    console.log('Raise a complaint');
  };

  const handleClickUserButton = () => {
    console.log('UserButton');
  };

  return (
    <div className={styles.header}>
      <BaseWrapper type="wide" className={styles.headerContainer}>
        <BaseLink href="/" className={styles.headerLogo}>
          <img src="/images/logo.svg" alt="" />
        </BaseLink>
        <div
          className={styles.headerMenuContainer}
          onMouseOut={() => closeMenu()}
          onMouseOver={() => showMenu()}
          onFocus={() => showMenu()}
        >
          <div className={styles.headerMenubutton}>
            <img src="/images/icons/menu.svg" className={styles.headerMenuIcon} alt="" />
            <span className={styles.headerMenuText}>Menu</span>
          </div>
          <div className={styles.headerMenuLink}>Public and Players</div>
          <div className={styles.headerMenuLink}>Industry and Regulators</div>
          <div className={styles.headerMenuLink}>About RGN</div>
          {isShowMenu && <Menu />}
        </div>
        <div className={styles.headerInfoContainer}>
          <BaseButton
            color="common"
            size="middle"
            className={styles.headerButton}
            onClickHandler={() => handleClickButton()}
          >
            Raise a complaint
          </BaseButton>
          <img
            src="/images/icons/search.svg"
            className={styles.headerUserIcon}
            alt=""
            onClick={() => handleClickUserButton()}
          />
          <img
            src="/images/icons/user.svg"
            className={styles.headerUserIcon}
            alt=""
            onClick={() => handleClickUserButton()}
          />
        </div>
      </BaseWrapper>
    </div>
  );
}
