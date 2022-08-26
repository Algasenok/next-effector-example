import styles from './Faq.module.scss';
import { FaqType } from '@/types/types';
import { useState } from 'react';
import cn from 'classnames';

interface Props {
  data: FaqType;
}

export function Faq({ data }: Props) {
  const { h2, faqItems } = data;
  const paddingTopForAnswer = 16;

  const faqItemsList = () => {
    return faqItems.map(({ id, question, answer }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [maxHeightAnswer, setMaxHeightAnswer] = useState(0);

      const handleClick = () => {
        setIsOpen(!isOpen);
        const maxHeightText = document.getElementById(`faqAnswer${id}`)?.scrollHeight || 0;
        setMaxHeightAnswer(maxHeightText + paddingTopForAnswer);
      };

      return (
        <div key={`faqItem${id}`} className={styles.faqItem}>
          <div className={styles.faqItemTitleContainer} onClick={handleClick}>
            <h3 className={styles.faqItemTitle}>{question}</h3>
            <img
              src="/images/icons/faq-arrow-down.svg"
              alt=""
              className={cn(styles.faqItemArrow, isOpen ? styles.faqItemArrowOpen : '')}
            />
          </div>
          <p
            id={`faqAnswer${id}`}
            className={styles.faqItemText}
            style={{
              paddingTop: `${isOpen ? paddingTopForAnswer : 0}px`,
              maxHeight: `${isOpen ? maxHeightAnswer : 0}px`,
            }}
          >
            {answer}
          </p>
        </div>
      );
    });
  };

  return (
    <div className={styles.faq}>
      <h2 className={styles.faqTitle}>{h2}</h2>
      {faqItemsList()}
    </div>
  );
}
