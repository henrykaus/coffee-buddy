import {ReactNode, useMemo} from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Collapsible from '@/app/ui/common/Collapsible';

interface MenuItemProps {
  children?: ReactNode;
  href?: string;
  icon: ReactNode;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick: () => void;
}

export default function MenuItem(props: MenuItemProps) {
  const {
    children,
    href,
    icon,
    isActive = false,
    isCollapsed = false,
    onClick,
  } = props;

  const buttonClasses = useMemo(
    () =>
      clsx(
        'flex px-3.5 py-3 rounded-lg transition hover:bg-slate-200/90 active:bg-slate-200/90 mb-1 w-full',
        {
          'bg-slate-200/65 shadow-xs': isActive,
          'active:translate-x-1': !isCollapsed,
          'active:scale-93': isCollapsed,
        },
      ),
    [isActive, isCollapsed],
  );

  return href ? (
    <Link
      href={href}
      className={clsx(buttonClasses, {
        'bg-slate-200/65 shadow-xs': isActive,
      })}
      onNavigate={onClick}
    >
      {icon}
      <Collapsible direction='horizontal' isCollapsed={isCollapsed}>
        <span className='inline-block text-left ml-4 min-w-46'>{children}</span>
      </Collapsible>
    </Link>
  ) : (
    <button
      className={clsx(buttonClasses, {
        'bg-slate-200/65 shadow-xs': isActive,
      })}
      onClick={onClick}
    >
      {icon}
      <Collapsible direction='horizontal' isCollapsed={isCollapsed}>
        <span className='inline-block text-left ml-4 min-w-46'>{children}</span>
      </Collapsible>
    </button>
  );
}
