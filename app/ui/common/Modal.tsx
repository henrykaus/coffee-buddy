'use client';

import React, {ReactNode, useEffect} from 'react';
import ModalBackground from '@/app/ui/common/ModalBackground';
import {CloseIcon} from '@/app/ui/icons';
import clsx from 'clsx';

interface ModalProps {
  actions?: ReactNode[];
  children?: ReactNode;
  fullscreen?: boolean;
  onClose: (...args: never[]) => void;
  onConfirm?: (formData: FormData) => void | Promise<void>;
  primaryButtonText?: string;
  showClose?: boolean;
  title?: string;
}

export default function Modal(props: ModalProps) {
  const {
    actions,
    children,
    fullscreen = true,
    onClose,
    showClose = true,
    title,
  } = props;

  useEffect(() => {
    // Stop body from being scrollable when modal is open
    document.body.classList.add('overflow-y-hidden');
    return () => {
      document.body.classList.remove('overflow-y-hidden');
    };
  }, []);

  return (
    <>
      <ModalBackground />
      <dialog
        className={clsx(
          'rounded-t-2xl margin-0 w-full fixed bottom-0 start-0 bg-white text-xl p-6 pt-8 pb-10 z-10',
          {'h-[75%]': fullscreen},
        )}
        open
      >
        <form>
          <header className='flex justify-center items-center text-2xl mb-4 min-h-8'>
            {showClose && (
              <button
                onClick={onClose}
                aria-label='Close popup'
                className='absolute start-6 top-6 hover:bg-slate-200 active:bg-slate-200 rounded-md p-2 flex items-center justify-center text-slate-600 transition'
              >
                <CloseIcon height={20} width={20} />
              </button>
            )}
            {title && <h2 className='font-medium text-slate-700'>{title}</h2>}
            {actions && (
              <span className='absolute end-6 top-6 flex gap-3'>
                {actions.map((action) => action)}
              </span>
            )}
          </header>
          {children}
        </form>
      </dialog>
    </>
  );
}
