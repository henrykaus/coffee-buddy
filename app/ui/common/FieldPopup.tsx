import {ReactNode, useEffect, useRef, useState} from 'react';

interface FieldPopupProps {
  children?: ReactNode;
  icon: ReactNode;
}

export default function FieldPopup(props: FieldPopupProps) {
  const {children, icon} = props;

  const ref = useRef<HTMLSpanElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <span ref={ref} className='relative'>
      <button
        type='button'
        className='rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 transition h-10 w-10 flex items-center justify-center'
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon}
      </button>
      {children && (
        <div className='absolute top-12 right-0 z-10' hidden={!isOpen}>
          {children}
        </div>
      )}
    </span>
  );
}
