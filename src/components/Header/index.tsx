import styles from './Header.module.scss';
import { BaseButton, BaseLink, BaseWrapper } from '@/components';

export function Header() {
  const handleClickMenu = () => {
    console.log('Меню');
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
        <img src="/images/logo.svg" className={styles.headerLogo} alt="" />
        <div className={styles.headerMenuContainer}>
          <BaseButton
            color="common"
            size="small"
            className={styles.headerMenubutton}
            onClickHandler={() => handleClickMenu()}
          >
            <img src="/images/icons/menu.svg" className={styles.headerMenuIcon} alt="" />
            <span className={styles.headerMenuText}>Menu</span>
          </BaseButton>
          <BaseLink href="/" className={styles.headerMenuLink}>
            Public and Players
          </BaseLink>
          <BaseLink href="/" className={styles.headerMenuLink}>
            Industry and Regulators
          </BaseLink>
          <BaseLink href="/" className={styles.headerMenuLink}>
            About RGN
          </BaseLink>
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
