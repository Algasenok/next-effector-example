import styles from './BaseButton.module.scss';
import { BaseButtonsProps } from '@/types/types';
import cn from 'classnames';

export function BaseButton({
  children,
  color = 'common',
  size = 'middle',
  className = '',
  onClickHandler = () => {},
}: BaseButtonsProps) {
  return (
    <button
      className={cn(className, styles.button, styles[`button_${color}`], styles[`button_${size}`])}
      onClick={event => onClickHandler(event)}
    >
      {children}
    </button>
  );
}
