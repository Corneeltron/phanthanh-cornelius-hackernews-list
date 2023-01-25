import { HTMLProps } from 'react';
import cn from 'classnames';
import './PageLink.css';

type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export const PageLink = ({
  className,
  children,
  active,
  disabled,
  ...props
}: Props) => {
  const customClassName = cn('page-link', className, {active, disabled});

  if (disabled) {
    return <span className={customClassName}>{children}</span>
  }

  return (
    <a {...props} className={customClassName} aria-current={active ? 'page' : undefined}>
      {children}
    </a>
  );
};
