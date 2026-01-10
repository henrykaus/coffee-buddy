import {ReactNode, useState} from 'react';
import useCloseableDropdown from '@/app/hooks/useCloseableDropdown';
import clsx from 'clsx';

interface FieldPopupProps {
  children?: ReactNode;
  icon: ReactNode;
  altIcon?: ReactNode;
  showAltIcon?: boolean;
}

export default function FieldPopup(props: FieldPopupProps) {
  const {children, icon, altIcon, showAltIcon = false} = props;

  const [isOpen, setIsOpen] = useState(false);

  const ref = useCloseableDropdown(() => setIsOpen(false));

  const iconToDisplay = showAltIcon ? altIcon : icon;

  const classes =
    'rounded-full outline-none bg-slate-200 hover:bg-slate-300 focus:bg-slate-300 active:bg-slate-300 active:scale-90 transition h-10 w-10 flex items-center justify-center';

  return (
    <span ref={ref} className='relative'>
      <button
        type='button'
        className={clsx(classes, {
          'bg-slate-300 shadow-md text-slate-800': isOpen,
          'text-slate-600': !isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
      >
        {iconToDisplay}
      </button>
      {children && (
        <div className='fixed start-0 mt-3 w-full z-10' hidden={!isOpen}>
          {children}
        </div>
      )}
    </span>
  );
}
