import styles from './Footer.module.scss';
import { BaseButton, BaseLink, BaseWrapper, FooterMenu, SocialMedia } from '@/components';

export function Footer() {
  return (
    <div className={styles.footer}>
      <BaseWrapper type="wide" className={styles.footerContainer}>
        <BaseLink href="/" className={styles.footerLogo}>
          <img src="/images/logo.svg" alt="" />
        </BaseLink>
        {/*
        TODO Футер меню переделать -
        TODO оно держится на костылях только при условии того, что пункты меню там статичны
        */}
        <FooterMenu className={styles.footerMenu} />
        <BaseButton size="middle" color="accent" className={styles.footerButton}>
          Raise a complaint
        </BaseButton>
        <div className={styles.footerText}>
          411 Richmond Street East, Suite 205 Toronto, Ontario M5A 3S5
        </div>
        <SocialMedia className={styles.footerSocial} />
      </BaseWrapper>
    </div>
  );
}
