import styles from './BaseButton.module.scss';
import { BaseButtonsProps } from '@/types/types';
import cn from 'classnames';
import { BaseLink } from '@/components';

export function BaseButton({
  children,
  href = '',
  color = 'common',
  size = 'middle',
  className = '',
  onClickHandler = () => {},
}: BaseButtonsProps) {
  if (href) {
    return (
      <BaseLink
        className={cn(
          className,
          styles.button,
          styles[`button_${color}`],
          styles[`button_${size}`],
        )}
        href={href}
      >
        {children}
      </BaseLink>
    );
  }

  return (
    <button
      className={cn(className, styles.button, styles[`button_${color}`], styles[`button_${size}`])}
      onClick={event => onClickHandler(event)}
    >
      {children}
    </button>
  );
}
