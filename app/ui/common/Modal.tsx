'use client';

import React, {ReactNode} from 'react';
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

  return (
    <>
      <ModalBackground />
      <dialog
        className={clsx(
          'rounded-t-2xl margin-0 w-full fixed bottom-0 start-0 bg-white text-xl p-8 pb-10',
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
                className='absolute start-8 top-8 hover:bg-slate-200 rounded-md p-2 flex items-center justify-center text-slate-600 transition'
              >
                <CloseIcon height={20} width={20} />
              </button>
            )}
            {title && <h2 className='font-medium text-slate-700'>{title}</h2>}
            {actions && (
              <span className='absolute end-8 top-8 flex gap-4'>
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
