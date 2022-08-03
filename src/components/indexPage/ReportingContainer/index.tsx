import styles from './Reporting.module.scss';
import { BaseButton, BaseTitle, BaseWrapper } from '@/components';

export function ReportingContainer() {
  const handleClick = () => {
    console.log('reporting');
  };

  const reasonsList = [
    'Match fixing and sports betting integrity',
    'Underage gambing',
    'Money laundering concerns',
    'Suspicious activity',
    'Unlicensed gambing or criminal activity',
  ];

  return (
    <div className={styles.reporting}>
      <BaseWrapper className={styles.reportingContainer}>
        <div className={styles.reportingText}>
          <BaseTitle>Reporting something suspicious or illegal</BaseTitle>
          <div>
            If you have seen something that looks suspicious or illegal, you can report it to us in
            confidence.
          </div>
        </div>
        <div className={styles.reportingInfoWrapper}>
          <div className={styles.reportingInfoContainer}>
            <div className={styles.reportingInfoText}>
              This also includes if you have concerns about how a gambling bussines is being run.
              You can report concernd about.
            </div>
            <div className={styles.reportingInfoList}>
              {reasonsList.map((item, index) => (
                <div key={`reason${index}`} className={styles.reportingInfoItem}>
                  {item}
                </div>
              ))}
            </div>
            <div className={styles.reportingInfoButtonContainer}>
              <BaseButton color="second" size="large" onClickHandler={() => handleClick()}>
                Report something in confidence
              </BaseButton>
            </div>
          </div>
        </div>
      </BaseWrapper>
      <img src="/images/backgrounds/grid.svg" alt="" className={styles.reportingGrid} />
      <img src="/images/backgrounds/eye.svg" alt="" className={styles.reportingEye} />
    </div>
  );
}
