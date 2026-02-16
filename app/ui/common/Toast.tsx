'use client';

import {ReactNode, useEffect, useState} from 'react';
import {ToastType} from '@/app/lib/enums';
import {CircleAlertIcon, CircleCheckIcon, InfoIcon} from '@/app/ui/icons';
import clsx from 'clsx';

interface ToastProps {
  children?: ReactNode;
  onToastClose?: () => void;
  show: boolean;
  type: ToastType;
}

export default function Toast(props: ToastProps) {
  const {children, onToastClose, show, type} = props;

  const [animation, setAnimation] = useState<string>(
    'animate-(--animate-toast-slide-down)',
  );

  useEffect(() => {
    if (show) {
      setAnimation('animate-(--animate-toast-slide-down)');

      setTimeout(() => {
        setAnimation('animate-(--animate-toast-slide-up)');

        setTimeout(() => {
          if (onToastClose) {
            onToastClose();
          }
        }, 500);
      }, 5500);
    }
  }, [show]);

  return show ? (
    <article
      className={clsx(
        'flex gap-3 items-center text-lg leading-snug rounded-lg shadow-lg mx-4 px-4 py-3.5 fixed top-5 start-0 z-10 w-[calc(100%-2rem)] whitespace-pre-wrap',
        {
          'bg-red-200 text-red-700': type === ToastType.Error,
          'bg-green-200 text-emerald-700': type === ToastType.Success,
          'bg-sky-200 text-sky-700': type === ToastType.Info,
        },
        animation,
      )}
    >
      <ToastIcon icon={type} />
      <p className='my-px'>{children}</p>
    </article>
  ) : null;
}

function ToastIcon(props: {icon: ToastType}) {
  const {icon} = props;

  switch (icon) {
    case ToastType.Error:
      return (
        <CircleAlertIcon
          height={26}
          width={26}
          className='shrink-0 self-stretch'
        />
      );
    case ToastType.Success:
      return (
        <CircleCheckIcon
          height={26}
          width={26}
          className='shrink-0 self-stretch'
        />
      );
    case ToastType.Info:
      return (
        <InfoIcon height={26} width={26} className='shrink-0 self-stretch' />
      );
    default:
      return null;
  }
}
