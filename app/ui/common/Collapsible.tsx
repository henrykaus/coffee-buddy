import {ReactNode, useMemo} from 'react';
import clsx from 'clsx';

interface CollapsibleProps {
  children?: ReactNode;
  direction: 'horizontal' | 'vertical';
  isCollapsed?: boolean;
}

export default function Collapsible(props: CollapsibleProps) {
  const {children, direction, isCollapsed} = props;

  const options = useMemo(() => {
    return {
      'grid-cols-[1fr]': direction === 'horizontal' && !isCollapsed,
      'grid-cols-[0fr]': direction === 'horizontal' && isCollapsed,
      'grid-rows-[1fr]': direction === 'vertical' && !isCollapsed,
      'grid-rows-[0fr]': direction === 'vertical' && isCollapsed,
    };
  }, [direction, isCollapsed]);

  return (
    <div
      className={clsx('grid transition-all', options)}
      aria-hidden={isCollapsed}
    >
      <span className='overflow-hidden'>{children}</span>
    </div>
  );
}
